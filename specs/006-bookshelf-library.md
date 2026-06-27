# 006 — The Bookshelf

## Goal
Implement the core Bookshelf client dashboard and dynamic collection library, reflecting a tactile room environment with dynamic cover artwork, collection progress, toggleable favorites, and a simulated reading companion mode.

## Requirements
1. **Interactive Route (`/bookshelf`)**:
   - Provide a cozy bedroom view showing a styled physical wooden bookshelf.
   - Tapping the shelf triggers a camera zoom transition (utilizing smooth CSS transitions and transforms) to reveal the book covers on physical shelves.
2. **Library Layout & Visual Cards**:
   - Layout books on horizontal shelves.
   - Generate unique cover designs dynamically (using combinations of background gradients and Lucide symbols).
   - Display badges for:
     - `⭐` (Favorited)
     - `🗝` (Locked / Coming Soon)
     - `⭐ New` (New releases)
3. **Interactive Detail Modal**:
   - Click a book to trigger a modal displaying:
     - Title, Category, Reading Time, Skills Practiced, and Age recommendation.
     - Completed progress percentage.
     - "Favorite" toggle button that updates state immediately.
     - "Read with [Cabbit]" action button (disabled if locked).
4. **Simulated Shared Reading Interface**:
   - Launches a full-screen reader showing book text alongside an active Cabbit companion dialogue box.
   - The Cabbit comments on the text in real-time (e.g. looking at illustrations, cheering the user, asking questions) based on their temperament.
   - Completing the chapter bookmarks progress and increases the Cabbit's curiosity.
5. **Database schema**:
   - Table `companion_books` stores `progress` (integer, `0` to `100`) and `is_favorite` (boolean) for each `book_id` per companion session.

## Acceptance Criteria
- Code compiles, builds, and runs cleanly with no errors.
- `/bookshelf` renders and handles zoom transitions and modal toggles correctly.
- Toggling favorites saves changes locally and syncs to Supabase if credentials are provided.
- The shared reading interface renders the text pages and Cabbit reactions dynamically.
- Bookmark completion updates and persists the book progress and adds curiosity.
