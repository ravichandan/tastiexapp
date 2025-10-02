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



## TODO

### 
- Add retry or refresh-token logic
Add Toast notifications on error?
Add .env support for switching base URL per environment?
🍴 Fetching and caching dishes or reviews
🌍 Deep linking / universal links
🔐 Refresh token flow
🚀 CI/CD with EAS
📦 Publishing to Play Store / App Store

Provide deletion of user profile for the user in the app and website

17,300rs /d contract aud 6199
17,100rs /d contract aud 21d6434 = 359000rs
https://locketinn.com.au/checkout/thank-you/26006/?key=wc_order_VuFX7LI6Io5Jk

https://www.reddit.com/r/Daytrading/comments/198sfxz/what_are_some_actual_legit_trading_teachers_on/?rdt=36331

https://digitalcurrencytraders.beehiiv.com/p/artificial-intelligence-altcoin-season

https://theforextradingcoach.com/one-on-one_private_trading_coaching-online-training/


1000climberpip
forexfury
forexgump
GPS forex


## Why s fails

A. Fake Product Market Fit
1. Raise money from impressive people/angels and think our product is the best coz we got money.
2. Raising a series A preproduct market fit. When this happens instead of continue on product, founder shifts focus on company building
3. Magical thinking. - ignoring obvious facts and not measuring churn or payback revenue.
4. Lack of strong technical talents. Never build a product that is strong. Early breakages in products makes your initial customers to go away

B. Investor == Boss
1. Dont think investor knows everything and treat him like boss. Coz most of the times the investors are not as strong as you think they are
2. Lack to talking to customers is another factor for failure.
3. One sign is you are spending more money than your KPI

C. Co-founder Conflict
1. A weak previous relationship
2. No clear roles & responsibilities
3. Lack of trust
4. Unrealistic expectations in fund raising. Ex dont get carried over with news like some company X raised 10milliion and why can’t we raise it and set unrealistic expectations

D. Ordinary vs extraordinary
1. Are you copying people around you and expecting success. If yes, don’t do it. If you are around a bunch of smart people, think of them as floor and you stand higher than them. That’s the only way for your company to be successful
2. Not having confidence that you can be better than people around you . 
3. Not growing month by month, or churn is too high, Getting satisfied with current status, you have stopped learning about customer or product, blaming something else for lack of success
	How to avoid this happening———
	1. Understand that you WILL get better over time
        2. Read Atomic Habits. 
	3. Get advice from people who are more smarter than you
	4. Set measurable goals and hit them, this will increase your self confidence. Next time set goal thats 15% higher than previous	


VALUE PROP STATEMERNT
=====================
It is a framework that helps us to build proper product.
1. WHO is your customer? Segment, country, place, ?? This gives us MVS - Minimum Viable Segment. Ask them .
2. Define the problem. 
    1. A problem is with 4U’s -Unworkable, Un avoidable, Urgent, Underserved,
    2. 
3. Define the market need
4. FASTER, CHEAPER, BETTER




## Ray white
==========
4.5 (incl gst)
first 4 weeks of mgnt fee waived off
5 inspections (1 before giving to tenants)
can come along with inspections
$100 advertising cost
1 week of letting out fee
p;
