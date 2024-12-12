# Research Repository

---
## Description

This prototype for Mission 04, takes the code from Mission 03 and converts it to use a Deno/Oak backend. It does not implement any of the Tina AI assistant functionality. The goal was simply to get a well structured Deno project up and going, and gain some experience with Deno. This is a Deno 1 project using the Oak server.

---

## Deno server

- Folder structure

```text
deno-backend/
├── .env
├── .env.defaults
├── .env.example
├── README.md
├── deno.json
├── deno.lock
├── import_map.json
├── src/
│   ├── app.ts
│   ├── config.ts
│   ├── deps.ts
│   ├── routes/
│   │   └── apiRoutes.ts
│   ├── controllers/
│   │   └── conversationController.ts
│   └── services/
│       ├── conversationService.ts
│       ├── generativeAiService.ts
│       └── interviewService.ts
└── tests/
    └── exampleController.test.ts

```
- Project Structure Explanation
- 
```
deno-backend/
├── src/
│   ├── controllers/    # Request handlers and business logic
│   ├── routes/         # API endpoint definitions
│   ├── services/       # Core business logic and external service integration
│   ├── app.ts         # Main application entry point
│   ├── deps.ts        # Centralized dependencies
│   └── config.ts      # Configuration management
├── tests/             # Test files
├── .env               # Environment variables (git-ignored)
├── .env.defaults      # Default environment variables
├── .env.example       # Example environment configuration
└── deno.json         # Deno configuration and scripts
```

- Command Log - Project Setup

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
```

- Core Design Components

### 1. Configuration Management
- **Environment Variables**:
  - `API_KEY`: Google Generative AI API key
  - `MODEL_NAME`: AI model selection (default: "gemini-1.5-pro")
  - `PORT`: Server port (default: 5462)

### 2. API Endpoints
```typescript
POST /conversation/start    # Start a new conversation (just an experiment)
POST /interview/start      # Start a new interview
POST /interview/respond    # Process interview response
POST /interview/analyse    # Analyze interview results
```

### 3. Services

#### Interview Service
- **Features**:
  - Interview initialization
  - Response processing
  - Interview analysis
  - AI-powered question generation
- **Key Functions**:
  ```typescript
  startInterview(input: InterviewInput): InterviewState
  processResponse(input: ResponseInput): Promise<InterviewState>
  analyzeInterview(input: AnalysisInput): Promise<InterviewState>
  ```

#### Conversation Service (just an experiment to try things out)
- Handles general conversation flow
- Integrates with Google's Generative AI
- Manages conversation state

#### Generative AI Service (just a practice service to test this out in Deno)
- Wrapper for Google's Generative AI
- Handles model configuration and API interactions

### 4. Testing Infrastructure

#### Unit Tests
- Mock implementation of Google Generative AI (not yet)
- Environment variable mocking (not yet)
- Comprehensive test coverage for services (not yet)

#### Integration Tests
- API endpoint testing (not yet)
- Request/response validation
- Error handling verification

### 5. Security & Error Handling
- Environment variable validation
- API key management
- Structured error responses
- Input validation (some)

## Technical Stack

### Core Technologies
- **Runtime**: Deno 1.46-rc.1
- **Language**: TypeScript
- **AI Service**: Google Generative AI (Gemini)

```bash
deno --version
deno 1.46.0-rc.1 (release candidate, release, x86_64-apple-darwin)
v8 12.8.374.6-rusty
typescript 5.5.2
```

### Key Dependencies
```typescript
// From deps.ts
- oak@v10.4.0          // Web framework
- cors                 // CORS middleware
- @google/generative-ai// AI capabilities
- std/assert          // Testing utilities
- superoak@4.7.0      // API testing
```

## Development Workflow

### Running the Application
```bash
# Start the server
deno task start

# Run tests
deno task test
```

### Security Permissions
```typescript
--allow-read=.env,.env.defaults,.env.example
--allow-env=API_KEY,MODEL_NAME,PORT
--allow-net
```

## Current State and Next Steps

### Implemented Features
- ✅ Basic API structure
- ✅ Interview service implementation
- ✅ AI integration
- ✅ Environment configuration
- ✅ Initial test coverage

### Pending Improvements

#### 1. Testing
- [ ] Move tests to dedicated directory
- [ ] Add more test coverage
- [ ] Implement E2E testing
- [ ] Add test documentation
- [ ] Setup CI/CD pipeline

#### 2. Architecture
- [ ] Add middleware layer
  - [ ] Error handling middleware
  - [ ] Validation middleware
  - [ ] Authentication middleware
- [ ] Implement proper error handling
  - [ ] Custom error classes
  - [ ] Error logging
  - [ ] Error response formatting
- [ ] Add request validation
  - [ ] Input sanitization
  - [ ] Schema validation
  - [ ] Type checking

#### 3. Documentation
- [ ] API documentation
  - [ ] OpenAPI/Swagger specs
  - [ ] API usage examples
  - [ ] Response schemas
- [ ] Setup instructions
  - [ ] Development setup
  - [ ] Production deployment
  - [ ] Environment configuration

#### 4. Security
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] Authentication/Authorization
  - [ ] JWT implementation
  - [ ] Role-based access
  - [ ] Session management

#### 5. Performance
- [ ] Caching strategy
- [ ] Response optimization
- [ ] Connection pooling
- [ ] Load testing

## Future Considerations

### Scalability
- Containerization with Docker
- Kubernetes deployment
- Microservices architecture
- Load balancing

### Monitoring
- Error tracking
- Performance monitoring
- Usage analytics
- Health checks
