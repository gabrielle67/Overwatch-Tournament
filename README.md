
![Header](assets/OW-Header.png.png)

# OW Team Placement on Discord

Discord Bot for custom tournaments in Overwatch 2. Much like the game, it places 10 players into 2 teams of 5 and assigns roles based on given role preferences (Tank, DPS, Support) using Discord.js.

## Commands
```/createteam``` takes 10 usernames and responds with the players organized into 2 teams and 3 roles.

```/map``` takes 1 of 5 game modes and responds with a Overwatch map

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
