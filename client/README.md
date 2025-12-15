# Mari Franz Espelita - Portfolio Website

A modern, interactive portfolio website built with React and Vite, featuring an AI-powered chatbot assistant powered by Flowise AI.

## 🌟 Features

-   **Modern Design**: Sleek, dark-themed portfolio with smooth animations and transitions
-   **Interactive UI**: Framer Motion animations, responsive hamburger menu, and engaging components
-   **AI Chatbot**: Real-time AI assistant integrated via Flowise with Server-Sent Events (SSE) streaming
-   **Responsive Design**: Mobile-first approach with tailored layouts for all screen sizes
-   **Performance Optimized**: Built with Vite and rolldown for fast development and production builds
-   **Beautiful Typography**: Custom typography components with decrypt and typewriter effects
-   **Session Persistence**: Chat history maintained across page refreshes

## 🛠️ Tech Stack

### Frontend

-   **React 19** - UI library
-   **Vite (rolldown-vite)** - Fast build tool and dev server
-   **Tailwind CSS v4** - Utility-first styling with @tailwindcss/vite plugin
-   **Framer Motion** - Advanced animations and motion library
-   **React Router DOM v7** - Client-side routing
-   **Lucide React** - Beautiful icon library

### UI & Styling

-   **Class Variance Authority (CVA)** - Component variant management
-   **Tailwind Merge** - Intelligent class name merging
-   **tw-animate-css** - Additional animation utilities
-   **Base UI Components** - Accessible UI primitives

### AI Integration

-   **Flowise AI** - Cloud-based AI chatbot platform
-   **Server-Sent Events (SSE)** - Real-time streaming responses
-   **Fetch API** - Direct API communication with ReadableStream parsing

### Development

-   **ESLint** - Code quality and standards
-   **Vite** - Lightning-fast build tooling

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   └── images/        # Image assets
│   ├── components/
│   │   ├── chatbot/       # AI chatbot widget
│   │   │   ├── ChatWidget.jsx      # Main chat interface
│   │   │   └── ChatWindow.jsx      # Chat window container
│   │   ├── ui/            # Reusable UI components
│   │   │   └── button.jsx          # Button component
│   │   ├── DecryptText.jsx         # Animated text decrypt effect
│   │   ├── OrganicImage.jsx        # Image with organic shape
│   │   └── TypewriterRoles.jsx     # Typewriter animation
│   ├── hooks/
│   │   └── useChatStream.js        # Custom hook for Flowise streaming
│   ├── lib/
│   │   └── utils.js               # Utility functions (cn helper)
│   ├── sections/
│   │   ├── Hero.jsx               # Hero section with intro
│   │   ├── Hero.css               # Hero-specific styles
│   │   ├── About.jsx              # About section
│   │   ├── Projects.jsx           # Projects showcase
│   │   └── Contact.jsx            # Contact section
│   ├── services/
│   │   └── api.js                 # API configuration (Flowise)
│   ├── data/
│   │   └── projects.js            # Project data (expandable)
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles and utilities
│   └── app.jsx                    # App component
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── eslint.config.js              # ESLint rules
├── jsconfig.json                 # JavaScript config
├── components.json               # Component aliases
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd portfolio/client
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the `client` directory:

    ```env
    VITE_FLOWISE_API_URL=https://cloud.flowiseai.com
    VITE_FLOWISE_CHATFLOW_ID=your_chatflow_id
    VITE_FLOWISE_API_KEY=your_api_key
    ```

4. **Start development server**

    ```bash
    npm run dev
    ```

    The site will be available at `http://localhost:5173`

## 📝 Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint on all files
```

## 🤖 AI Chatbot Integration

### How It Works

The portfolio features an intelligent AI assistant powered by Flowise that can answer questions about the portfolio owner's skills, experience, and projects.

**Key Technical Details:**

-   **API Endpoint**: `POST https://cloud.flowiseai.com/api/v1/prediction/{chatflowId}`
-   **Streaming**: Uses Server-Sent Events (SSE) for real-time text streaming
-   **Session Management**: Conversation context persisted via localStorage sessionId
-   **Authentication**: Bearer token via API key in request headers

### Request Format

```javascript
{
  "question": "What are your main skills?",
  "streaming": true,
  "overrideConfig": {
    "sessionId": "unique-session-id"
  }
}
```

