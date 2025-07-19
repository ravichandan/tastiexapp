// src/features/auth/components/LoginForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { useGoogleLogin } from '@/shared/hooks/useGoogleLogin';

export default function LoginForm() {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const googleLogin = useGoogleLogin();

  const onSubmit = () => {
    login({ email, password });
  };

  return (
    <View className="p-4">
      <Button
        title="Sign in with Google"
        onPress={googleLogin.login}
        disabled={!googleLogin.request} // disable button if login request is not ready
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

      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      {loading ? <ActivityIndicator /> : <Button title="Login" onPress={onSubmit} />}
    </View>
  );
}
