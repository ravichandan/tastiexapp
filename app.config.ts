import 'dotenv/config';
import { Platform } from 'react-native';

export default ({ config }) => {
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

  let googleMapsApiKey;
  if (Platform.OS === 'android') {
    googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY_ANDROID!;
  } else if (Platform.OS === 'ios') {
    googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY_IOS!;
  } else {
    googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY_WEB!;
  }

  return {
    ...config,
    name: 'foodiexapp',
    slug: 'foodiexapp',
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
    scheme: 'com.syena.foodiexapp',
    ios: {
      bundleIdentifier: 'com.syena.foodiexapp',
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "We use your location to show nearby places and dishes.",
      },
    },
    android: {
      package: 'com.syena.foodiexapp',
      intentFilters: [
        {
          action: 'VIEW',
          data: {
            scheme: 'com.syena.foodiexapp',
            path: '/oauthredirect',
          },
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],

    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    extra: {
      apiBaseUrl,
      env,
      eas: {
        projectId: '4951e295-3d7f-410d-af5e-89d1130d5640',
      },
      googleClientId,
      googleIOsClientId,
      googleAndroidClientId,
      googleSecret,
      bucketAccessEndpoint,
      googleMapsApiKey,
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
