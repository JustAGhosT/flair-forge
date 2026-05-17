# GitHub Copilot Instructions for FlairForge

This document provides guidance for GitHub Copilot when assisting with the FlairForge project.

## Project Overview

FlairForge is an AI-powered flyer generation platform that transforms content into professional flyers using intelligent enhancement and template management. It's built as a monorepo with a React frontend and Node.js/Express backend, deployed on Netlify.

### Architecture
- **Frontend**: React 18 with TypeScript, Vite build system, deployed on Netlify
- **Backend**: Node.js/Express API, deployed as Netlify serverless functions
- **Deployment**: Netlify with automatic builds and deployments
- **Monorepo**: Uses pnpm workspaces with separate frontend and backend packages

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Testing**: Vitest, Playwright (E2E), React Testing Library
- **Styling**: Standard CSS with modern features

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with serverless-http
- **Template Engine**: EJS for server-side rendering
- **Browser Automation**: Puppeteer for flyer generation
- **Testing**: Vitest, Supertest, Dredd (contract testing)

## Development Setup

### Prerequisites
- Node.js 18 or higher
- pnpm 10 or higher

### Getting Started
```bash
# Install dependencies for all workspaces
pnpm install

# Start development servers for frontend and backend
pnpm run dev

# Start only frontend (port 3000)
pnpm run dev:frontend

# Start only backend (port 8888)
pnpm run dev:backend
```

### Project Structure
```
flairforge/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand state stores
│   │   ├── utils/        # Utility functions
│   │   ├── assets/       # Static assets
│   │   ├── ssr/          # Server-side rendering
│   │   └── types/        # TypeScript type definitions
│   ├── netlify.toml      # Netlify configuration
│   └── package.json
├── backend/               # Express.js backend
│   ├── src/              # Backend source code
│   ├── netlify/          # Netlify Functions
│   ├── templates/        # EJS templates
│   └── data/             # Static data files
├── tests/                # Shared test utilities and E2E tests
│   ├── __scripts__/      # Test runner scripts
│   └── __config__/       # Test configurations
├── docs/                 # Documentation
└── package.json          # Root workspace configuration
```

## Code Style and Conventions

### General Guidelines
- Follow existing patterns and conventions in the codebase
- Use TypeScript for frontend code (.tsx, .ts)
- Use ESM (ES modules) for all JavaScript/TypeScript code
- Prefer functional programming patterns
- Keep functions small and focused on a single responsibility

### TypeScript/JavaScript
- Use `const` for all variables unless reassignment is needed
- Avoid `var` declarations
- Use object shorthand notation
- Prefer template literals over string concatenation
- Avoid `any` type; use specific types or `unknown` when necessary
- Prefix unused parameters with underscore: `_unusedParam`

### React Components
- Use functional components with hooks
- No need to import React (using JSX runtime)
- Prefer arrow function components
- Use TypeScript interfaces for component props
- Keep components small and reusable
- Place hooks at the top of the component

### File Naming
- React components: PascalCase (e.g., `FlyerGenerator.tsx`)
- Utilities/helpers: camelCase (e.g., `templateManager.ts`)
- Test files: Same name as source with `.test.ts` or `.test.tsx` extension

### Code Organization
- Group related functionality together
- Export named exports, not default exports for utilities
- Keep imports organized: external dependencies first, then internal imports

## Testing

### Running Tests

```bash
# Run all tests (frontend + backend)
pnpm test

# Run unit tests only
pnpm run test:unit

# Run frontend tests
pnpm run test:frontend

# Run backend tests
pnpm run test:backend

# Run E2E tests
pnpm run test:e2e

# Run with coverage
pnpm run test:coverage
```

### Test Guidelines
- Write tests for all new features
- Maintain or improve existing test coverage
- Use Vitest for unit tests
- Use Playwright for E2E tests
- Use React Testing Library for component tests
- Mock external dependencies appropriately
- Keep tests focused and isolated

### Test File Locations
- Frontend unit tests: Colocated with source files or in `frontend/src/__tests__/`
- Backend unit tests: In `backend/src/__tests__/`
- E2E tests: In `tests/e2e/`
- Integration tests: In `backend/tests/integration/`

## Building and Deployment

### Build Commands
```bash
# Build both frontend and backend
pnpm run build

# Build frontend only
pnpm run build:frontend

# Build backend only (Netlify Functions)
pnpm run build:backend
```

### Netlify Deployment
- **Base Directory**: `frontend`
- **Build Command**: `pnpm run build`
- **Publish Directory**: `dist`
- **Functions Directory**: `backend/netlify/functions`
- Backend API is deployed as serverless functions at `/.netlify/functions/api`

## Linting and Formatting

### ESLint Configuration
- Frontend uses TypeScript ESLint with React plugin
- Backend uses ESLint for JavaScript
- Configuration extends recommended rules for each environment

### Running Linters
```bash
# Lint all code
pnpm run lint

# Lint and auto-fix issues
pnpm run lint:fix

# Type check TypeScript
pnpm run type-check
```

### Linting Rules
- No console.log (use console.warn or console.error)
- Prefer const over let
- No var declarations
- Avoid explicit any types
- React components must use hooks correctly

## Environment Variables

### Frontend Variables (prefix with VITE_)
- `VITE_API_BASE_URL`: API base URL (default: Netlify functions endpoint)
- `VITE_ENABLE_AI_ENHANCEMENT`: Enable AI features
- `VITE_ENABLE_PREVIEW`: Enable preview features
- `VITE_GOOGLE_ANALYTICS_ID`: Analytics tracking ID

### Backend Variables
- Set in Netlify dashboard or `.env` for local development
- No prefix needed for backend-only variables

## API Documentation

### REST API Endpoints
- `GET /health` - Service health check
- `POST /api/v1/generate-flyer` - Generate a single flyer
- `GET /api/v1/templates` - List available templates
- `POST /api/v1/batch-generate` - Generate multiple flyers

### API Reference
See `docs/flairforge-api-reference.md` for complete API documentation.

## Common Patterns

### State Management with Zustand
```typescript
import create from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
```

### Data Fetching with React Query
```typescript
import { useQuery } from '@tanstack/react-query';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => fetch('/api/v1/templates').then(res => res.json())
  });
}
```

## Security Considerations
- Sanitize all user inputs
- Use Helmet.js for security headers (already configured)
- Validate API requests
- Use HTTPS for all API calls
- Never commit secrets or API keys

## Performance Best Practices
- Lazy load routes and large components
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper caching strategies
- Monitor bundle size

## Documentation
- Keep README.md up to date
- Document all public APIs
- Add JSDoc comments for complex functions
- Update TESTING.md for new test patterns

## Troubleshooting Common Issues

### Build Failures
- Ensure Node.js version is 18 or higher
- Clear node_modules and reinstall: `pnpm run clean && pnpm install`
- Check TypeScript errors: `pnpm run type-check`

### Test Failures
- Run tests individually to isolate issues
- Check for missing dependencies
- Ensure test data is properly set up

### Development Server Issues
- Check if ports 3000 (frontend) or 8888 (backend) are already in use
- Clear Vite cache: `rm -rf frontend/node_modules/.vite`

## Contributing Guidelines
1. Create feature branches from main
2. Follow code style guidelines
3. Write tests for new functionality
4. Ensure all tests pass before submitting PR
5. Update documentation as needed
6. Keep commits focused and descriptive

## Additional Resources
- [Main README](../README.md)
- [Testing Documentation](../TESTING.md)
- [API Reference](../docs/flairforge-api-reference.md)
- [Netlify Deployment Guide](../NETLIFY_DEPLOYMENT.md)
