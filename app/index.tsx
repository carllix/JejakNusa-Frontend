import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9EB" translucent={false} />
      
      <LinearGradient
        colors={['#FFF9EB', '#D5C6B7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: width,
          height: height,
        }}
      />
      
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: height,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{
              width: 180,
              height: 180,
              resizeMode: 'contain'
            }}
          />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;