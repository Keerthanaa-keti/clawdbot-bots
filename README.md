# Clawdbot WhatsApp Bots

A collection of WhatsApp bots powered by [Clawdbot](https://clawd.bot) (OpenClaw).

## Bots

### 🥗 fitty - Precision Nutrition Tracker
Tracks calories and macros with accuracy like MyFitnessPal. Features:
- **1,014 verified Indian recipes** from ICMR-NIN Indian Food Composition Tables
- Asks clarifying questions for accurate portions
- Full macro tracking (Protein, Carbs, Fat)
- Distinguishes restaurant vs homemade portions
- Daily summaries and goal tracking

### 🦞 clawd - Claude Expert Assistant
Your witty AI sidekick for all things Claude. Helps with:
- Claude API, Claude Code, and Claude.ai questions
- OpenClaw/Clawdbot setup and troubleshooting
- Latest AI news and features
- Tips and best practices

### 🤖 kkbot - Home & Lifestyle Assistant
General assistant for home automation and productivity tips.

## Setup

1. Install Clawdbot:
   ```bash
   npm install -g clawdbot
   clawdbot setup
   ```

2. Copy the example config:
   ```bash
   cp config/clawdbot.example.json ~/.clawdbot/clawdbot.json
   ```

3. Add your credentials and customize group IDs

4. Copy agent files:
   ```bash
   mkdir -p ~/.clawdbot/agents/fitty/agent
   cp fitty/AGENT.md ~/.clawdbot/agents/fitty/agent/
   # Repeat for other bots
   ```

5. Link WhatsApp:
   ```bash
   clawdbot channels login --channel whatsapp
   ```

## Configuration

### Key Settings for Group Bots

```json
{
  "channels": {
    "whatsapp": {
      "groupPolicy": "open",
      "groupAllowFrom": ["*"],
      "groups": {
        "YOUR_GROUP_ID@g.us": {
          "requireMention": false
        }
      }
    }
  }
}
```

**Important:**
- `groupPolicy: "open"` - Allows messages from all group members
- `groupAllowFrom: ["*"]` - Must be at channel level, not per-group
- `requireMention: false` - Bot responds without needing @mention (fixes WhatsApp LID bug)

### Finding Group IDs
Send a message in the group and check logs:
```bash
clawdbot logs --follow
```
Look for `from: "120363XXXXXXXXXX@g.us"`

## Nutrition Database

fitty uses the **Indian Nutrient Databank (INDB)** - a verified database of 1,014 Indian recipes compiled from:
- ICMR-NIN Indian Food Composition Tables 2017
- USDA FoodData Central
- UK Food Composition Database

Source: [Indian Nutrient Databank](https://github.com/lindsayjaacks/Indian-Nutrient-Databank-INDB-)

## Troubleshooting

### Messages not being received
1. Check connection: `clawdbot channels status`
2. Restart gateway: `clawdbot gateway restart`
3. Verify `groupPolicy` and `groupAllowFrom` settings

### Bot not responding in groups
- Ensure `requireMention: false` is set (WhatsApp LID format bug)
- Check group ID is correct in config
- Verify binding exists for the agent

## License

MIT

## Credits

- [Clawdbot/OpenClaw](https://clawd.bot) - Bot framework
- [INDB](https://github.com/lindsayjaacks/Indian-Nutrient-Databank-INDB-) - Nutrition database
- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
