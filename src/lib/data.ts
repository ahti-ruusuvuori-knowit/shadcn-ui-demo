import { Leaf, Users, Waves, Weight } from "lucide-react"

// Natural-history facts: https://animals.sandiegozoo.org/animals/capybara
// Sightings and habitat percentages are fictional presentation data.
export const stats = [
  {
    label: "World’s largest rodent",
    value: "27–79",
    unit: "kg",
    detail: "A whole lot of guinea pig cousin.",
    icon: Weight,
  },
  {
    label: "Underwater hide-and-seek",
    value: "5",
    unit: "min",
    detail: "Can stay submerged to evade danger.",
    icon: Waves,
  },
  {
    label: "Better together",
    value: "~10",
    unit: "friends",
    detail: "A typical group, with room for more.",
    icon: Users,
  },
  {
    label: "On the menu",
    value: "100",
    unit: "% plants",
    detail: "Grasses, aquatic plants. Repeat.",
    icon: Leaf,
  },
]

export const traits = ["Semi-aquatic", "Herbivore", "Very social"]

export const habitats = [
  { name: "Riverbank", value: 45 },
  { name: "Wetland", value: 35 },
  { name: "Grassland", value: 20 },
]

export const sightings = [
  {
    name: "Clementine",
    initials: "CL",
    location: "Pantanal, Brazil",
    habitat: "Wetland",
    activity: "Taking a dip",
    time: "08:42",
  },
  {
    name: "Biscuit",
    initials: "BI",
    location: "Llanos, Venezuela",
    habitat: "Grassland",
    activity: "Second breakfast",
    time: "08:31",
  },
  {
    name: "Mochi",
    initials: "MO",
    location: "Iberá, Argentina",
    habitat: "Riverbank",
    activity: "People watching",
    time: "08:14",
  },
  {
    name: "Olive",
    initials: "OL",
    location: "Pantanal, Brazil",
    habitat: "Riverbank",
    activity: "Group nap",
    time: "07:58",
  },
  {
    name: "Potato",
    initials: "PO",
    location: "Llanos, Colombia",
    habitat: "Wetland",
    activity: "Taking a dip",
    time: "07:46",
  },
]

export const fieldNotes = [
  {
    id: "habitat",
    label: "Habitat",
    icon: Waves,
    eyebrow: "A life by the water",
    title: "Waterfront property, always.",
    body: "Rivers, ponds, and marshes provide a place to cool off, swim, and hide. Slightly webbed feet make capybaras comfortable in the water.",
  },
  {
    id: "diet",
    label: "Diet",
    icon: Leaf,
    eyebrow: "The original plant-based club",
    title: "Grass. More grass. A water plant.",
    body: "Capybaras are herbivores. Grasses and aquatic plants are staples, and their continuously growing teeth are well suited to all that grazing.",
  },
  {
    id: "social",
    label: "Social",
    icon: Users,
    eyebrow: "There’s room in the group",
    title: "A little personal space? Optional.",
    body: "Capybaras live in groups of around ten, sometimes larger. More eyes help watch for danger, especially when there are youngsters around.",
  },
]

export const dailyFact = {
  title: "Built for the quiet life.",
  body: "A capybara’s eyes, ears, and nostrils sit high on its head. It can stay mostly underwater while keeping track of what’s happening above the surface.",
}
