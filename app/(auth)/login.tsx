import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
// Import icons
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      await login(email, password);
      // Navigation is handled in the AuthContext
    } catch (error) {
      // console.error('Login error:', error);
      Alert.alert(
        'Login Failed', 
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Coming Soon', 'Google Sign In will be available soon!');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password recovery feature will be available soon!');
  };

  const handleSignUp = () => {
    router.push('./register');
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#4E1F00" />
      
      <ImageBackground
        source={require('../../assets/images/batik-bg.png')}
        className="flex-1"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['#4E1F00', '#28110A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          className="flex-1"
          style={{ opacity: 0.9 }}
        />
      </ImageBackground>
      
      {/* Content Container */}
      <KeyboardAvoidingView 
        className="absolute inset-0 flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-6 my-8">
            {/* Login Card */}
            <View 
              className="bg-brown-50 rounded-2xl p-6 shadow-lg"
              style={{
                backgroundColor: '#f5f1eb'
              }}
            >
              {/* Welcome Text */}
              <View className="mb-8">
                <Text 
                  className="text-2xl font-bold text-center text-gray-900 mb-2"
                  style={{ fontFamily: 'Poppins-Bold' }}
                >
                  Welcome Back to
                </Text>
                <Text 
                  className="text-2xl font-bold text-center text-gray-900 mb-4"
                  style={{ fontFamily: 'Poppins-Bold' }}
                >
                  JejakNusa!
                </Text>
                <Text 
                  className="text-center text-gray-600 leading-5"
                  style={{ 
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14
                  }}
                >
                  Let your journey continue, explore and share the stories of Indonesia&apos;s rich culture.
                </Text>
              </View>

              {/* Email Input */}
              <View className="mb-4">
                <Text 
                  className="text-gray-700 mb-2 font-medium"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  Email
                </Text>
                <View className="flex-row items-center bg-white rounded-lg px-4 py-3 border border-gray-200">
                  <MaterialIcons 
                    name="email" 
                    size={20} 
                    color="#666" 
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    className="flex-1 text-base"
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                    style={{ fontFamily: 'Poppins-Regular' }}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-2">
                <Text 
                  className="text-gray-700 mb-2 font-medium"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  Password
                </Text>
                <View className="flex-row items-center bg-white rounded-lg px-4 py-3 border border-gray-200">
                  <Feather 
                    name="lock" 
                    size={20} 
                    color="#666" 
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    className="flex-1 text-base"
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                    style={{ fontFamily: 'Poppins-Regular' }}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                    disabled={isLoading}
                  >
                    <Feather 
                      name={showPassword ? "eye" : "eye-off"} 
                      size={20} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity 
                onPress={handleForgotPassword}
                className="self-end mb-6"
                disabled={isLoading}
              >
                <Text 
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: 'Poppins-Regular' }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity 
                onPress={handleSignIn}
                disabled={isLoading}
                className="mb-6"
                style={{
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                <LinearGradient
                  colors={['#28110A', '#4E1F00']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-lg"
                >
                  <Text 
                    className="text-white text-center font-semibold text-base p-2"
                    style={{ fontFamily: 'Poppins-SemiBold' }}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text 
                  className="mx-4 text-gray-500 text-sm"
                  style={{ fontFamily: 'Poppins-Regular' }}
                >
                  or continue with
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Google Sign In Button */}
              <TouchableOpacity 
                onPress={handleGoogleSignIn}
                className="bg-white border border-gray-200 rounded-lg py-3 px-4 flex-row items-center justify-center mb-6"
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                <Image 
                  source={require('../../assets/images/google-logo.png')}
                  style={{ width: 20, height: 20, marginRight: 12 }}
                />
                <Text 
                  className="text-gray-700 font-medium"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  Google
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row items-center justify-center">
                <Text 
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: 'Poppins-Regular' }}
                >
                  New here? 
                </Text>
                <TouchableOpacity 
                  onPress={handleSignUp} 
                  className="ml-1"
                  disabled={isLoading}
                >
                  <Text 
                    className="text-amber-800 text-sm font-medium"
                    style={{ fontFamily: 'Poppins-Medium' }}
                  >
                    Sign up now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;