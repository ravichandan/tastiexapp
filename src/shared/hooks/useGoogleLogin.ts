import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useAuthStore } from '@/state/useAuthStore';
import { Linking, Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userInfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

console.log('Platform.OS:: ', Platform.OS);
const clientId = 
  Platform.OS === 'ios'
    ? Constants.expoConfig?.extra?.googleIOsClientId
    : Constants.expoConfig?.extra?.googleAndroidClientId;
//     Constants.expoConfig?.extra?.googleClientId!;
const googleIOsClientId = Constants.expoConfig?.extra?.googleIOsClientId!;
// const googleAndroidClientId = Constants.expoConfig?.extra?.googleAndroidClientId!;
// const clientSecret = Constants.expoConfig?.extra?.googleSecret!;

export const useGoogleLogin = () => {
  const setUser = useAuthStore((state) => state.login);

  //   const [authRequest, promptAsync, authResult] = AuthSession.useAuthRequest(config, discovery);

  // const result =  // ✅ Works
  const localRedirectUri = 'https://auth.expo.io/@chans/foodiexapp';

  const isStandalone = Constants.executionEnvironment === ExecutionEnvironment.Standalone;

  const redirectUri = 
  // !isStandalone
    // ? 
    AuthSession.makeRedirectUri({ 
      // path: 'oauthredirect'
          native: 'com.syena.foodiexapp:/oauthredirect',
      }) // → foodiex:/oauthredirect
    // : AuthSession.makeRedirectUri({ scheme: 'foodiex' }) // → foodiex:/oauthredirect
    // : localRedirectUri
    ;  

  // const redirectUri = AuthSession.makeRedirectUri({
  //       // preferLocalhost: true, // for Expo Go; disable in productionr
  //       scheme: 'foodiex', // matches app.config.ts

  //       // native: 'com.foodiex:/oauthredirect',
  //     });
  const request = Google.useAuthRequest(
    {
      // iosClientId: googleIOsClientId,
      clientId,
      scopes: ['openid', 'profile', 'email'],
      // redirectUri,
      responseType: 'code',
    },

    // discovery,
  );
// console.log('AuthSession.makeRedirectUri():: ', AuthSession.makeRedirectUri());
  const login = async () => {
    console.log('debug:: clientId: ', clientId);
    console.log('debug:: redirectUri: ', redirectUri);
    console.log('debug:: request[0]: ', request[0]);
    console.log('debug:: request[1]: ', request[1]);
    const result = await request[2](); // request[2] is the `promptAsync` function
    console.log('OAuth result:', result);

    if (result?.type === 'success') {
      const res = await fetch(discovery.userInfoEndpoint, {
        headers: { Authorization: `Bearer ${result.authentication?.accessToken}` },
      });
      const profile = await res.json();

      // 🔐 Send to backend for session/JWT creation
      const loginRes = await fetch(`${Constants.expoConfig?.extra?.apiBaseUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: result.authentication?.idToken }),
      });

      const data = await loginRes.json();
      setUser({ ...data.user }, data.token);
    }
  };

  return { login, request };
};
