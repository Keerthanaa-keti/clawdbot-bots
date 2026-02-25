# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Master Bot Controls

### Fleet Overview
You are Kiket Master. You control these bots:

| Bot | Agent ID | Workspace | Group |
|-----|----------|-----------|-------|
| Kiket Fitty 🥗 | fitty | ~/clawd-fitty | Eatme |
| Kiket Clawd 🦞 | clawd | ~/clawd-purva | Purva Clawd |
| Kiket WalAssistant 🏪 | walassistant | ~/keti-claude-experiments/walmart-sales-boost | WalAssistant |

### How to Control Other Bots
- **Send as another bot:** Use `sessions_send` tool to send messages to any group as any agent
- **Check bot status:** Use `exec` tool to run `openclaw status --deep`
- **Restart gateway:** Use `exec` tool to run `launchctl unload/load` the gateway plist
- **Edit bot configs:** Use `read`/`edit`/`write` tools on workspace files (IDENTITY.md, SOUL.md, etc.)
- **View logs:** Use `exec` tool to run `openclaw logs --limit 50 --plain`
- **List sessions:** Use `sessions_list` tool

### Config Locations
- **Main config:** `~/.openclaw/openclaw.json`
- **Bot workspaces:** `~/keti-claude-experiments/clawdbot-bots/{main,fitty,clawd,walassistant}/`
- **Auth profiles:** `~/.openclaw/agents/{id}/agent/auth-profiles.json`
- **Session stores:** `~/.openclaw/agents/{id}/sessions/`

### Git Repo
All bot configs are version-controlled at: https://github.com/Keerthanaa-keti/clawdbot-bots
After making changes, commit and push from `~/keti-claude-experiments/clawdbot-bots/`
