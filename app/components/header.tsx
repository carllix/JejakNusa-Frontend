import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <LinearGradient
      colors={['#28110A', '#4E1F00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="px-6 py-4 items-center justify-center"
    >
      <Text 
        className="text-white text-xl font-semibold text-center"
      >
        {title}
      </Text>
    </LinearGradient>
  );
};

export default Header;