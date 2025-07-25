import React from 'react';
import { Text,Image,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const insets = useSafeAreaInsets();

  return (
<ImageBackground 
  source={require('../../assets/images/batik.png')}
  resizeMode='cover'
  className="px-6 py-6 items-start "
  style={{ flex: 0 ,paddingTop :insets.top +10}} 
>

    <Text className="text-white text-2xl font-bold pt-2 font-poppins">
      {title}
    </Text>

</ImageBackground>
  );
};

export default Header;