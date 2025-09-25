# Tastiex mobile app

## Folder structure

    Tastiex       <- Root folder
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

## How to access/change SHA-1 key
- npx eas credentials
- select a platform, ex: Android
- Select Keystore: Manage everything needed to build your project
- then you have options to create a new , or download existing keystore.

## API keys for maps

### Create new keys

Run the commands in the following format to create new keys

`eas secret:create --name GOOGLE_MAPS_API_KEY_ANDROID --value "key"`
eas secret:create --name GOOGLE_MAPS_API_KEY_IOS --value "key"
eas secret:create --name GOOGLE_MAPS_API_KEY_WEB --value "key"

Then navigate to the app in expo to see the env variables (you can't see the values though)
https://expo.dev/accounts/chans/projects/tastiex/environment-variables

### Edit existing keys
We cannot edit existing keys. We delete old keys and create new ones
1. List keys

    `eas secret:list`

2. Delete a secret

    `eas secret:delete <SECRET_ID>`
    
    Eg: `eas secret:delete --name googleSecret`

3. Recreate using new value

    `eas secret:create --name googleSecret --value "NEW_VALUE"`

Note: Secrets are tied to project scope or account scope. If you created it at the account level, you may need --scope account.

After updating, rebuild your app (eas build) so that the new secret is embedded in your environment.

## Test preview build in local
1. Create a preview build using following commands
`npm run build:preview`
or
`eas build --profile preview --platform android`
2. Then run this in local console to check the logs 
`adb logcat | grep ReactNativeJS`