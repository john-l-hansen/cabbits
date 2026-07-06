export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji representing the item
  type: "consumable" | "collectible" | "equipment";
  locationOrigin: string;
  image?: string; // Image asset path
}

export const ITEMS: Record<string, Item> = {
  carrot: {
    id: "carrot",
    name: "Carrot Snack",
    description: "A sweet, crunchy orange carrot grown in the rich soils of the valley. A favorite treat for hungry Cabbits.",
    icon: "🥕",
    type: "consumable",
    locationOrigin: "Pip's Burrow",
    image: "/assets/item_carrot.png",
  },
  apple: {
    id: "apple",
    name: "Sweet Apple Snacker",
    description: "A crisp red apple from the orchard. Restores a moderate amount of hunger.",
    icon: "🍎",
    type: "consumable",
    locationOrigin: "Green Meadow",
    image: "/assets/item_apple.png",
  },
  mushroom: {
    id: "mushroom",
    name: "Shroom Cap Snack",
    description: "A wild mushroom found in the damp cave corners. Very earthy and highly nutritious.",
    icon: "🍄",
    type: "consumable",
    locationOrigin: "Oak Forest",
    image: "/assets/item_mushroom.png",
  },
  fruit_basket: {
    id: "fruit_basket",
    name: "Orchard Fruit Basket",
    description: "A delightful assortment of fresh orchard fruits packed neatly in a woven basket.",
    icon: "🧺",
    type: "consumable",
    locationOrigin: "Crescent Pond",
    image: "/assets/item_fruit_basket.png",
  },
  milk: {
    id: "milk",
    name: "Fresh Meadow Milk",
    description: "A cold glass of fresh milk to wash down snacks and keep energy high.",
    icon: "🥛",
    type: "consumable",
    locationOrigin: "Green Meadow",
    image: "/assets/item_milk.png",
  },
  juice: {
    id: "juice",
    name: "Crescent Berry Juice",
    description: "A jar of freshly squeezed forest berries, bursting with sweet flavor.",
    icon: "🧃",
    type: "consumable",
    locationOrigin: "Crescent Pond",
    image: "/assets/item_juice.png",
  },
  feather: {
    id: "feather",
    name: "Golden Crest Feather",
    description: "A soft, shimmering golden feather dropped by a migrating valley swift. It catches the sunlight beautifully.",
    icon: "🪶",
    type: "collectible",
    locationOrigin: "Crescent Pond",
  },
  lantern: {
    id: "lantern",
    name: "Brass Pocket Lantern",
    description: "A small, hand-crafted brass lantern emitting a warm amber glow. Perfect for lighting dark forest pathways.",
    icon: "🏮",
    type: "collectible",
    locationOrigin: "Green Meadow",
  },
  silver_acorn: {
    id: "silver_acorn",
    name: "Silver Oak Acorn",
    description: "A rare, metallic silver acorn dropped by the oldest oak tree in the valley. Highly valued by forest scholars.",
    icon: "🌰",
    type: "collectible",
    locationOrigin: "Oak Forest",
  },
  wooden_sword: {
    id: "wooden_sword",
    name: "Wooden Sword",
    description: "A sturdy wooden practice sword for aspiring adventurers.",
    icon: "🗡️",
    type: "equipment",
    locationOrigin: "Training Grounds",
  },
  adventurer_hat: {
    id: "adventurer_hat",
    name: "Adventurer Hat",
    description: "A classic leather hat adorned with a green leaf.",
    icon: "🤠",
    type: "equipment",
    locationOrigin: "Tailor Shop",
  },
  green_scarf: {
    id: "green_scarf",
    name: "Green Scarf",
    description: "A cozy green scarf knitted with love.",
    icon: "🧣",
    type: "equipment",
    locationOrigin: "Home",
  },
  explorer_pack: {
    id: "explorer_pack",
    name: "Explorer Pack",
    description: "A durable leather backpack for holding all your findings.",
    icon: "🎒",
    type: "equipment",
    locationOrigin: "Market",
  },
  leaf_charm: {
    id: "leaf_charm",
    name: "Leaf Charm",
    description: "A magical charm shaped like a spring leaf.",
    icon: "🍃",
    type: "equipment",
    locationOrigin: "Forest",
  },
  comfy_boots: {
    id: "comfy_boots",
    name: "Comfy Boots",
    description: "Sturdy boots that make walking for miles a breeze.",
    icon: "🥾",
    type: "equipment",
    locationOrigin: "Cobbler",
  },
};
