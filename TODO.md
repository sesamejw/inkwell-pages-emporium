# ThouArt - Feature Roadmap & Bug Fixes

## 🎮 Lore Chronicles — Interactive Roleplay System

A choose-your-adventure roleplay experience where users create characters and embark on branching story adventures within the ThouArt universe. Stories can intertwine, and users can expand the lore under Loremaster oversight.

### Vision & Goals

- **Immersive storytelling** tied to existing Witness Almanac lore
- **Player agency** through meaningful branching choices
- **Community-driven content** with quality control via Loremasters
- **Scalable architecture** supporting solo, async, and real-time multiplayer

---

### Core Systems

#### 1. Character Creation
- [ ] **Race Selection** — Pick from almanac races (links to `almanac_races`)
- [ ] **Stat Allocation** — Distribute points across Strength, Magic, Charisma, etc.
- [ ] **Character Profile** — Name, backstory, portrait upload (reuse `AvatarUpload` with crop)
- [ ] **Progression System** — Abilities & faction affiliation earned through story choices
- [ ] **Character Sheet View** — D&D-style character sheet display

**UI Flow:**
1. Step 1: Select race → show race lore from almanac
2. Step 2: Allocate stat points (point-buy system, e.g., 20 points total)
3. Step 3: Write backstory + upload portrait
4. Step 4: Review & create

#### 2. Story Campaigns
- [ ] **Campaign Creator** — Authors create branching narratives
- [ ] **Story Nodes** — Choice points with multiple paths
- [ ] **Outcome System** — Choices affect stats, unlock abilities, change story
- [ ] **Campaign Browser** — Discover and join campaigns by genre/difficulty
- [ ] **Featured Campaigns** — Loremaster-approved spotlight campaigns

**Node Types:**
- `narrative` — Story text with "Continue" button
- `choice` — 2-4 options leading to different nodes
- `stat_check` — Pass/fail based on character stats
- `combat` — Simple dice-roll resolution (future)
- `ending` — Campaign conclusion with outcome summary

#### 3. Chronicle Threads (Sessions)
- [ ] **Async Mode** — Turn-based, players act when online
- [ ] **Real-Time Mode** — Scheduled sessions with live participants
- [ ] **Group Sessions** — Multiple players in same campaign
- [ ] **Solo Play** — Single-player story experiences
- [ ] **Story Intertwining** — Characters can cross into other campaigns via "crossover events"

#### 4. Lore Expansion System
- [ ] **Lore Proposals** — Users submit new races, locations, items, factions
- [ ] **Proposal Review Queue** — Loremasters approve/reject submissions
- [ ] **Universe Rules Enforcement** — Guidelines for lore-compliant content
- [ ] **Approved Lore Integration** — Accepted elements become available for all campaigns
- [ ] **Lore Contribution Credits** — Recognition for accepted contributions

#### 5. Loremaster Role
- [ ] **Loremaster Permissions** — Special role for trusted users/admins
- [ ] **Moderation Dashboard** — Review proposals, flag content, feature campaigns
- [ ] **Universe Consistency Tools** — Check new lore against existing almanac
- [ ] **Loremaster Applications** — Users can apply for the role

---

