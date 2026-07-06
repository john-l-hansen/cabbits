# Cabbits Agent Instructions

This project is spec-driven.

Before writing code:
1. Read the relevant docs in /docs.
2. Read the matching spec in /specs.
3. Propose a short plan.
4. Ask for confirmation before large changes.
5. Make the smallest useful change.
6. Verify locally.
7. Update documentation when behavior changes.

Core product principles:
1. The companion is the product. Learning systems should feel like abilities of the companion, not separate apps.
2. A Living World: We use Agents as NPCs (e.g., BLACKSMITH.md) combined with Skills to craft a dynamic, responsive world.
3. Dynamic World Generation: The world reacts to the user. User behaviors (like repeatedly inspecting an item) influence NPC dialogues and their subsequent actions in the world.
4. Purpose for Learning (Logic-First): Designed primarily for children, the experience is rooted in Logic (including mathematics and language). Logic serves as the foundation for creating all new areas and content.

These principles must infuse every aspect of this project as it continues.

Do not invent features outside the current spec.
Do not add speculative architecture.
Do not connect paid APIs until explicitly requested.

## Asset Pipeline & Figma Translation
- **Granular Asset Preparation**: Prefer retaining and consuming granular, individual assets exported directly from Figma (e.g., individual frame assets `cabbit-idle-01.png` to `cabbit-idle-06.png`) instead of consolidating or stitching them into single atlas/sprite sheets. This establishes a clean, direct translation pipeline between design and code, and allows the designer to update or replace specific frames easily.

## Experience Interactions
- **Interruptible Sleep/Rest Modes**: Long-running passive loop interactions (such as the companion sleeping in bed) must be immediately cancelable/interruptible by global keyboard shortcuts, specifically the 'Escape' key, to ensure the user can instantly return to active exploration.


