# PROJECT GUIDELINES

## Overview
This is a modern React-based landing page application with an admin panel for form management. The project features a Samsung-inspired design system with dynamic form building capabilities and responsive design.

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/ui base components (buttons, inputs, cards, etc.)
│   ├── admin/           # Admin-specific components
│   │   ├── FormBuilder.tsx      # Dynamic form creation interface
│   │   ├── LoginForm.tsx        # Admin authentication form
│   │   └── SubmissionsManager.tsx # View and manage form submissions
│   └── LandingForm.tsx  # Main contact/lead form on landing page
├── pages/
│   ├── Index.tsx        # Landing page with hero section and form
│   ├── Admin.tsx        # Admin dashboard for form management
│   └── NotFound.tsx     # 404 error page
├── hooks/
│   ├── use-mobile.tsx   # Hook for mobile device detection
│   └── use-toast.ts     # Toast notification management
├── lib/
│   └── utils.ts         # Utility functions (cn for className merging)
├── App.tsx              # Main app component with routing
├── main.tsx             # Application entry point
├── index.css            # Global styles and design system tokens
└── vite-env.d.ts        # TypeScript environment definitions
```

### Key Configuration Files
- `tailwind.config.ts` - Tailwind CSS configuration with custom design tokens
- `vite.config.ts` - Vite build tool configuration
- `components.json` - Shadcn/ui component configuration
- `tsconfig.json` - TypeScript configuration

## Technology Stack

### Core Framework
- **React 18.3.1** - Main UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Build tool and development server

### Routing & State Management
- **React Router DOM 6.30.1** - Client-side routing
- **TanStack React Query 5.83.0** - Server state management and caching
- **React Hook Form 7.61.1** - Form state management with validation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Unstyled, accessible UI components built on Radix UI
- **Radix UI** - Low-level UI primitives for accessibility
- **Lucide React** - Icon library
- **Class Variance Authority (CVA)** - Component variant management

### Validation & Utilities
- **Zod 3.25.76** - Schema validation
- **Date-fns 3.6.0** - Date manipulation utilities
- **Clsx & Tailwind Merge** - Conditional className utilities

### Charts & Data Visualization
- **Recharts 2.15.4** - Chart library for data visualization

### Notifications & UI Enhancements
- **Sonner** - Toast notifications
- **Next Themes** - Theme management (dark/light mode)

## Design System

### Color Palette
The design system uses a Samsung-inspired grayscale palette with blue accents:

```css
/* Primary Colors */
--primary: 217 91% 60%        /* Blue accent */
--primary-glow: 217 91% 70%   /* Lighter blue */

/* Neutral Palette */
--background: 0 0% 100%       /* Pure white */
--foreground: 240 10% 3.9%    /* Near black */
--muted: 240 4.8% 95.9%       /* Light gray */
--surface: 240 4.8% 95.9%     /* Card backgrounds */

/* Status Colors */
--success: 142 76% 36%        /* Green */
--destructive: 0 84% 60%      /* Red */
--warning: 38 92% 50%         /* Orange */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading Scale**: text-5xl to text-7xl for hero sections
- **Body Text**: text-base with responsive scaling
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold)

### Component Variants
The design system includes predefined component variants:

```css
/* Button Variants */
.btn-hero     /* Primary CTA buttons with gradients */
.btn-ghost    /* Subtle secondary buttons */
.btn-dark     /* Dark theme buttons */

/* Form Components */
.form-input   /* Consistent input styling */
.form-select  /* Select dropdown styling */

/* Card Variants */
.card-modern  /* Standard card styling */
.card-dark    /* Dark theme cards */
```

### Animations
- **Fade In**: `animate-fade-in` - Smooth entrance effects
- **Scale In**: `animate-scale-in` - Emphasis animations
- **Slide Up**: `animate-slide-up` - Content reveal animations
- **Hover Effects**: `hover-lift` - Interactive element feedback

## Components Overview

### UI Components (Shadcn/ui)
Located in `src/components/ui/`, these are the foundation components:

- **Button** - Primary interactive element with multiple variants
- **Input** - Text input fields with consistent styling
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Boolean input with custom styling
- **Card** - Container component for grouped content
- **Label** - Form field labels with proper accessibility
- **Toast** - Notification system for user feedback
- **Dialog** - Modal overlays for important interactions
- **Form** - Form validation and state management wrapper