### Database Schema (Detailed)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `rp_characters` | Player characters | `user_id`, `name`, `race_id` (FK → almanac_races), `stats` (JSONB), `backstory`, `portrait_url`, `current_campaign_id` |
| `rp_character_abilities` | Unlocked abilities per character | `character_id`, `ability_name`, `unlocked_at`, `source_node_id` |
| `rp_campaigns` | User-created adventures | `author_id`, `title`, `description`, `genre`, `difficulty`, `is_published`, `is_featured`, `start_node_id` |
| `rp_story_nodes` | Branching choice points | `campaign_id`, `node_type`, `content` (JSONB), `position_x`, `position_y` |
| `rp_node_choices` | Available choices at each node | `node_id`, `choice_text`, `target_node_id`, `stat_requirement` (JSONB), `stat_effect` (JSONB) |
| `rp_sessions` | Active playthroughs | `campaign_id`, `mode` (solo/group/async), `created_by`, `current_node_id`, `story_flags` (JSONB) |
| `rp_session_participants` | Players in group sessions | `session_id`, `character_id`, `joined_at`, `is_active` |
| `rp_character_progress` | Per-character session state | `session_id`, `character_id`, `current_node_id`, `story_flags` (JSONB), `stats_snapshot` (JSONB) |
| `rp_lore_proposals` | User-submitted new lore | `user_id`, `category`, `content` (JSONB), `status` (pending/approved/rejected), `reviewer_id`, `reviewed_at` |
| `rp_loremasters` | Users with oversight permissions | `user_id`, `appointed_at`, `appointed_by` |
| `rp_campaign_forks` | Crossover connections | `source_campaign_id`, `target_campaign_id`, `fork_node_id`, `entry_node_id` |

**JSONB Structures:**
- `stats`: `{ "strength": 5, "magic": 3, "charisma": 4, "wisdom": 3, "agility": 5 }`
- `story_flags`: `{ "met_elder": true, "has_relic": false, "reputation_score": 12 }`
- `stat_requirement`: `{ "stat": "charisma", "min_value": 4 }`
- `stat_effect`: `{ "charisma": +1 }` or `{ "unlock_ability": "persuasion" }`

---

### Technical Architecture

#### State Management
- Use **finite state machine** pattern for story progression
- `story_flags` JSONB for tracking narrative state (items, relationships, decisions)
- Snapshot stats at session start for consistency during playthrough

#### Real-Time (Phase 3)
- Supabase Realtime subscriptions on `rp_sessions` for multiplayer sync
- Presence tracking for "who's online" in group sessions
- Optimistic UI updates with conflict resolution

#### Lore Validation (Phase 4)
- Cross-reference proposals against `almanac_*` tables
- Flag potential conflicts (e.g., duplicate location names)
- Automated checks + human Loremaster review

#### Reusable Components
- `AvatarUpload` → Character portrait upload with cropping
- `CharacterComparison` → Adapt for stat visualization
- `DynamicRelationshipMap` → Visualize character connections within campaigns

---

### UI/UX Wireframe Concepts

#### Character Creation Wizard
```
┌─────────────────────────────────────────────┐
│ Step 1 of 4: Choose Your Race               │
├─────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│ │ Elf     │ │ Dwarf   │ │ Human   │  ...    │
│ │ [img]   │ │ [img]   │ │ [img]   │         │
│ └─────────┘ └─────────┘ └─────────┘         │
│                                             │
│ Selected: Elf                               │
│ "Ancient beings of the First Age..."        │
│                                             │
│              [Back] [Next →]                │
└─────────────────────────────────────────────┘
```

#### Story Player
```
┌─────────────────────────────────────────────┐
│ Chapter 3: The Crossroads                   │
├─────────────────────────────────────────────┤
│                                             │
│ The ancient path splits before you. To the │
│ east, smoke rises from a distant village.  │
│ To the west, the dark forest beckons...    │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ → Head toward the village (Charisma 3+)│ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ → Enter the dark forest                 │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ → Make camp and rest                    │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Character Sheet]        [Save & Exit]      │
└─────────────────────────────────────────────┘
```

#### Campaign Node Editor (Visual)
```
┌─────────────────────────────────────────────┐
│ Campaign: The Lost Relic                    │
├─────────────────────────────────────────────┤
│                                             │
│   [Start] ──→ [Intro] ──→ [Choice 1]        │
│                              │     │        │
│                              ▼     ▼        │
│                          [Path A] [Path B]  │
│                              │     │        │
│                              └──┬──┘        │
│                                 ▼           │
│                             [Ending]        │
│                                             │
│ + Add Node   🔗 Connect   🗑 Delete          │
└─────────────────────────────────────────────┘
```

---

