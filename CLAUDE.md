# Clawdbot Bots — Kiket WhatsApp Bot Fleet

## Overview

WhatsApp bots powered by OpenClaw (formerly Clawdbot) for Keti & Kishore.
All bots share the name **Kiket** but each has a unique personality, purpose, and emoji for its specific group.

**Bot WhatsApp Number:** +918618088374
**Platform:** OpenClaw Gateway (local, port 18789)
**Config:** `~/.openclaw/openclaw.json`
**Model:** claude-sonnet-4-20250514 (default)

---

## Architecture

```
~/.openclaw/                    Central config & state
  ├── openclaw.json             Primary config (agents, channels, bindings)
  └── agents/{id}/              Per-agent auth & sessions

~/keti-claude-experiments/
  └── clawdbot-bots/            THIS REPO — all bot workspace files
      ├── main/                 → symlinked as ~/clawd
      ├── fitty/                → symlinked as ~/clawd-fitty
      ├── clawd/                → symlinked as ~/clawd-purva
      └── walassistant/         → workspace at ~/keti-claude-experiments/walmart-sales-boost
```

Each bot folder contains: IDENTITY.md, SOUL.md, AGENTS.md, TOOLS.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md

Changes to any bot's workspace files are automatically tracked by this git repo.

---

## The Bots

### 1. Kiket Master (main) 🤖

**Agent ID:** `main`
**Workspace:** `main/` → symlinked as `~/clawd`
**Groups:** KK Home (`120363406071109282@g.us`), Future Leaders (`120363405170722609@g.us`, `120363419957801021@g.us`)
**Trigger:** Responds to every message in KK Home, every message in Future Leaders

**Purpose:** The master bot. Has access to control all other bots and their configurations. Can manage the OpenClaw gateway, restart services, modify bot behavior, and coordinate across groups. This is the bot Keti uses to build and manage the entire fleet — even remotely without the laptop.

**Capabilities:**
- Home & lifestyle assistant for KK Home group
- Gateway management (restart, config, status)
- Controls other bot configurations
- Browser automation, web search, file system access
- Cron jobs and scheduled tasks
- Can spawn subagents for complex tasks

---

### 2. Kiket Fitty 🥗

**Agent ID:** `fitty`
**Workspace:** `fitty/` → symlinked as `~/clawd-fitty`
**Group:** Eatme (`120363425555739439@g.us`)
**Trigger:** Responds to every message (no mention needed)

**Purpose:** Nutrition tracking bot for the Eatme WhatsApp group. Automatically tracks food intake, calculates calories and macros, and maintains daily totals per person.

**What Fitty does:**
- Tracks food when mentioned in conversation ("had idli sambar for breakfast")
- Calculates calories and full macros (protein, carbs, fat)
- Built-in Indian food database (50+ items: idli, dosa, biryani, etc.)
- Handles restaurant vs homemade multipliers
- Asks clarifying questions about portion sizes and cooking methods
- Provides end-of-day summaries
- Supports corrections ("remove samosa from today")

**Users:**
| Person | Calorie Goal | Protein Goal |
|--------|-------------|--------------|
| Keti | ~1,800/day | ~60g/day |
| Kishore | ~2,200/day | ~80g/day |

---

### 3. Kiket Clawd 🦞

**Agent ID:** `clawd`
**Workspace:** `clawd/` → symlinked as `~/clawd-purva`
**Group:** Purva Clawd (`120363406870253077@g.us`)
**Trigger:** Responds to every message (no mention needed)

**Purpose:** Personal assistant bot for the Purva group. Chill, reliable companion for general life stuff.

**What Clawd helps with:**
- General assistance and life advice
- Claude/AI discussion and troubleshooting
- Casual conversation with a slightly sassy vibe

---

### 4. Kiket WalAssistant 🏪

**Agent ID:** `walassistant`
**Workspace:** `walassistant/` (also at `~/keti-claude-experiments/walmart-sales-boost/`)
**Group:** WalAssistant (`120363407303267529@g.us`)
**Trigger:** Responds to every message (no mention needed)

**Purpose:** Walmart sales & strategy research assistant. Helps Keti with Walmart-related analysis, sales boost ideas, and marketplace research.

**What WalAssistant helps with:**
- Walmart sales data analysis
- Strategy and ideation for marketplace growth
- Research on e-commerce and retail trends
- Connected to the walmart-sales-boost project context

---

## Group Mapping

| WhatsApp Group | Group ID | Agent | Emoji | Trigger |
|----------------|----------|-------|-------|---------|
| KK Home | `120363406071109282@g.us` | main | 🤖 | Every message |
| Eatme | `120363425555739439@g.us` | fitty | 🥗 | Every message |
| Purva Clawd | `120363406870253077@g.us` | clawd | 🦞 | Every message |
| WalAssistant | `120363407303267529@g.us` | walassistant | 🏪 | Every message |
| Future Leaders 1 | `120363405170722609@g.us` | main | 🤖 | Every message |
| Future Leaders 2 | `120363419957801021@g.us` | main | 🤖 | Every message |

---

## Useful Commands

```bash
# Status & health
openclaw status                     # Overview
openclaw status --deep              # Full health check with probes
openclaw logs --follow              # Live log tail

# Testing bots
openclaw agent --agent main --message "hello"              # Test locally
openclaw agent --agent main --message "hello" --deliver     # Test + deliver to WhatsApp

# Gateway management
openclaw gateway restart            # Restart gateway
openclaw gateway stop               # Stop gateway
openclaw gateway start              # Start gateway
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist    # Load service
launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist  # Unload service

# Sessions
openclaw sessions                   # List all sessions
openclaw config get channels.whatsapp.groups  # Check group config

# Directory
openclaw directory groups list --channel whatsapp   # List groups bot is in
```

---

## Troubleshooting

### Bot not responding
1. Check `openclaw status --deep` — WhatsApp should show "LINKED"
2. Check `openclaw logs --follow` — look for inbound messages
3. Restart gateway: `openclaw gateway restart`
4. If session is bloated (>100k tokens), reset sessions in `~/.openclaw/agents/{id}/sessions/`

### Bot stops mid-response
- Usually caused by session context filling up (200k limit)
- Reset the bloated session: clear `sessions.json` and `*.jsonl` files
- Consider enabling rolling compaction: change `compaction.mode` from "safeguard" to "rolling"

### New group not working
1. Ensure the group is in `openclaw.json` under `channels.whatsapp.groups`
2. If it needs a specific agent, add a binding in `openclaw.json` under `bindings`
3. Restart gateway after config changes

### WhatsApp mention detection
- WhatsApp uses LID-based JIDs, not phone numbers
- Set `requireMention: false` for groups where bot should respond to everything
- `groupPolicy: "open"` + `groupAllowFrom: ["*"]` allows all groups

---

## Git Workflow

This repo is the single source of truth for all bot configurations.
- **Repo:** https://github.com/Keerthanaa-keti/clawdbot-bots
- **Branch:** main
- Workspaces are symlinked: `~/clawd` → `clawdbot-bots/main/`, etc.
- Any change to bot personality, behavior, or config should be committed here
- Runtime state (.openclaw/, .pi/, sessions/) is gitignored

---

*Last updated: February 2026*
