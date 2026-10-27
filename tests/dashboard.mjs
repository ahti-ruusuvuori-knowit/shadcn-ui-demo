import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { mkdir } from "node:fs/promises"
import { chromium } from "playwright"

// Run against any checkpoint: DEMO_STAGE=0|1|2|3 npm run test:ui
const stage = Number(process.env.DEMO_STAGE ?? 3)
assert.ok(Number.isInteger(stage) && stage >= 0 && stage <= 3, "DEMO_STAGE must be 0, 1, 2, or 3")
const origin = "http://127.0.0.1:4174"
const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "4174", "--strictPort"],
  { stdio: "pipe" },
)
let output = ""
server.stdout.on("data", (chunk) => {
  output += chunk
})
server.stderr.on("data", (chunk) => {
  output += chunk
})
let browser

try {
  let ready = false
  for (let attempt = 0; attempt < 80; attempt++) {
    if (server.exitCode !== null) throw new Error(`Vite exited: ${output}`)
    try {
      if ((await fetch(origin)).ok) {
        ready = true
        break
      }
    } catch {
      /* The server is still starting. */
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  assert.ok(ready, `Vite did not start: ${output}`)
  browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  })
  const errors = []
  const externalRequests = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  page.on("request", (request) => {
    if (!request.url().startsWith(origin) && !request.url().startsWith("data:"))
      externalRequests.push(request.url())
  })
  await page.goto(origin, { waitUntil: "networkidle" })
  assert.equal(await page.title(), "Capybara Club · A shadcn/ui demo")
  assert.equal(
    await page.getByRole("heading", { level: 1 }).textContent(),
    "Simple components, without the bloat",
  )
  assert.equal(await page.getByRole("progressbar").count(), 3)

  const search = page.getByRole("searchbox", { name: "Search sightings" })
  await search.fill("BRAZIL")
  await page.getByRole("status").filter({ hasText: "2 of 5 sightings" }).waitFor()
  await search.fill("no capybara has this name")
  await page.getByText("No capybaras found.", { exact: false }).waitFor()
  await search.fill("")
  await page.getByRole("status").filter({ hasText: "5 of 5 sightings" }).waitFor()

  assert.equal(await page.locator("[data-demo-trait]").count(), stage >= 1 ? 3 : 0)
  const factButton = page.getByRole("button", { name: "Fact of the day" })
  assert.equal(await factButton.count(), stage >= 2 ? 1 : 0)
  if (stage >= 2) {
    await factButton.click()
    const dialog = page.getByRole("dialog", { name: "Built for the quiet life." })
    await dialog.waitFor()
    await page.keyboard.press("Tab")
    assert.ok(
      await dialog.evaluate((element) => element.contains(document.activeElement)),
      "Dialog traps keyboard focus",
    )
    await page.keyboard.press("Escape")
    await dialog.waitFor({ state: "hidden" })
    assert.ok(
      await factButton.evaluate((element) => element === document.activeElement),
      "Closing restores trigger focus",
    )
    await factButton.click()
    await page.getByRole("button", { name: "Stay curious" }).click()
    await dialog.waitFor({ state: "hidden" })
  }

  assert.equal(await page.getByRole("tablist").count(), stage >= 3 ? 1 : 0)
  if (stage >= 3) {
    await page.getByRole("tab", { name: "Diet", exact: true }).click()
    await page
      .getByRole("tabpanel")
      .getByRole("heading", { name: "Grass. More grass. A water plant." })
      .waitFor()
    await page.keyboard.press("ArrowRight")
    await page
      .getByRole("tabpanel")
      .getByRole("heading", { name: "A little personal space? Optional." })
      .waitFor()
    await page.getByRole("tab", { name: "Habitat", exact: true }).click()
  }

  await page.getByRole("link", { name: "Dashboard", exact: true }).click()
  assert.equal(new URL(page.url()).hash, "#overview")
  await page.evaluate(() => window.scrollTo(0, 0))
  await mkdir("test-results", { recursive: true })
  await page.screenshot({ path: `test-results/desktop-stage-${stage}.png`, fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    "Mobile layout must not overflow horizontally",
  )
  if (stage >= 2) {
    await factButton.click()
    const dialog = page.getByRole("dialog")
    const box = await dialog.boundingBox()
    assert.ok(box && box.x >= 0 && box.x + box.width <= 390, "Dialog fits mobile viewport")
    await page.keyboard.press("Escape")
  }
  await page.screenshot({ path: `test-results/mobile-stage-${stage}.png`, fullPage: true })
  assert.deepEqual(externalRequests, [], "Dashboard must not load external resources")
  assert.deepEqual(errors, [], "No browser errors")
  console.log(
    `Dashboard stage ${stage}: search, components, keyboard, mobile layout, and local resources passed.`,
  )
} finally {
  await browser?.close()
  if (server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve))
    server.kill("SIGTERM")
    await exited
  }
}