### Implementation Phases (Revised)

**Phase 1: Foundation (MVP)**
- [ ] Create database schema (core tables with RLS)
- [ ] Build character creation wizard UI
- [ ] Implement character sheet display
- [ ] Seed sample race data from `almanac_races`

**Phase 2: Solo Campaigns**
- [ ] Campaign creator with visual node editor
- [ ] Story player UI with choice presentation
- [ ] Session management (start, save, resume)
- [ ] Create 1-2 sample campaigns for testing

**Phase 3: Multiplayer & Social**
- [ ] Group session support with turn-based flow
- [ ] Real-time synchronization via Supabase Realtime
- [ ] Crossover event system between campaigns
- [ ] Leaderboards / achievement integration

**Phase 4: Lore Governance**
- [ ] Lore proposal submission form
- [ ] Loremaster dashboard with approval workflow
- [ ] Automated lore conflict detection
- [ ] Loremaster application system

---

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Multiplayer complexity | Defer to Phase 3; build solo-first |
| Scope creep on node editor | Start with linear + simple branching only |
| Lore inconsistency | Automate validation + require Loremaster approval |
| Performance with large campaigns | Paginate node loading; lazy-load branches |

---

### Success Metrics

- **Characters created** per week
- **Campaigns published** by users
- **Session completion rate** (started → finished)
- **Lore proposals** submitted vs approved
- **Average session duration**

---

### Gamification & Progression

#### Experience & Leveling
- [ ] **XP System** — Earn XP for completing nodes, finishing campaigns, making choices
- [ ] **Character Levels** — Level up at XP thresholds (100, 300, 600, 1000...)
- [ ] **Level Benefits** — Unlock stat points, new ability slots, cosmetic titles
- [ ] **XP Bonuses** — Bonus XP for first completions, difficult paths, group play

**XP Awards:**
| Action | XP |
|--------|-----|
| Complete narrative node | 5 |
| Make a choice | 10 |
| Pass stat check | 20 |
| Fail stat check (learning!) | 5 |
| Complete campaign | 100 |
| First-time campaign bonus | +50 |

#### Inventory System
- [ ] **Item Pickups** — Nodes can grant items (relics, weapons, potions)
- [ ] **Inventory Slots** — Limited inventory (expand with levels)
- [ ] **Item Effects** — Consumables, stat boosters, quest items
- [ ] **Item Trading** — Trade items between characters (future)

**Database Addition:**
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `rp_items` | Item definitions | `name`, `description`, `type`, `effect` (JSONB), `rarity`, `icon_url` |
| `rp_character_inventory` | Items held by characters | `character_id`, `item_id`, `quantity`, `acquired_at`, `source_node_id` |

#### Character Death & Failure
- [ ] **Death Nodes** — Special ending nodes for character death
- [ ] **Permadeath Mode** — Optional hardcore mode (character deleted on death)
- [ ] **Respawn System** — Default: restart from last checkpoint node
- [ ] **Injury System** — Temporary stat penalties instead of death
- [ ] **Legacy System** — Dead characters leave items/bonuses for next character

**Failure Handling:**
- Soft fail: Retry the node with different choice
- Hard fail: Sent to "failure branch" with recovery path
- Death: Campaign ends, character marked as "fallen" (visible in graveyard)

#### Achievements (Roleplay-Specific)
- [ ] **First Steps** — Create your first character
- [ ] **Storyteller** — Complete 5 campaigns
- [ ] **Lorekeeper** — Have a lore proposal approved
- [ ] **Survivor** — Complete a campaign without failing any stat check
- [ ] **Explorer** — Visit 50 unique story nodes
- [ ] **Charismatic** — Pass 10 Charisma checks
- [ ] **Completionist** — See all endings of a campaign

---

### Rich Media Support

#### Node Illustrations
- [ ] **Header Images** — Optional banner image per story node
- [ ] **Inline Images** — Embed images within narrative text
- [ ] **Image Library** — Campaign creators upload to dedicated bucket
- [ ] **Stock Art Integration** — Curated fantasy art for common scenes