### Response Format

Server-Sent Events with structured event types:

-   `event: start` - Stream initialization
-   `event: token` - Individual text chunks (main streaming data)
-   `event: metadata` - Additional metadata
-   `event: end` - Stream completion

### Custom Hook: `useChatStream`

Located in `src/hooks/useChatStream.js`, this hook manages:

-   Message state and history
-   Real-time SSE streaming parsing
-   Session ID persistence
-   Error handling and loading states
-   AbortController for stream cancellation

## 🎨 Design System

### Color Scheme

The portfolio uses a sophisticated dark theme defined in `src/index.css`:

-   **Background**: `#121113`
-   **Foreground**: `#c1c1c1`
-   **Primary Accent**: `#e78a53` (warm orange)
-   **Secondary**: `#5f8787` (muted teal)
-   **Muted**: `#888888`

### Typography

-   **Sans**: Inter
-   **Serif**: Artifika
-   **Mono**: Fira Code

### Components

#### Hero Section

-   Animated "Wabi Sabi" logo with character-level transforms on hover
-   Decrypt animation for name reveal
-   Typewriter effect for role display
-   Responsive layout with sidebar image

#### Chat Widget

-   Floating chat button in bottom-right corner
-   Full-screen chat window with message history
-   Suggested starter questions
-   Real-time message streaming
-   Loading indicator with bounce animation

#### Navigation

-   Desktop: Inline navigation links
-   Mobile: Full-screen hamburger menu with staggered animations
-   Scroll-based menu visibility toggle

## 🎬 Animations & Effects

-   **Framer Motion**: Smooth page transitions, hover effects, and motion variants
-   **Decrypt Text**: Character-by-character reveal animation
-   **Typewriter**: Sequential role display with cursor effect
-   **Organic Shapes**: SVG-based organic image containers
-   **Scrollbar**: Custom styled scrollbar matching theme colors

## 🔒 Security Considerations

**⚠️ Important**: The Flowise API key is included in the frontend bundle and visible to users. This is acceptable for a public portfolio chatbot when:

-   Rate limiting is configured at the Flowise chatflow level
-   The chatbot is meant for public interaction
-   No sensitive information is processed

For production applications handling sensitive data, implement backend proxy endpoints.

## 📱 Responsive Breakpoints

-   **Mobile**: < 640px (sm)
-   **Tablet**: 640px - 1024px (md, lg)
-   **Desktop**: > 1024px (xl, 2xl)

## 🛠️ Development Workflow

### Path Aliasing

The project uses path aliasing for cleaner imports:

```javascript
// Instead of:
import Hero from "../../sections/Hero"

// Use:
import Hero from "@/sections/Hero"
```

Configure in `jsconfig.json` - alias `@` maps to `./src/`

### Component Development

Components follow React best practices:

-   Functional components with hooks
-   Proper prop typing in comments
-   Reusable component composition
-   Motion variants for consistent animations

### Styling

-   Use Tailwind CSS utility classes for layouts
-   Framer Motion for complex animations
-   CSS modules for component-specific styles when needed
-   Custom utilities defined in `index.css`

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` directory.

### Environment Variables for Production

Update `.env` with production Flowise configuration before building.

## 📚 Key Files Explained

-   **App.jsx**: Main application component, handles routing and navigation state
-   **useChatStream.js**: Custom React hook managing Flowise AI chat logic
-   **api.js**: API configuration and constants for Flowise endpoints
-   **index.css**: Global styles, color scheme, animations, and scrollbar styling

## 🐛 Known Issues & Improvements

1. **Projects Data**: `src/data/projects.js` is currently empty - add your project data here
2. **Contact Form**: Contact section needs backend integration for form submission
3. **Accessibility**: Consider adding ARIA labels and keyboard navigation enhancements

## 🔗 Useful Links

-   [React Documentation](https://react.dev)
-   [Vite Documentation](https://vitejs.dev)
-   [Tailwind CSS Documentation](https://tailwindcss.com)
-   [Framer Motion Documentation](https://www.framer.com/motion)
-   [Flowise AI Documentation](https://docs.flowiseai.com)

## 📄 License

This portfolio is a personal project. Feel free to use it as a template for your own portfolio.

---

**Made with ❤️ by Mari Franz Espelita**
