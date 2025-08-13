// src/features/auth/components/LoginForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { useGoogleLogin } from '@/features/auth/hooks/useGoogleLogin';
import OAuthButton from '@/shared/components/OAuthButton';
import { useNavigation } from '@react-navigation/native';

export default function LoginForm() {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const { login, loading, error } = useLogin(navigateBack);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const googleLogin = useGoogleLogin(navigateBack);

  const onSubmit = () => {
    login({ email, password });
  };

  return (
    <View className="p-4">

      <OAuthButton
        provider="google"
        onPress={googleLogin.login}
        loading={loading}
        disabled={!googleLogin.request} 
      />
      <OAuthButton
        provider="facebook"
        onPress={() => {}}
        loading={loading}
        disabled={true} // Placeholder for Facebook login
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border p-2 mb-2"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border p-2 mb-2"
        secureTextEntry
      />

      {error && <SmoothText className="text-red-500 mb-2">{error}</SmoothText>}
      {loading ? <ActivityIndicator /> : <Button title="Login" onPress={onSubmit} />}
    </View>
  );
}
