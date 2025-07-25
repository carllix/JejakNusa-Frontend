import React from 'react';
import { Text,Image,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
<ImageBackground 
  source={require('../../assets/images/batik.png')}
  resizeMode='cover'
  className="px-6 py-4 items-center justify-center"
>

    <Text className="text-lol text-xl font-semibold text-center">
      {title}
    </Text>

</ImageBackground>
  );
};

export default Header;