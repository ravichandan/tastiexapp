# Foodiex mobile app

## Folder structure

    Foodiexapp       <- Root folder
    │
    ├── src                    <- source folder containing app component, used to run the widgets in local setup
    │   │
    │   ├── /app               # Entry files and providers (navigation, theming, etc.)
    │   │   ├── App.tsx        # Root component
    │   │   └── providers.tsx  # Combined context providers
    │
    │   ├── /features          # Feature-first structure (modularization 💪)
    │   │   ├── /reviews
    │   │   │   ├── components/
    │   │   │   ├── hooks/
    │   │   │   ├── api/
    │   │   │   └── screens/
    │   │   ├── /restaurants
    │   │   ├── /dishes
    │   │   └── /auth
    │
    │   ├── /shared            # Reusable non-feature specific things
    │   │   ├── /components    # Generic components (e.g., Button, Avatar)
    │   │   ├── /hooks         # Generic hooks (useDebounce, useIsMounted)
    │   │   ├── /utils         # Helpers (formatDate, imageResizer)
    │   │   ├── /constants     # App constants (colors, endpoints)
    │   │   └── /types         # Shared TypeScript types/interfaces
    │
    │   ├── /navigation        # Stack/tab navigation configs
    │   ├── /services          # External API clients (axios, firebase, etc.)
    │   ├── /state             # Global state (Zustand, Redux, Jotai)
    │   └── /assets            # Fonts, images, videos
    │
    ├── babel.config.js
    ├── tsconfig.json
    ├── app.config.ts
    └── package.json

## AUTH Flow working plan

Expo app ──► Google (auth) ──► auth code + codeVerifier ──► Your API
Your API ──► Google (token endpoint) ──► id_token + access_token
Your API verifies id_token, creates user, issues own JWT
Your API ⇦── Mobile app (JWT + user data)
