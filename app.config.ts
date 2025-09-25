import 'dotenv/config';

export default ({ config }: {config: any}) => {
  const currentVersionCode = config.android?.versionCode || 1;
  const envFile =
  process.env.APP_ENV === 'production'
    ? require('dotenv').config({ path: '.env.production' })
    : require('dotenv').config({ path: '.env' });

  const apiBaseUrl = process.env.API_URL!;
  const env = process.env.APP_ENV || 'development';
  const googleClientId = process.env.googleClientId!;
  const googleIOsClientId = process.env.googleIOsClientId!;
  const googleAndroidClientId = process.env.googleAndroidClientId!;
  const googleSecret = process.env.googleSecret!;
  const bucketAccessEndpoint = process.env.bucketAccessEndpoint || "https://img.foodiex.com.au";

  // let googleMapsApiKey;
  // if (Platform.OS === 'android') {
    // googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY_ANDROID!;
  // } else if (Platform.OS === 'ios') {
  //   googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY_IOS!;
  // } else {
  //   googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY_WEB!;
  // }

  return {
    ...config,
    name: 'tastiex',
    slug: 'tastiex',
    owner: 'chans',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    scheme: 'com.syena.tastiex',
    ios: {
      bundleIdentifier: 'com.syena.tastiex',
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "We use your location to show nearby places and dishes.",
        ITSAppUsesNonExemptEncryption: false
      },
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS,
      },
    },
    android: {
      package: 'com.syena.tastiex',
      intentFilters: [
        {
          action: 'VIEW',
          data: {
            scheme: 'com.syena.tastiex',
            path: '/oauthredirect',
          },
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY_ANDROID,
        },
      },

    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY_WEB,
        },
      },
    },
    extra: {
      apiBaseUrl,
      env,
      eas: {
        projectId: '81f5acf9-3055-425a-819c-7c29e1ebb4ba',
      },
      googleClientId: process.env.googleClientId,
      googleIOsClientId: process.env.googleIOsClientId,
      googleAndroidClientId: process.env.googleAndroidClientId,
      googleSecret,
      bucketAccessEndpoint,
      GOOGLE_MAPS_API_KEY_IOS: process.env.GOOGLE_MAPS_API_KEY_IOS,
      GOOGLE_MAPS_API_KEY_ANDROID: process.env.GOOGLE_MAPS_API_KEY_ANDROID,
      GOOGLE_MAPS_API_KEY_WEB: process.env.GOOGLE_MAPS_API_KEY_WEB,
    },
    plugins: ['expo-secure-store'],
  };
};

// export default ({ config }) => {
//   return {
//     ...config,
//   };
// };
// projectId: 'f860b5cd-1167-4496-9254-313ddfb71b65',
