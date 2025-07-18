import 'dotenv/config';

export default ({ config }) => {
  const apiBaseUrl = process.env.API_URL || 'https://fallback-api.foodiex.com';
  const env = process.env.APP_ENV || 'development';
  const googleClientId = process.env.googleClientId || '7360139281-qbgics3laaps2sapu417fhkfmgcc4bja.apps.googleusercontent.com';
  const googleIOsClientId = process.env.googleIOsClientId || '7360139281-jd3rpql56du2pbfs835p5g05rg9curj6.apps.googleusercontent.com';
  const googleAndroidClientId = process.env.googleAndroidClientId || '7360139281-7ol77clankiqub9h6e3t4ru8d9smdjgl.apps.googleusercontent.com';
  const googleSecret = process.env.googleSecret || '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';

  return {
    ...config,
    name: 'foodiexapp',
    slug: 'foodiexapp',
    owner: 'chans',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    scheme: 'com.syena.foodiexapp',
    ios: {
      bundleIdentifier: 'com.syena.foodiexapp',
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
    },
    web: {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
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
    },
    plugins: [
      "expo-secure-store"
    ]
  };
};

// export default ({ config }) => {
//   return {
//     ...config,
//   };
// };
// projectId: 'f860b5cd-1167-4496-9254-313ddfb71b65',