### Custom Components

#### LandingForm (`src/components/LandingForm.tsx`)
Dynamic form component that renders different field types:
- Text, email, phone inputs
- Textarea for longer content
- Select dropdowns with options
- File upload functionality
- Checkbox for consent/agreements
- Submission handling with loading states
- Success state with confirmation message

#### Admin Components (`src/components/admin/`)
- **FormBuilder** - Interface for creating and editing forms
- **LoginForm** - Authentication form for admin access
- **SubmissionsManager** - View and manage form submissions

## Pages and Routes

### Landing Page (`/` - Index.tsx)
**Purpose**: Main marketing page with lead generation form

**Sections**:
- **Header**: Fixed navigation with branding
- **Hero Section**: 
  - Large heading with gradient text effect
  - Descriptive paragraph
  - Call-to-action button with scroll behavior
  - Visual element with smartphone icon
- **Form Section**:
  - Section heading and description
  - Dynamic form component (LandingForm)
- **Footer**: Links and copyright information

### Admin Dashboard (`/admin` - Admin.tsx)
**Purpose**: Administrative interface for form management

**Features**:
- Form builder interface
- Submission management
- Authentication system
- Administrative controls

### 404 Page (`/*` - NotFound.tsx)
**Purpose**: Handle undefined routes with user-friendly error page

## Data Flow

### State Management
- **Local State**: React `useState` for component-level state
- **Form State**: React Hook Form for complex form handling
- **Server State**: TanStack React Query for API data management
- **UI State**: Toast notifications for user feedback

### Form Data Flow
1. User interacts with form fields
2. Field data stored in local state object
3. On submission, data processed and validated
4. Success/error feedback via toast notifications
5. Form reset or success state display

### Mock Data
Currently uses mock data for demonstration:
- Form configuration in `LandingForm.tsx`
- Simulated API calls with setTimeout
- Static form fields with Russian labels

## Best Practices & Conventions

### File Naming
- **Components**: PascalCase (e.g., `LandingForm.tsx`)
- **Pages**: PascalCase (e.g., `Index.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `use-mobile.tsx`)
- **Utilities**: kebab-case (e.g., `utils.ts`)

### Component Structure
```typescript
// Import order: React, third-party, internal
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Interface definitions
interface ComponentProps {
  prop: string;
}

// Component implementation with proper typing
export const ComponentName: React.FC<ComponentProps> = ({ prop }) => {
  // Hooks at the top
  const [state, setState] = useState();
  const { toast } = useToast();

  // Event handlers
  const handleEvent = () => {
    // Implementation
  };

  // Render
  return (
    // JSX implementation
  );
};
```

### Styling Conventions
- **Use semantic design tokens**: Prefer `text-foreground` over `text-black`
- **Component variants**: Use CVA for component variations
- **Responsive design**: Mobile-first approach with `sm:`, `md:`, `lg:` prefixes
- **Consistent spacing**: Use standard Tailwind spacing scale (4, 6, 8, 12, 16, etc.)

### TypeScript Guidelines
- **Strict typing**: All props and state properly typed
- **Interface definitions**: Clear interfaces for component props
- **Generic types**: Use generics for reusable components
- **Avoid any**: Prefer unknown or proper typing

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: Include aria-label for interactive elements
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Focus management**: Proper focus handling in modals and forms

### Performance
- **Code splitting**: Components loaded on demand where appropriate
- **Memoization**: Use React.memo for expensive components
- **Bundle optimization**: Tree-shaking enabled through ES modules
- **Image optimization**: Lazy loading for images

## Development Guidelines

### Adding New Components
1. Create component in appropriate directory
2. Use TypeScript with proper interfaces
3. Follow naming conventions
4. Include proper accessibility attributes
5. Add to component exports if shared

### Styling New Components
1. Use existing design tokens from `index.css`
2. Create variants in Tailwind config if needed
3. Follow responsive design patterns
4. Test in both light and dark modes

### Form Development
1. Use React Hook Form for complex forms
2. Implement proper validation with Zod
3. Provide user feedback via toasts
4. Handle loading and error states
5. Include accessibility labels

This documentation serves as a comprehensive guide for understanding and extending the project. For rebuilding with a different stack, pay special attention to the design system tokens and component variants to maintain visual consistency.