**Storage:**
- Bucket: `rp-campaign-assets` (public, with RLS per campaign author)
- Max file size: 2MB per image
- Supported formats: JPG, PNG, WebP

#### Audio & Ambiance
- [ ] **Background Music** — Loop ambient tracks per node/chapter
- [ ] **Sound Effects** — Trigger sounds on choice selection
- [ ] **Audio Library** — Pre-approved royalty-free tracks
- [ ] **Custom Audio Upload** — Authors upload their own (with moderation)

**Audio Categories:**
- Ambient (forest, tavern, dungeon, storm)
- Dramatic (battle, discovery, tension)
- Emotional (sad, triumphant, mysterious)

#### NPC Portraits
- [ ] **Portrait Slots** — Nodes can display speaking NPC portraits
- [ ] **Expression Variants** — Happy, angry, sad, neutral per NPC
- [ ] **Portrait Position** — Left, right, or center of narrative text
- [ ] **Animated Portraits** — Subtle idle animations (future)

**Database Addition:**
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `rp_campaign_npcs` | NPCs in a campaign | `campaign_id`, `name`, `description`, `portrait_url`, `expressions` (JSONB) |
| `rp_node_media` | Media attached to nodes | `node_id`, `type` (image/audio), `url`, `position`, `loop` |

#### Location Illustrations
- [ ] **Location Backdrops** — Full-width scene art behind narrative
- [ ] **Parallax Scrolling** — Subtle depth effect on scene layers
- [ ] **Day/Night Variants** — Different art based on story time
- [ ] **Weather Overlays** — Rain, snow, fog effects on scenes

---

### Creator Tools

#### Campaign Versioning
- [ ] **Version History** — Track changes to published campaigns
- [ ] **Rollback** — Revert to previous version
- [ ] **Draft Mode** — Edit without affecting live players
- [ ] **Changelog** — Authors document changes per version

**Version Flow:**
```
Draft v1 → Publish → Draft v2 (edit) → Publish v2
                ↓
        Active players on v1 finish
        New players get v2
```

#### Co-Authoring
- [ ] **Collaborator Invites** — Invite other users to edit campaign
- [ ] **Role Permissions** — Owner, Editor, Viewer roles
- [ ] **Edit Locking** — Prevent conflicts when editing same node
- [ ] **Activity Log** — See who edited what and when

**Database Addition:**
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `rp_campaign_collaborators` | Co-authors | `campaign_id`, `user_id`, `role`, `invited_at`, `accepted_at` |
| `rp_campaign_versions` | Version history | `campaign_id`, `version`, `snapshot` (JSONB), `published_at`, `changelog` |

#### Starter Templates
- [ ] **Template Library** — Pre-built campaign structures
- [ ] **Genre Templates** — Mystery, Adventure, Horror, Romance
- [ ] **Tutorial Template** — Step-by-step guide for new creators
- [ ] **Fork Existing** — Clone a published campaign as starting point

**Template Examples:**
- "Three-Act Adventure" — Classic hero's journey structure
- "Murder Mystery" — Clue-gathering with multiple suspects
- "Survival Horror" — Resource management + escape
- "Political Intrigue" — Faction reputation + dialogue trees

#### Import/Export
- [ ] **JSON Export** — Download campaign as JSON file
- [ ] **JSON Import** — Upload JSON to create campaign
- [ ] **Markdown Support** — Write nodes in Markdown format
- [ ] **Bulk Node Import** — CSV import for rapid prototyping

**Export Format:**
```json
{
  "campaign": { "title": "...", "genre": "..." },
  "nodes": [
    { "id": "start", "type": "narrative", "content": "..." },
    { "id": "choice1", "type": "choice", "choices": [...] }
  ],
  "connections": [
    { "from": "start", "to": "choice1" }
  ]
}
```

---

### Lore Integration

