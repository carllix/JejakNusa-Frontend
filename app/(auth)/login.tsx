import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
// Import icons
import { MaterialIcons,Feather } from '@expo/vector-icons';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Implementasi login logic
    console.log('Sign in with:', { email, password });
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
    // Implementasi Google sign in
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
    // Navigate to forgot password screen
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
    // Navigate to sign up screen
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#4E1F00" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#4E1F00', '#28110A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        className="flex-1"
        // style={{
        //   transform: [{ rotate: '195.03deg' }]
        // }}
      />
      
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
                    style={{ fontFamily: 'Poppins-Regular' }}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
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
              >
                <LinearGradient
                  colors={['#28110A', '#4E1F00']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-lg"
                >
                  <Text 
                    className="text-white text-center font-semibold text-base"
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
                <TouchableOpacity onPress={handleSignUp} className="ml-1">
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