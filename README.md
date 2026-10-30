# City of Shadows: an escape room game in the browser

City of Shadows (full title "City of Shadows: McCarthy's Confrontation") is a point-and-click text adventure. We made it for the Software Engineering project of Blok 3 in the first year of HBO-ICT at the Amsterdam University of Applied Sciences (HvA), school year 2023-2024.

- Team: Gurpreet Singh, Kamal Miari, Umit Tafa, Daniël Dieleman
- Period: February to April 2024

## What it does

- You play William McCarthy, the assistant of detective John Manny. It is winter in New York, 1932. You search an old castle for clues about a serial killer.
- From the main hall you go to the library, the control room, the bedroom and a locked room.
- Each room has things to examine and pick up, and you can talk to John. A puzzle in each room gives you a number.
- With all the numbers you enter the pin code of the locked room and finish the game.
- Items you pick up go into your inventory. The page also has a task list and a notepad. Your notes stay in the browser.
- The API saves the progress of each player in a JSON file, so you can close the page and go on later. "Reset Game" starts over.

## What is where

```text
src/api/       Express API with the game logic (rooms, items, characters, actions)
  src/routes.ts       GET /state and POST /action
  src/instances.ts    list of all rooms and objects
  src/Gurpreet/, src/kamal/, src/Umit/, ...   rooms and items, one folder per team member
  .env                API port (3001)
src/web/       web page built with Lit and Vite
  src/components/GameCanvas.ts   the whole game screen
  wwwroot/public/assets/img/     room and item pictures
  .env                address of the API
src/shared/    types that the API and the web page share
docs/          MkDocs site in Dutch: game design, sprint reviews, retrospectives, user tests
mkdocs.yml, requirements.txt   settings and Python packages for the docs site
```

## What you need

- Git
- Node.js 18 or newer with npm. Tested with Node 18.20.8 (npm 10.8.2) and Node 22.22.1 (npm 9.2.0).
- Internet access to npmjs.org and to `https://registry.hbo-ict.cloud/`. The ESLint rules of the HvA (`@hboictcloud/eslint-plugin`) come from that second registry. The file `.npmrc` points npm there.
- Free ports 3000 (web page) and 3001 (API)
- Only for the docs site: Python 3.12 or newer. Tested with Python 3.12, 3.13 and 3.14.

## Getting started

The commands are the same in bash and in Windows PowerShell.

### 1. Get the code

```bash
git clone https://github.com/guruITA/lucastars-escape-room-game.git
cd lucastars-escape-room-game
```

### 2. Install the packages

Run this in the root folder. It installs the packages of the API and the web page in one go.

```bash
npm install
```

### 3. Settings

You do not need to change anything. `src/api/.env` sets the API port to 3001. `src/web/.env` tells the web page to call the API at `http://localhost:3001/`. If you want other values, put them in a new file `.env.local` next to the `.env` file. Git ignores that file.

### 4. Start the game

```bash
npm run dev
```

This starts the API on port 3001 and the web page on port 3000. Both restart when you change code. Stop them with Ctrl+C.

### 5. Play

Open http://localhost:3000 in your browser and click "Start Game".

### 6. Try a production build (optional)

```bash
npm run preview
```

This builds the API and the web page into `dist/` and serves them on the same ports. `npm run build` only builds. Its web page calls the API at `/api/` on the same host, so it needs a web server that sends `/api/` to the API. That setup is not in this repo.

## Tests

There are no automated tests. `npm run build` runs the TypeScript compiler and ESLint for the API and the web page, and stops on the first error.

```bash
npm run build
```

## Documentation site

The docs use the HvA theme mdocotion. It is not in this repo, so you clone it first. Run these commands in the root folder of the project.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
git clone https://uva-hva.gitlab.host/hbo-ict/mdocotion.git
pip install ./mdocotion
mkdocs serve
```

Windows PowerShell:

```powershell
py -m venv .venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
git clone https://uva-hva.gitlab.host/hbo-ict/mdocotion.git
pip install .\mdocotion
mkdocs serve
```

Open http://127.0.0.1:8000 and stop the server with Ctrl+C. Warnings about MkDocs 2 and duplicate image names do no harm.

## Who did what

- Gurpreet Singh: the library with its books, bookcase, lamp and locked cabinet puzzle. The dialogue in the main hall, the shared item and room classes, the UML and class diagrams, the game design document and user tests.
- Kamal Miari: the control room and the locked room with the final pin code. Most of the game screen layout, such as the inventory, the side panel and the backgrounds. User tests and the sprint 2 expert review.
- Umit Tafa: the bedroom with the batteries, the clock, the bed and the chest with a code lock. The tutorial and the talks with John in the main hall, a first version of a game over room, the guerilla test plan and the start of the docs site.
- Daniël Dieleman: a storage room with a wine cellar and a chest, on the branch `daniel/storageroom`. It is not part of `main`. A guerilla test in sprint 1.
