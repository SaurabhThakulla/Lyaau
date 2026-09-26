import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface LoginScreenProps {
  onLoginSuccess?: (data: { phone: string; token?: string }) => void;
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
}: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories = [
    { label: 'Groceries', icon: 'basket-outline' as const },
    { label: 'Clothes', icon: 'shirt-outline' as const },
    { label: 'Herbs & Ayurvedic', icon: 'leaf-outline' as const },
    { label: 'Cosmetics', icon: 'sparkles-outline' as const },
    { label: 'Electronics', icon: 'phone-portrait-outline' as const },
    { label: 'Household', icon: 'home-outline' as const },
  ];

  const validateInputs = () => {
    const cleanedPhone = phoneNumber.trim().replace(/\D/g, '');
    if (!cleanedPhone) {
      setErrorMessage('Please enter your mobile phone number.');
      return false;
    }

    if (cleanedPhone.length !== 10) {
      setErrorMessage('Nepal mobile numbers must be exactly 10 digits.');
      return false;
    }

    if (!['98', '97', '96'].includes(cleanedPhone.substring(0, 2))) {
      setErrorMessage('Please enter a valid Nepal mobile number (starts with 98 or 97).');
      return false;
    }

    if (!password) {
      setErrorMessage('Please enter your account password.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Simulate client authentication handling
      // Can be wired to real backend API (e.g. POST /api/auth/login)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const cleanedPhone = phoneNumber.trim().replace(/\D/g, '');
      if (onLoginSuccess) {
        onLoginSuccess({ phone: `+977${cleanedPhone}` });
      } else {
        Alert.alert(
          'Login Successful',
          `Welcome back to Lyaau Tikapur! Logged in as +977 ${cleanedPhone}.`,
          [{ text: 'Continue' }]
        );
      }
    } catch {
      setErrorMessage('Unable to log in. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    } else {
      Alert.alert(
        'Forgot Password',
        'Password reset code will be sent via SMS to your Nepal phone number (+977).',
        [{ text: 'OK' }]
      );
    }
  };

  const handleRegister = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      Alert.alert(
        'Register on Lyaau',
        'Sign up as a Customer or register your Shop in Tikapur as a Vendor.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-emerald-950">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Brand Banner */}
          <View className="px-6 pt-6 pb-6">
            {/* Location & Status Tag */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-700/60">
                <Ionicons name="location-sharp" size={14} color="#34d399" />
                <Text className="text-emerald-300 text-xs font-semibold ml-1.5">
                  Tikapur, Kailali
                </Text>
              </View>
              <View className="flex-row items-center bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-400/40">
                <Ionicons name="storefront" size={13} color="#fbbf24" />
                <Text className="text-amber-300 text-xs font-medium ml-1.5">
                  Multi-Vendor Hub
                </Text>
              </View>
            </View>

            {/* Brand Logo & Name */}
            <View className="items-center my-2">
              <View className="w-16 h-16 rounded-2xl bg-emerald-500 items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 border border-emerald-300/30">
                <Ionicons name="bag-handle" size={32} color="#ffffff" />
              </View>
              <Text className="text-3xl font-extrabold text-white tracking-wide">
                Lyaau <Text className="text-emerald-400">ल्याऊ</Text>
              </Text>
              <Text className="text-emerald-200/80 text-sm text-center mt-1">
                Your Local Tikapur Marketplace for Everything
              </Text>
            </View>

            {/* Marketplace categories mini badges */}
            <View className="flex-row flex-wrap justify-center gap-1.5 mt-3">
              {categories.map((cat, idx) => (
                <View
                  key={idx}
                  className="flex-row items-center bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-800/60"
                >
                  <Ionicons name={cat.icon} size={11} color="#6ee7b7" />
                  <Text className="text-emerald-200 text-[11px] ml-1 font-medium">
                    {cat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Form Card */}
          <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-10 shadow-2xl">
            <View className="mb-6">
              <Text className="text-2xl font-bold text-slate-900">Welcome Back</Text>
              <Text className="text-slate-500 text-sm mt-1">
                Log in to order locally or manage your Tikapur shop
              </Text>
            </View>

            {/* Error Message banner */}
            {errorMessage ? (
              <View className="flex-row items-center bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl mb-5">
                <Ionicons name="alert-circle" size={18} color="#e11d48" />
                <Text className="text-rose-700 text-xs font-medium ml-2 flex-1">
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* Phone Number Input */}
            <View className="mb-4">
              <Text className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2">
                Mobile Number
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:border-emerald-600 focus:bg-white">
                <View className="flex-row items-center pr-3 border-r border-slate-300">
                  <Text className="text-base mr-1">🇳🇵</Text>
                  <Text className="text-slate-800 font-bold text-sm">+977</Text>
                </View>
                <TextInput
                  placeholder="98XXXXXXXX"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={(val) => {
                    setPhoneNumber(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="flex-1 text-slate-900 text-base ml-3 font-medium p-0"
                  autoComplete="tel"
                />
                {phoneNumber.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setPhoneNumber('')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                )}
              </View>
              <Text className="text-[11px] text-slate-400 mt-1 ml-1">
                Enter your 10-digit NTC / Ncell / SmartCell number
              </Text>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2">
                Password
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:border-emerald-600 focus:bg-white">
                <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="flex-1 text-slate-900 text-base ml-2.5 font-medium p-0"
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row items-center justify-between mt-1 mb-6">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
                activeOpacity={0.7}
              >
                <View
                  className={`w-5 h-5 rounded-md border items-center justify-center ${
                    rememberMe
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#ffffff" />}
                </View>
                <Text className="text-slate-600 text-xs font-medium ml-2">Remember Me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                <Text className="text-emerald-700 text-xs font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
              className={`w-full py-4 rounded-xl items-center justify-center shadow-lg ${
                isLoading
                  ? 'bg-emerald-400'
                  : 'bg-emerald-600 active:bg-emerald-700 shadow-emerald-600/30'
              }`}
            >
              {isLoading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text className="text-white font-bold text-base ml-2">
                    Signing In...
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center">
                  <Text className="text-white font-bold text-base mr-2">
                    Log In to Lyaau
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>

            {/* Vendor / Customer Sign Up Links */}
            <View className="mt-8 pt-6 border-t border-slate-100 items-center">
              <View className="flex-row items-center">
                <Text className="text-slate-500 text-sm">New to Lyaau Tikapur? </Text>
                <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                  <Text className="text-emerald-700 font-bold text-sm">Create Account</Text>
                </TouchableOpacity>
              </View>

              {/* Vendor badge prompt */}
              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.7}
                className="mt-4 flex-row items-center bg-amber-50 border border-amber-200/80 px-4 py-2.5 rounded-xl w-full justify-center"
              >
                <Ionicons name="storefront-outline" size={16} color="#d97706" />
                <Text className="text-amber-900 font-semibold text-xs ml-2">
                  Own a shop in Tikapur? <Text className="text-amber-700 underline">Register as Vendor</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