#### World Map Connection
- [ ] **Location Pins** — Nodes reference `almanac_locations`
- [ ] **Journey Tracker** — Show character's path on world map
- [ ] **Discoverable Locations** — Unlock map locations through story
- [ ] **Region-Locked Campaigns** — Campaigns set in specific regions

**Map Integration UI:**
- Mini-map in story player showing current location
- Full map view in character sheet with visited locations
- Campaign browser filters by map region

#### NPC Relationship Tracking
- [ ] **Relationship Score** — -100 (enemy) to +100 (ally) per NPC
- [ ] **Relationship Effects** — Score affects dialogue options, stat checks
- [ ] **Relationship History** — Log of actions that changed relationship
- [ ] **NPC Memory** — NPCs reference past interactions

**Database Addition:**
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `rp_character_relationships` | NPC relationships | `character_id`, `npc_id`, `score`, `history` (JSONB) |

**Relationship Thresholds:**
| Score | Status | Effect |
|-------|--------|--------|
| -100 to -50 | Hostile | May attack, refuse help |
| -49 to -10 | Unfriendly | Higher stat checks |
| -9 to +9 | Neutral | Standard interactions |
| +10 to +49 | Friendly | Lower stat checks |
| +50 to +100 | Allied | Special dialogue, gifts |

#### Faction Reputation
- [ ] **Faction Standings** — Track reputation with `almanac_factions`
- [ ] **Faction Perks** — High reputation unlocks abilities, items
- [ ] **Faction Conflicts** — Raising one may lower another
- [ ] **Faction Quests** — Campaigns aligned to specific factions

**Reputation Events:**
- Completing faction-aligned campaign: +20
- Choices favoring faction: +5 to +15
- Betraying faction: -30 to -50
- Helping rival faction: -10

#### Almanac Cross-References
- [ ] **Lore Popups** — Hover almanac terms for quick definitions
- [ ] **Entry Links** — Click to open full almanac entry
- [ ] **Auto-Detection** — Highlight known almanac terms in narrative
- [ ] **Spoiler Protection** — Hide almanac links until term is encountered in story

**Implementation:**
- Reuse `AlmanacReferenceParser` component
- Cache almanac entries in `useAlmanacEntries` hook (already exists)
- Mark terms with `[[term]]` syntax in node content

### Mobile & Accessibility

#### Mobile-First Roleplay
- [ ] **Touch-Optimized Story Player** — Large tap targets, swipe between choices
- [ ] **Portrait Mode Layout** — Vertical story flow for mobile reading
- [ ] **Offline Story Caching** — Download campaigns for offline play
- [ ] **Push Notifications** — Alert when it's your turn in group sessions
- [ ] **Vibration Feedback** — Haptic response on critical choices/events

#### Accessibility Features
- [ ] **Screen Reader Support** — ARIA labels on all interactive elements
- [ ] **Keyboard Navigation** — Full campaign playthrough via keyboard
- [ ] **High Contrast Mode** — Alternative color scheme for visibility
- [ ] **Font Size Controls** — Adjustable text size in story player
- [ ] **Dyslexia-Friendly Font** — OpenDyslexic font option
- [ ] **Reduced Motion** — Disable animations for vestibular disorders

### Social & Discovery

#### Campaign Discovery
- [ ] **Trending Campaigns** — Weekly popular campaigns based on plays/ratings
- [ ] **Staff Picks** — Loremaster-curated featured campaigns
- [ ] **Genre Playlists** — Curated lists: "Best Horror", "Epic Adventures"
- [ ] **Author Spotlights** — Featured campaign creators with bios
- [ ] **Similar Campaigns** — "Players also enjoyed" recommendations

#### Social Features
- [ ] **Campaign Reviews** — Rate and review completed campaigns
- [ ] **Play History** — Public profile showing campaigns completed
- [ ] **Character Showcase** — Share character sheets publicly
- [ ] **Session Replays** — Read-only playback of notable sessions
- [ ] **Leaderboards** — Top characters by XP, achievements, etc.

