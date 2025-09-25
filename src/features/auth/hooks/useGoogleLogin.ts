import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useAuthStore } from '@/state/useAuthStore';
import * as SecureStore from 'expo-secure-store';
import { Linking, Platform } from 'react-native';
import { oidcLoginUser } from '@/features/auth/api/authApi';
import { logger } from '@/shared/utils/logger';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userInfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

logger.debug('Platform.OS:: ', Platform.OS);
logger.debug('Constants.expoConfig?.extra?.apiBaseUrl: ', Constants.expoConfig?.extra?.apiBaseUrl);
const clientId =
  Platform.OS === 'ios'
    ? Constants.expoConfig?.extra?.googleIOsClientId
    : Constants.expoConfig?.extra?.googleAndroidClientId;
const googleIOsClientId = Constants.expoConfig?.extra?.googleIOsClientId!;

export const useGoogleLogin = (onSuccess?: () => void) => {
  const setUser = useAuthStore((state) => state.login);
  // In-memory access token (not persisted)
  let accessToken: string | null = null;

  // SecureStore key for refresh token
  const REFRESH_TOKEN_KEY = 'google_refresh_token';

  const localRedirectUri = 'https://auth.expo.io/@chans/tastiex';
  const isStandalone = Constants.executionEnvironment === ExecutionEnvironment.Standalone;
  const redirectUri = AuthSession.makeRedirectUri({
    // path: 'oauthredirect'
    native: 'com.syena.tastiex:/oauthredirect',
  }); // → foodiex:/oauthredirect

  const request = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        access_type: 'offline', // 👈 this is the correct way
      },
      prompt: AuthSession.Prompt.Consent,
      redirectUri,
      responseType: 'code',
      usePKCE: true,
    },
    discovery,
  );

  // Helper to store refresh token securely
  const storeRefreshToken = async (refreshToken: string) => {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  };

  // Helper to get refresh token from secure storage
  const getRefreshToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  };

  // Helper to refresh access token using refresh token
  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    try {
      const response = await fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const data = await response.json();
      if (data.access_token) {
        accessToken = data.access_token;
        // Optionally update refresh token if present
        if (data.refresh_token) await storeRefreshToken(data.refresh_token);
        return data.access_token;
      }
      return null;
    } catch (e) {
      console.error('Failed to refresh access token:', e);
      return null;
    }
  };

  // Main login flow
  const login = async () => {
    const result = await request[2](); // request[2] is the `promptAsync` function
    logger.debug('OAuth result:', result);

    if (result?.type === 'success') {
      const code = result.params.code;
      const codeVerifier = request[0]?.codeVerifier;
      const platform = Platform.OS;
      const loginUrl = `${Constants.expoConfig?.extra?.apiBaseUrl}/customers/code-login`;
      logger.debug(`code: ${code}, codeVerifier: ${codeVerifier}, platform: ${platform}, loginUrl: ${loginUrl}`);

      // Exchange code for tokens directly with Google
      
      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      if (codeVerifier) params.append('code_verifier', codeVerifier);

      const tokenResponse = await fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const tokenData = await tokenResponse.json();
      logger.debug('Google token response:', tokenData);

      accessToken = tokenData.access_token;
      if (tokenData.refresh_token) {
        await storeRefreshToken(tokenData.refresh_token);
      }

      // Optionally, fetch user info from Google
      let userInfo = null;
      if (accessToken) {
        const userInfoResponse = await fetch(discovery.userInfoEndpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        userInfo = await userInfoResponse.json();
        logger.debug('Google user info:', userInfo);
      }

      logger.debug('Exchanging code for app tokens at backend..., accessToken: ', accessToken);

      // Now lets create session in backend
      const loginResponse = await oidcLoginUser({
        email: userInfo.email,
        accessToken: accessToken ?? '',
        platform,
      });
      setUser(loginResponse.user, accessToken!);
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  // Helper to get current access token, refreshing if needed
  const getAccessToken = async (): Promise<string | null> => {
    if (accessToken) return accessToken;
    // Try to refresh if not available
    return await refreshAccessToken();
  };

  return { login, request, getAccessToken, refreshAccessToken };
};
