# Setup Commands for Deno Backend Project

## Project Setup
```bash
# Create project structure
mkdir -p research/deno-backend
cd research/deno-backend
git init

# Create basic project structure
mkdir -p src/{controllers,routes,services,middleware,types}
mkdir -p tests
touch src/app.ts src/deps.ts src/config.ts
```

### Project Structure Explanation
```
deno-backend/
├── src/
│   ├── controllers/    # Request handlers and business logic
│   ├── routes/         # API endpoint definitions
│   ├── services/       # Core business logic and external service integration
│   ├── middleware/     # Custom middleware (error handling, authentication)
│   ├── types/         # TypeScript type definitions
│   ├── app.ts         # Main application entry point
│   ├── deps.ts        # Centralized dependencies
│   └── config.ts      # Configuration management
├── tests/             # Test files
├── .env               # Environment variables (git-ignored)
├── .env.defaults      # Default environment variables
├── .env.example       # Example environment configuration
└── deno.json         # Deno configuration and scripts
```

## Dependencies Setup
```bash
# Install Deno (if not already installed)
brew install deno

# Add key dependencies
deno add npm:@google/generative-ai@^0.21.0
deno add oak@12.6.1
deno add oak_cors@0.1.1
```

### Example deno.json Configuration
```json
{
  "tasks": {
    "start": "deno run --allow-net --allow-read --allow-env --watch src/app.ts",
    "test": "deno test --allow-net --allow-read --allow-env",
    "compile": "deno compile --allow-net --allow-read --allow-env src/app.ts"
  },
  "imports": {
    "oak": "https://deno.land/x/oak@v12.6.1/mod.ts",
    "oak/": "https://deno.land/x/oak@v12.6.1/",
    "dotenv": "https://deno.land/std@0.204.0/dotenv/mod.ts",
    "testing/": "https://deno.land/std@0.204.0/testing/",
    "assert": "https://deno.land/std@0.204.0/assert/mod.ts"
  }
}
```

## Environment Setup
```bash
# Create environment files
touch .env .env.defaults .env.example
```

### Example .env.example Configuration
```env
# Server Configuration
PORT=8000

# Google AI Configuration
API_KEY=your_api_key_here
MODEL_NAME=gemini-pro

# Development Settings
DEBUG=true
ENVIRONMENT=development
```

## Running the Application
```bash
# Start the server in development mode (with file watching)
deno task start

# Start the server in production mode
deno run --allow-net --allow-read --allow-env src/app.ts

# Compile the application
deno task compile
```

## Testing Commands
```bash
# Run all tests
deno task test

# Run specific test file
deno test --allow-net --allow-read --allow-env tests/interviewService.test.ts

# Run tests with different reporters
deno test --allow-net --allow-read --allow-env --reporter pretty
deno test --allow-net --allow-read --allow-env --reporter dot
deno test --allow-net --allow-read --allow-env --reporter junit > test-results.xml

# Run tests with coverage
deno test --coverage=coverage --allow-net --allow-read --allow-env
deno coverage coverage --lcov --output=coverage.lcov

# Run tests in watch mode during development
deno test --watch --allow-net --allow-read --allow-env
```

## Deno Permissions Explained
```bash
--allow-net          # Required for making HTTP requests and running the server
--allow-read         # Required for reading .env files and static assets
--allow-env          # Required for accessing environment variables
--allow-write        # Required for writing logs (if implemented)
--unstable           # Required for some experimental features
```

## Troubleshooting Guide

### Common Issues and Solutions

1. **Permission Errors**
```bash
# If you see "PermissionDenied" errors, ensure you've granted all required permissions
deno run --allow-all src/app.ts  # For development only
```

2. **Module Resolution Issues**
```bash
# Clear Deno's cache if you're having module resolution problems
deno cache --reload src/deps.ts
```

3. **Environment Variables Not Loading**
```bash
# Check if .env file is properly loaded
deno run --allow-read --allow-env src/config.ts

# Verify environment variables manually
echo $API_KEY
```

4. **TypeScript Errors**
```bash
# Check types without running the code
deno check src/app.ts

# Get detailed type information
deno info src/app.ts
```

5. **Test Failures**
```bash
# Run tests with detailed logging
deno test --allow-all --fail-fast --filter "test_name" tests/

# Debug tests with inspector
deno test --inspect-brk --allow-all tests/
```

## Git Commands and Workflow
```bash
# Initial setup
git init
git branch -M main

# Create .gitignore
echo ".env\n.DS_Store\ncoverage/\n*.log" > .gitignore

# Regular workflow
git add .
git commit -m "descriptive commit message"
git push -u origin main

# Create feature branch
git checkout -b feature/new-feature
```

## Development Tools

### Code Formatting
```bash
# Format all TypeScript files
deno fmt

# Check formatting without making changes
deno fmt --check
```

### Linting
```bash
# Lint all files
deno lint

# Lint specific file or directory
deno lint src/
```