
# FlairForge (Retired & Absorbed)

> [!IMPORTANT]
> **FlairForge has been retired and absorbed into [OmniPost](https://github.com/neuralliquid/omnipost).**  
> All creative flyer and promotional authoring capabilities, template schemas, Mill rendering adapters, and multi-channel asset generation now live natively within the OmniPost Creative Studio.
> 
> - **Absorbed Into**: [`neuralliquid/omnipost`](https://github.com/neuralliquid/omnipost)
> - **ADR / Migration Plan**: [`docs/plans/FLAIRFORGE_TO_OMNIPOST_MIGRATION.md`](https://github.com/neuralliquid/omnipost/blob/main/docs/plans/FLAIRFORGE_TO_OMNIPOST_MIGRATION.md)
> - **Recovery Release**: Immutable snapshot pinned to tag `recovery-20260827` (snapshot commit `9a582727`).
> - **Rollback Runbook**: [`docs/flairforge-deployment-runbook.md`](docs/flairforge-deployment-runbook.md)

---

# FlairForge - Cognitive Mesh (Archived Baseline)

AI-powered flyer generation platform leveraging Cognitive Mesh capabilities for intelligent content enhancement and professional template management.

## Table of Contents

- [Overview](#overview)
- [Mesh Integration](#mesh-integration)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

## Overview

### What it does

FlairForge transforms your content into professional flyers using AI-powered enhancement and intelligent template management. The platform combines React frontend with serverless backend functions to deliver high-quality marketing materials.

### Why it matters

FlairForge addresses the challenge of creating professional marketing materials without design expertise. By leveraging Cognitive Mesh capabilities, it provides intelligent content enhancement, automated layout optimization, and scalable template management.

### Key capabilities

- **AI-Powered Enhancement**: Intelligent content improvement using Reasoning layer
- **Template Management**: Professional flyer templates with dynamic content binding
- **Real-time Preview**: Instant visual feedback with Metacognitive optimization
- **Multi-format Export**: PNG, PDF, and JPG export capabilities
- **Batch Processing**: Generate multiple flyers with consistent branding

## Mesh Integration

### Mesh Layer

This component operates in the **Business** layer of the Cognitive Mesh, providing user-facing flyer generation capabilities.

### Dependencies

| Layer         | Component           | Purpose                                |
| ------------- | ------------------- | -------------------------------------- |
| Foundation    | Data Storage        | Template and user data management      |
| Reasoning     | AI Enhancement      | Content analysis and improvement       |
| Metacognitive | Layout Optimization | Adaptive design and performance tuning |
| Agency        | Security & Auth     | User permissions and data protection   |

### Interfaces

| Interface Type | Endpoint/Method              | Description                |
| -------------- | ---------------------------- | -------------------------- |
| REST API       | `/api/v1/generate-flyer`     | Flyer generation endpoint  |
| REST API       | `/api/v1/templates`          | Template management        |
| Event Stream   | `flyer.generated`            | Flyer completion events    |
| Mesh Protocol  | `mesh://business/flairforge` | Business layer integration |

## Features

### Core Features

- ✅ **AI Enhancement**: Intelligent content improvement and optimization
- ✅ **Template Library**: Professional flyer templates for various industries
- ✅ **Real-time Preview**: Instant visual feedback during creation
- ✅ **Multi-format Export**: PNG, PDF, and JPG download options
- ✅ **Responsive Design**: Works seamlessly across all devices

### Advanced Features

- 🚀 **Batch Generation**: Create multiple flyers from spreadsheet data
- 🚀 **Custom Templates**: Upload and use your own design templates
- 🚀 **Brand Kit Integration**: Save and reuse brand colors and fonts
- 🚀 **API Access**: Integrate flyer generation into your applications

### Roadmap

- 🔄 **Collaboration Features**: Team sharing and approval workflows
- 📋 **Advanced AI Models**: Enhanced content generation and optimization
- 🔄 **Mobile App**: Native mobile application for on-the-go creation

## Quick Start

### Prerequisites

- Node.js 18+
- Modern web browser
- Netlify account (for deployment)

### 30-Second Setup

```bash
# Clone the repository
git clone https://github.com/flairforge/flairforge
cd flairforge

# Install dependencies
npm install

# Configure environment
cp frontend/env.example frontend/.env.local
# Edit .env.local with your settings

# Start the service
npm run dev
```

### Verify Installation

```bash
# Check health
curl http://localhost:3000/health

# Test mesh connectivity
npm run test:mesh
```

## Installation

### Development Environment

```bash
# Clone and setup
git clone https://github.com/flairforge/flairforge
cd flairforge
npm install

# Setup development dependencies
npm run setup:dev
```

### Production Deployment

```bash
# Using Netlify (recommended)
# Connect your repository to Netlify
# Set build settings:
# - Base directory: frontend
# - Build command: npm run build
# - Publish directory: dist

# Using Docker (alternative)
docker pull flairforge/flairforge:latest
docker run -d --name flairforge \
  -p 3000:3000 \
  -e MESH_URL=mesh://your-mesh-instance \
  flairforge/flairforge:latest
```

### Package Manager

```bash
# NPM
npm install @flairforge/core

# Yarn
yarn add @flairforge/core
```

## Usage

### Basic Example

```javascript
import { FlairForgeAPI } from '@flairforge/core';

const api = new FlairForgeAPI({
  baseUrl: 'https://flairforge.netlify.app/.netlify/functions/api'
});

// Generate a flyer
const flyer = await api.generateFlyer('cheesy-pig', {
  title: 'Grand Opening Sale!',
  description: 'Join us for amazing deals',
  contact: '555-0123'
});

console.log('Flyer URL:', flyer.flyer_url);
```

### Advanced Configuration

```javascript
const api = new FlairForgeAPI({
  baseUrl: 'https://flairforge.netlify.app/.netlify/functions/api',
  options: {
    format: 'pdf',
    quality: 90,
    ai_enhancement: true
  },
  performance: {
    timeout: 10000,
    retries: 3
  }
});
```

### Integration Patterns

```javascript
// Batch processing
const flyers = await api.batchGenerate('cheesy-pig', [
  { title: 'Sale 1', description: 'First sale' },
  { title: 'Sale 2', description: 'Second sale' }
]);

// Template management
const templates = await api.getTemplates();
const template = await api.getTemplate('cheesy-pig');
```

## Configuration

### Environment Variables

| Variable                     | Description             | Default                                                 | Required |
| ---------------------------- | ----------------------- | ------------------------------------------------------- | -------- |
| `VITE_API_BASE_URL`          | API base URL            | `https://flairforge.netlify.app/.netlify/functions/api` | Yes      |
| `VITE_ENABLE_AI_ENHANCEMENT` | Enable AI features      | `true`                                                  | No       |
| `VITE_ENABLE_PREVIEW`        | Enable preview features | `true`                                                  | No       |
| `VITE_GOOGLE_ANALYTICS_ID`   | Analytics tracking ID   | -                                                       | No       |

### Configuration File

Create a `config.json` file:

```json
{
  "api": {
    "baseUrl": "https://flairforge.netlify.app/.netlify/functions/api",
    "timeout": 10000
  },
  "features": {
    "ai_enhancement": true,
    "preview": true,
    "batch_processing": true
  },
  "templates": {
    "default": "cheesy-pig",
    "categories": ["promotional", "business", "creative"]
  }
}
```

## API Reference

### Core Methods

#### `api.generateFlyer(template, data, options)`

Generates a flyer using the specified template and data.

**Parameters:**

- `template` (String): Template identifier
- `data` (Object): Flyer content data
- `options` (Object): Generation options

**Returns:** `Promise<FlyerResponse>`

#### `api.getTemplates(category)`

Retrieves available templates.

**Parameters:**

- `category` (String, optional): Filter by category

**Returns:** `Promise<TemplateList>`

### REST API Endpoints

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/health`                | Service health check     |
| POST   | `/api/v1/generate-flyer` | Generate single flyer    |
| GET    | `/api/v1/templates`      | List available templates |
| POST   | `/api/v1/batch-generate` | Generate multiple flyers |

For complete API documentation, see [API Reference](./docs/flairforge-api-reference.md).

## Development

### Setup Development Environment

```bash
# Install development dependencies
npm run setup:dev

# Start development server
npm run dev

# Run in watch mode
npm run dev:watch
```

### Project Structure

``` text
flairforge/
├── frontend/              # React frontend
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   ├── utils/        # Utilities
│   │   └── assets/       # Static assets
│   ├── netlify.toml      # Netlify configuration
│   └── package.json
├── backend/               # Express.js backend
│   ├── src/              # Backend source
│   ├── netlify/          # Netlify Functions
│   ├── templates/        # EJS templates
│   └── package.json
├── docs/                  # Documentation
├── tests/                 # Test files
└── package.json          # Workspace configuration
```

### Code Standards

- **Language**: TypeScript/JavaScript
- **Style**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Documentation**: JSDoc

### Pre-commit Hooks

```bash
# Setup pre-commit hooks
npm run setup:hooks

# Manual lint and format
npm run lint
npm run format
```

## Testing

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Mesh connectivity tests
npm run test:mesh

# Coverage report
npm run test:coverage
```

### Test Structure

``` text
tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
├── e2e/               # End-to-end tests
├── mesh/              # Mesh-specific tests
└── fixtures/          # Test data
```

### Writing Tests

```javascript
describe('FlairForgeAPI', () => {
  test('should generate flyer correctly', async () => {
    const api = new FlairForgeAPI(testConfig);
    const result = await api.generateFlyer('test-template', testData);
    
    expect(result.success).toBe(true);
    expect(result.flyer_url).toBeDefined();
  });
});
```

## Deployment

### Netlify Deployment

```toml
# frontend/netlify.toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Monitoring

- **Health Checks**: [`/health`](http://localhost:3001/api/health)
- **Metrics**: Netlify Analytics integration
- **Logs**: Netlify Function logs
- **Error Tracking**: Sentry integration

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

### Issues and Discussions

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/flairforge/flairforge/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/flairforge/flairforge/discussions)
- 📋 **Roadmap**: [Project Board](https://github.com/flairforge/flairforge/projects)

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check build logs
npm run build

# Verify dependencies
npm install

# Check TypeScript errors
npm run type-check
```

#### API Function Errors

```bash
# Test function locally
netlify dev

# Check function logs
netlify functions:logs

# Verify environment variables
netlify env:list
```

#### Performance Issues

```bash
# Check bundle size
npm run build -- --analyze

# Monitor performance
npm run monitor:performance
```

### Getting Help

- 📖 **Documentation**: [Full Documentation](./docs/)
- 💬 **Community**: [Discord](https://discord.gg/flairforge)
- 📧 **Support**: [support@flairforge.com](mailto:support@flairforge.com)
- 🎯 **Stack Overflow**: Tag `flairforge`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Community

- **Discord**: [Join our community](https://discord.gg/flairforge)
- **GitHub Discussions**: [Ask questions](https://github.com/flairforge/flairforge/discussions)
- **Stack Overflow**: Use tag `flairforge`

### Commercial Support

For enterprise support, training, and consulting:

- 📧 Email: [enterprise@flairforge.com](mailto:enterprise@flairforge.com)
- 🌐 Website: [flairforge.com/enterprise](https://flairforge.com/enterprise)

---

## **Built with ❤️ by the FlairForge team**

_Last updated: 2025-07-13