#### Streaming & Content Creation
- [ ] **Streamer Mode** — Hide spoilers, clean UI for broadcasts
- [ ] **Spectator Mode** — Watch group sessions live (read-only)
- [ ] **Clip Sharing** — Share specific story moments as images
- [ ] **Campaign Trailers** — Auto-generate preview from first nodes

---

## 🚀 Suggested Feature Additions

### High Priority
- [x] **User Dashboard** - Personal dashboard showing reading progress, achievements, and activity summary
- [ ] **Book Reading Tracker** - Track pages read per session with time-based analytics
- [x] **Push Notifications** - Real-time browser push notifications via Service Worker (PWA)
- [x] **Advanced Search** - Full-text search across books, almanac entries, and community content
- [x] **Offline Mode** - PWA support with service worker caching for offline access

### Community Features
- [x] **@Mentions in Replies** - Tag users in forum and submission replies
- [x] **Reply Editing/Deleting** - Edit and delete your own replies
- [x] **Direct Messaging** - Private messaging between users
- [x] **Discussion Replies** - Fixed book club discussion replies functionality
- [ ] **User Badges Display** - Show earned badges on user profiles and submissions
- [ ] **Community Challenges** - Weekly/monthly reading or art challenges
- [ ] **Submission Collections** - Allow users to create curated collections of submissions
- [x] **Polls in Discussions** - Add polling feature to forum discussions
- [ ] **User Reputation Levels** - Visual rank progression based on activity
- [ ] **Trending Submissions** - Weekly/daily trending section based on engagement
- [ ] **Art Contests** - Time-limited community art competitions with voting
- [ ] **Submission Reactions** - Multiple reaction types beyond likes (love, wow, insightful)

### Almanac & Lore
- [x] **Interactive World Map** - Clickable map showing kingdoms, locations, and character origins
- [ ] **Timeline Filtering** - Filter chronology by era, character, or event type
- [x] **Character Comparison** - Side-by-side character stat comparison
- [ ] **Lore Quiz Mode** - Interactive quizzes about the ThouArt universe
- [ ] **Audio Narration** - Text-to-speech for almanac articles
- [ ] **Character Gallery View** - Grid view of all characters with quick filters
- [ ] **Faction/Affiliation Pages** - Dedicated pages for each faction showing members
- [ ] **Event Impact Visualization** - Show how events affected characters/locations

### Reading Experience
- [ ] **Reading Themes** - Sepia, dark, and custom color themes for e-reader
- [x] **Highlight & Notes** - Save highlights and notes while reading
- [ ] **Reading Goals** - Set and track daily/weekly reading goals
- [x] **Book Clubs** - Create and join book discussion groups
- [ ] **Annotation Sharing** - Share highlighted passages with the community
- [ ] **Read-Along Mode** - Synchronized reading sessions for book clubs
- [ ] **Chapter Progress Indicator** - Visual chapter-by-chapter progress bar
- [ ] **Reading Time Estimates** - Show estimated reading time per chapter

### E-Commerce & Books
- [ ] **Book Bundle Discounts** - Discount when purchasing multiple books together
- [ ] **Gift Cards** - Purchase and redeem gift cards for the store
- [ ] **Pre-Order System** - Allow pre-orders for upcoming books
- [ ] **Book Sample Downloads** - Free sample chapter downloads
- [ ] **Purchase Receipts via Email** - Email confirmation for orders
- [ ] **Order Tracking** - Track order status and shipping
- [ ] **Related Books Suggestions** - "Readers also bought" recommendations

### Admin Features
- [ ] **Bulk Content Import** - CSV/JSON import for almanac entries
- [x] **Analytics Dashboard** - Detailed user engagement and content metrics
- [x] **Content Scheduling** - Schedule almanac entries and announcements
- [ ] **A/B Testing** - Test different layouts and features
- [x] **Moderation Queue** - Enhanced moderation tools for submissions
- [ ] **User Management** - Admin tools for managing user accounts and roles
- [ ] **Sales Reports** - Detailed sales analytics with export options
- [ ] **Email Templates** - Customizable email templates for notifications

