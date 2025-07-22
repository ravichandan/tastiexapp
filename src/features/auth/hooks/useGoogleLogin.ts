import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useAuthStore } from '@/state/useAuthStore';
import { Linking, Platform } from 'react-native';
import { oidcLoginUser } from '@/features/auth/api/authApi';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userInfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

console.log('Platform.OS:: ', Platform.OS);
console.log('Constants.expoConfig?.extra?.apiBaseUrl: ', Constants.expoConfig?.extra?.apiBaseUrl);
const clientId =
  Platform.OS === 'ios'
    ? Constants.expoConfig?.extra?.googleIOsClientId
    : Constants.expoConfig?.extra?.googleAndroidClientId;
//     Constants.expoConfig?.extra?.googleClientId!;
const googleIOsClientId = Constants.expoConfig?.extra?.googleIOsClientId!;
// const googleAndroidClientId = Constants.expoConfig?.extra?.googleAndroidClientId!;
// const clientSecret = Constants.expoConfig?.extra?.googleSecret!;

export const useGoogleLogin = () => {
  // console.log('HermesInternal' in global); // should be false

  const setUser = useAuthStore((state) => state.login);

  // const result =  // ✅ Works
  const localRedirectUri = 'https://auth.expo.io/@chans/foodiexapp';

  const isStandalone = Constants.executionEnvironment === ExecutionEnvironment.Standalone;

  const redirectUri = AuthSession.makeRedirectUri({
    // path: 'oauthredirect'
    native: 'com.syena.foodiexapp:/oauthredirect',
  }); // → foodiex:/oauthredirect

  const request = AuthSession.useAuthRequest(
    {
      // iosClientId: googleIOsClientId,
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      responseType: 'code',
      usePKCE: true,
    },

    discovery,
  );
  const login = async () => {
    const result = await request[2](); // request[2] is the `promptAsync` function
    console.log('OAuth result:', result);

    if (result?.type === 'success') {
      const code = result.params.code;
      const codeVerifier = request[0]?.codeVerifier;
      const platform = Platform.OS;
      const loginUrl = `${Constants.expoConfig?.extra?.apiBaseUrl}/customers/code-login`;
      console.log(`code: ${code}, codeVerifier: ${codeVerifier}, platform: ${platform}, loginUrl: ${loginUrl}`);

      // 🔐 Send to backend for session/JWT creation
      const loginResponse = await oidcLoginUser({ code, codeVerifier, platform });
      console.log('login Response:: ', loginResponse);

      console.log('setting, customer and token: ', loginResponse.token);
      setUser({ ...loginResponse.user }, loginResponse.token);
    }
  };

  return { login, request };
};
