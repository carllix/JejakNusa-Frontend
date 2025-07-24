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
import { useRouter } from 'expo-router';
import { MaterialIcons ,Feather} from '@expo/vector-icons';


const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!displayName || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    
    if (!agreeToTerms) {
      alert('Please agree to Privacy Policy');
      return;
    }

    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)/home');
    }, 2000);
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
  };



  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#4E1F00" />
  
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
                  Start Your First Journey
                </Text>
                <Text 
                  className="text-2xl font-bold text-center text-gray-900 mb-4"
                  style={{ fontFamily: 'Poppins-Bold' }}
                >
                  on JejakNusa!
                </Text>
                <Text 
                  className="text-center text-gray-600 leading-5"
                  style={{ 
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14
                  }}
                >
                  Create account to leave your mark across the Nusantara.
                </Text>
              </View>

              {/* Display Name Input */}
              <View className="mb-4">
                <Text 
                  className="text-gray-700 mb-2 font-medium"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  Display Name
                </Text>
                <View className="flex-row items-center bg-white rounded-lg px-4 py-3 border border-gray-200">
                  <MaterialIcons 
                    name="person" 
                    size={20} 
                    color="#666" 
                    style={{ marginRight: 12 }}
                  />
                  <TextInput
                    className="flex-1 text-base"
                    placeholder="Enter your display name"
                    placeholderTextColor="#999"
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCapitalize="words"
                    style={{ fontFamily: 'Poppins-Regular' }}
                  />
                </View>
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
              <View className="mb-4">
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

              {/* Privacy Policy Checkbox */}
              <View className="flex-row items-start mb-6">
                <TouchableOpacity 
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                  className="mr-3 mt-1"
                >
                  <View 
                    className={`w-4 h-4 border-2 rounded ${
                      agreeToTerms 
                        ? 'bg-amber-800 border-amber-800' 
                        : 'bg-white border-gray-300'
                    } items-center justify-center`}
                  >
                    {agreeToTerms && (
                      <Feather name="check" size={10} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text 
                  className="text-gray-600 text-sm flex-1 leading-5"
                  style={{ fontFamily: 'Poppins-Regular' }}
                >
                  I agree to JejakNusa&apos;s{' '}
                  <Text 
                    className="text-amber-800 font-medium"
                    style={{ fontFamily: 'Poppins-Medium' }}
                  >
                    Privacy Policy.
                  </Text>
                </Text>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity 
                onPress={handleSignUp}
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
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
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

              {/* Social Sign Up Buttons */}
              <View className="flex-row space-x-3 mb-6">
                {/* Google Button */}
                <TouchableOpacity 
                  onPress={handleGoogleSignUp}
                  className="flex-1 bg-white border border-gray-200 rounded-lg py-3 px-4 flex-row items-center justify-center"
                >
                  <Image 
                    source={require('../../assets/images/google-logo.png')}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <Text 
                    className="text-gray-700 font-medium"
                    style={{ fontFamily: 'Poppins-Medium' }}
                  >
                    Google
                  </Text>
                </TouchableOpacity>

            
              </View>

              {/* Sign In Link */}
              <View className="flex-row items-center justify-center">
                <Text 
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: 'Poppins-Regular' }}
                >
                  Have an account? 
                </Text>
                <TouchableOpacity onPress={handleSignIn} className="ml-1">
                  <Text 
                    className="text-amber-800 text-sm font-medium"
                    style={{ fontFamily: 'Poppins-Medium' }}
                  >
                    Sign in here
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

export default RegisterPage;