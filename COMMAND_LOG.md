# Command Log - Project Setup

## Initial Project Setup
```bash
cd ~/Documents/mission_ready/level-05/
mkdir mission-05
cd mission-05
mkdir -p research/deno-backend
cd research/deno-backend
git init
```

## File Creation and Project Structure
```bash
# Create initial configuration
nano deno.json
mkdir src
nano src/deps.ts

# Setup routes
mkdir -p src/routes
nano src/routes/apiRoutes.js

# Setup controllers
mkdir -p src/controllers 
nano exampleController.ts

# Setup services
mkdir -p src/services
nano src/services/generativeAiService.ts
nano src/app.ts

# Setup tests
mkdir tests
nano tests/exampleController.test.ts

# Setup environment
nano .env
nano .env.defaults
nano .env.example
nano import_map.json
```

## Dependencies Installation
```bash
# Install Google AI
npm install @google/generative-ai

# Install Deno
brew install deno
deno --version

# Add Deno dependencies
deno add npm:@google/generative-ai
```

## Development Commands
```bash
# Start the server
deno task start

# Run tests
deno task test
deno test --allow-net --allow-import --allow-read --allow-env tests/exampleController.test.ts
deno test --allow-net server.test.ts
deno test --allow-net --allow-read --allow-env --reporter 'tap' tests/exampleController.test.ts

# Run server with permissions
deno run --allow-net --allow-read --allow-env src/app.ts
```

## Deno Version Management
```bash
# Uninstall and reinstall Deno
brew uninstall deno
curl -fsSL https://deno.land/install.sh | sh
source ~/.zshrc

# Version upgrades and downgrades
deno upgrade --version 2.0.0
deno upgrade --version 2.1.0
deno upgrade --version 1.46.0-rc.1  # Final working version
```

## Git Commands
```bash
# Initial commit
git add .
git commit -m "my first running deno server, with GET route /example at http://localhost:5468/example"

# Deno version fix commit
git add .
git commit -m "downgraded deno to 1.46.0-rc.1, removed deno.lock as wrong version (4), this fixed problem with depreciated features in deno 2.0 like window/globalThis and assert/with imports. tests of endpoint now run and pass."

# Feature commits
git add .
git commit -m "deno app is now talking to Gemini, and passing api endpoint tests."

git add .
git commit -m "update README.md with project folder tree."

# Repository setup and push
git branch -M main
git remote add origin https://<PAT>@github.com/Astrotope/mr-level-05-fsd-mission-04-research.git
git push -u origin HEAD