### Technical Improvements
- [x] **Image Optimization** - Lazy loading with intersection observer and WebP fallback support
- [x] **Caching Strategy** - Service worker caching via PWA for faster loads
- [ ] **SEO Enhancements** - Dynamic meta tags and structured data
- [ ] **Performance Monitoring** - Add analytics for Core Web Vitals
- [ ] **Accessibility Audit** - Full WCAG 2.1 compliance review
- [ ] **Rate Limiting** - Prevent spam and abuse on forms
- [ ] **Error Boundary Components** - Graceful error handling throughout app
- [x] **Skeleton Loaders Everywhere** - Consistent staggered loading states on all pages

---

## 🐛 Known Bugs & Fixes Needed

### Critical
- [ ] Fix intermittent bun install timeout during builds
- [ ] Ensure RLS policies are correctly applied to all tables
- [ ] Book versions showing "Unavailable" on homepage despite data existing

### UI/UX
- [ ] Dropdown menus occasionally transparent on certain pages
- [x] Mobile navigation menu doesn't close on route change
- [ ] Image aspect ratios inconsistent in submission cards
- [x] Dark mode color contrast issues on some badges
- [ ] Community page hero section has rendering issues (faded cards visible)
- [ ] Some submission card titles show placeholder text ("d", "eeeee", "cectctc")
- [ ] Book details page shows empty ISBN field
- [ ] Price display shows $22.00 but format options all say "Unavailable"
- [x] Missing "Forum" link in main navigation (only Books & Community visible)

### Functionality
- [ ] Forum reply notifications not always triggering
- [ ] Bookmark labels not persisting after page refresh
- [ ] Reading progress sometimes resets when switching devices
- [ ] Search results pagination resets filter state
- [ ] Community stats show "0 Members" even when users exist
- [ ] Missing review count sync with actual reviews

### Performance
- [ ] Large almanac pages slow to render with many images
- [x] Relationship map performance degrades with 50+ characters (fixed SVG rendering)
- [ ] Community page initial load could be faster
- [ ] Chronology page world map image is quite large

---

## ✅ Recently Completed

- [x] Breadcrumb navigation component for detail pages
- [x] Navigation progress bar during route transitions
- [x] Empty state component with illustrations
- [x] IconButton component with tooltip support
- [x] Gallery image manager for all almanac categories
- [x] Push notifications with Service Worker support
- [x] PWA configuration with offline caching
- [x] @Mentions in forum replies with user search
- [x] Reply editing and deleting functionality
- [x] Enhanced profile dropdown component
- [x] Fixed fan art submission links (404 error)
- [x] Fixed user preferences settings persistence
- [x] Modern UI overhaul with rounded corners and softer design
- [x] Page transition animations with framer-motion
- [x] Staggered list and grid animations
- [x] Dynamic force-directed relationship map (Obsidian-style)
- [x] Particle effects on relationship map
- [x] Card hover effects with scale and glow
- [x] Staggered skeleton loading states
- [x] Featured creations section fix
- [x] Almanac image rounded corners fix
- [x] Character stats database table for comparison feature
- [x] World locations database table for interactive map

---

## 🎯 QA Testing Notes (Jan 2026)

### Homepage
- ✓ Book display loads correctly with cover image
- ✓ "Explore the Realms" button works
- ⚠ Book format selector shows all formats as "Unavailable"
- ⚠ Review count appears randomized (not from DB)

### Books Page
- ✓ Filter sidebar works correctly
- ✓ Price range slider functional
- ✓ Category checkboxes work
- ✓ Sort dropdown works
- ✓ Grid/List view toggle added

