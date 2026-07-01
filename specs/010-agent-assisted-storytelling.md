# 010 — Agent-Assisted Storytelling

## Goal
Replace static companion dialogue bubbles with dynamic, personality-driven speech responses. The companion will dynamically comment on weather states, sleeping state switches, coin levels, and explore landmarks.

## Requirements
1. **Personality Dialogue Module (`lib/agents/dialogue.ts`)**:
   - Define custom greetings based on:
     - Companion temperament (Gentle, Curious, Playful, Focused)
     - Weather condition (Sunny, Rainy, Snowy)
     - Mood (Sleeping, Happy)
     - Context (Coins > 150)
   - Define custom landmark observations:
     - Connect Crescent Pond, Green Meadow, Oak Forest, Pip's Burrow, and Secret Library to Pip's thoughts under Sunny/Rainy/Snowy conditions.
2. **Cozy Home Integration (`app/page.tsx`)**:
   - Re-evaluate speech bubbles dynamically when weather or sleep triggers occur, or when Pip is clicked.
3. **Explore Map Integration (`app/explore/page.tsx`)**:
   - Add a custom speech bubble in the bottom sheet details.
   - Show Pip's name and dynamic observation.

## Acceptance Criteria
- App compiles and builds successfully.
- Tapping Pip on Home cycles through personality-specific statements.
- Changing weather triggers specific weather speech comments.
- Putting Pip to sleep shows cozy sleeping indicators and sleeping bubble text.
- Inspecting landmarks on Explore shows matching companion reflections.
