# iClass App Management Interface

## Overview

This is an educational app management dashboard built as a full-stack web application. The system allows users to view and manage educational applications with information about installation status, versions, and metadata. The interface is designed following Material Design 3 principles with a focus on clarity, efficiency, and accessibility for tablet/mobile use with Chinese language support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- Single-page application (SPA) using Vite as the build tool
- Client-side routing via Wouter (lightweight React router)
- Component-based architecture with reusable UI components

**UI Design System**: shadcn/ui (Radix UI primitives)
- Chosen for accessibility-first components and customizability
- Material Design 3 inspired theme with neutral base colors
- Supports both light and dark modes through CSS variables
- Custom design tokens for elevation, borders, and interactive states

**State Management**: TanStack Query (React Query)
- Handles server state synchronization and caching
- Configured with infinite stale time for optimistic UI patterns
- Centralized API request handling with error boundaries

**Styling**: Tailwind CSS
- Utility-first CSS framework for rapid UI development
- Custom configuration extends default theme with design system tokens
- Typography system uses Noto Sans SC for Chinese character support
- Responsive spacing primitives (2, 4, 6, 8, 12, 16, 20, 24px units)

**Type Safety**: Full TypeScript coverage
- Shared types between frontend and backend via `/shared` directory
- Path aliases for clean imports (@/, @shared/, @assets/)

### Backend Architecture

**Runtime**: Node.js with Express
- RESTful API design pattern
- Middleware-based request processing
- Custom logging middleware for API request monitoring

**Development Server**: Vite middleware mode
- Hot module replacement (HMR) for rapid development
- Server-side rendering preparation (though currently serving SPA)
- Integrated error overlay for development

**Data Layer**: In-memory storage with database-ready schema
- Current implementation uses MemStorage class for prototyping
- Interface-based design (IStorage) allows easy swap to database
- Drizzle ORM schema defined and ready for PostgreSQL migration

**API Structure**:
- `GET /api/apps` - Retrieve all applications
- `GET /api/apps/:id` - Retrieve single application by ID
- Additional CRUD operations defined in storage interface but not yet exposed

### Database Schema (PostgreSQL via Drizzle ORM)

**Apps Table**:
- `id` (varchar, UUID primary key) - Unique application identifier
- `name` (text, required) - Application display name
- `iconUrl` (text, required) - URL to application icon image
- `version` (text, nullable) - Version string (e.g., "2.102.2")
- `installed` (boolean, default false) - Installation status flag
- `isLatest` (boolean, default false) - Whether version is latest available
- `createdAt` (timestamp, auto-generated) - Record creation timestamp

**Design Rationale**:
- Simple normalized structure suitable for app catalog
- Version stored as text to handle various versioning schemes
- Separate flags for installation and update status enable flexible UI states
- UUID primary key allows distributed ID generation if needed

### External Dependencies

**Database**: PostgreSQL (via Neon serverless)
- Configured but not yet connected in current implementation
- Environment variable `DATABASE_URL` required for activation
- Drizzle Kit configured for schema migrations

**UI Component Library**: Radix UI
- Comprehensive set of accessible, unstyled primitives
- 20+ component primitives (Dialog, Dropdown, Toast, etc.)
- Provides keyboard navigation and ARIA compliance out of the box

**Font Provider**: Google Fonts
- Noto Sans SC for Chinese character display
- Open Sans as complementary Latin font
- Preconnected for performance optimization

**Development Tools**:
- Replit-specific plugins for runtime error handling and dev banners
- ESBuild for production server bundling
- TypeScript compiler for type checking

**Session Management**: connect-pg-simple
- PostgreSQL-backed session store ready for implementation
- Currently included but not actively used (no authentication yet)

**Utilities**:
- date-fns for date formatting and manipulation
- clsx + tailwind-merge for conditional className composition
- zod for runtime schema validation (via drizzle-zod)
- class-variance-authority for component variant management