### Community Page
- ✓ Gallery/Discussions/Book Clubs tabs work
- ✓ Submit Creation button visible
- ✓ Search and filter options present
- ⚠ Stats show 0 for Discussions, Reviews, Members
- ⚠ Some submission cards have placeholder content

### Chronology Page
- ✓ Beautiful world map header
- ✓ Timeline with eras displays correctly
- ✓ Almanac sidebar with category links
- ✓ Events show dates in BGD format
- ⚠ Could benefit from era filtering
- ⚠ Character links in events would be nice

### Suggested UX Improvements
- [x] Add breadcrumb navigation on detail pages
- [x] Add "Back to top" button on long pages
- [x] Add loading indicators on navigation
- [x] Add empty state illustrations (not just text)
- [x] Add keyboard shortcuts for power users
- [x] Add confirmation modals before destructive actions
- [x] Add tooltips on icon-only buttons

### New UI/UX Improvements (Feb 2026)

#### Homepage & Navigation
- [ ] **Animated Hero Section** — Add subtle parallax or fade-in on book cover
- [ ] **Quick Category Pills** — Horizontal scroll of genre filters on homepage
- [ ] **Recently Viewed** — Show last 3-5 books user viewed
- [ ] **Announcement Banner** — Dismissible banner for sales/new releases
- [ ] **Forum Link in Header** — Add Forum to main navigation (currently missing)

#### Visual Polish
- [ ] **Consistent Card Shadows** — Standardize shadow depths across all cards
- [ ] **Micro-Interactions** — Add subtle hover states on all interactive elements
- [ ] **Loading Shimmer** — Replace spinner with shimmer skeleton on page loads
- [ ] **Image Placeholder Blur** — BlurHash or LQIP for image loading
- [ ] **Scroll-Triggered Animations** — Fade-in sections as user scrolls

#### Mobile Experience
- [ ] **Bottom Navigation Bar** — Fixed bottom nav for key actions on mobile
- [ ] **Swipe Gestures** — Swipe between book gallery items on mobile
- [ ] **Pull-to-Refresh** — Native-feeling refresh on list pages
- [ ] **Floating Action Button** — Quick "Add to Cart" or "Create" button
- [ ] **Mobile-Optimized Modals** — Full-screen sheets instead of centered modals

#### Accessibility
- [ ] **Skip to Content Link** — Keyboard nav for screen readers
- [ ] **Focus Visible States** — Clear focus outlines on all interactive elements
- [ ] **Color Contrast Audit** — Ensure WCAG AA on all text
- [ ] **Alt Text Review** — Audit all images for descriptive alt text
- [ ] **Reduced Motion Support** — Respect `prefers-reduced-motion`

#### Performance Perception
- [ ] **Optimistic UI Updates** — Instant feedback on add to cart/wishlist
- [ ] **Prefetch on Hover** — Preload likely next pages
- [ ] **Infinite Scroll Option** — Alternative to pagination on galleries
- [ ] **Image Lazy Loading** — Intersection observer for below-fold images

#### Delight Features
- [ ] **Confetti on Purchase** — Celebrate successful checkout
- [ ] **Reading Milestone Toasts** — "You've read 100 pages today!"
- [ ] **Easter Eggs** — Hidden interactions for loyal users
- [ ] **Seasonal Themes** — Holiday-themed color schemes

---

## 📋 Development Notes

### Design System
- Use HSL colors from CSS variables
- Maintain consistent 2xl border radius on cards
- Follow semantic token naming (primary, secondary, muted, accent)
- Keep animations subtle (0.2-0.4s duration, easeOut)

### Code Patterns
- Create focused components (< 200 lines ideal)
- Use custom hooks for data fetching
- Prefer parallel tool calls for efficiency
- Add staggered animations to lists/grids

### Testing Checklist
- [ ] Test on mobile viewport
- [ ] Verify dark mode appearance
- [ ] Check loading states
- [ ] Validate form submissions
- [ ] Test authenticated vs guest views
- [ ] Test with empty data states
- [ ] Test with slow network (3G throttle)
