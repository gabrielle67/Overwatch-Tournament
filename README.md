
![Header](assets/OW-Header.png)

### About
Discord Bot for custom tournaments in Overwatch 2. Much like the game, it places 10 players into 2 teams of 5 and assigns roles based on given role preferences (Tank, DPS, Support) using Discord.js. Each team has 1 Tank, 2 DPS, and 2 Support.


## Commands
|**Slash Command**|**Arg**|**Description**|
|:---------------:|:-----:|:-------------:|
| ```/createteam```| 10 Player Usernames | Mentions the 10 users and prompts them to react to the message based on their role preferences. Places the 10 users into one of 2 teams (Alpha or Bravo) and assigns them a role |
| ```/map``` | Game Mode | Responds with a randomly selected Overwatch map that is associated with the selected game mode |



## Run Locally

Clone the project

```bash
  git clone https://github.com/gabrielle67/Role-Select
```

Go to the project directory

```bash
  cd Role-Select
```

Install dependencies

```bash
  npm install
```

Create a .env file and add Discord developer secrets

```bash
  touch .env
```
Deploy slash commands

```bash
  cd discord-bot
  node deploy-commands.js
```

Run bot
```bash
  node command-handler.js
```
