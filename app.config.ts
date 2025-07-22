import 'dotenv/config';

export default ({ config }) => {
  const apiBaseUrl = process.env.API_URL!;
  const env = process.env.APP_ENV || 'development';
  const googleClientId = process.env.googleClientId!;
  const googleIOsClientId = process.env.googleIOsClientId!;
  const googleAndroidClientId = process.env.googleAndroidClientId!;
  const googleSecret = process.env.googleSecret!;

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
    },
    android: {
      package: 'com.syena.foodiexapp',
      versionCode: 4,
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
