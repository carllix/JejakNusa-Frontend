import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabItem {
  name: string;
  route: string;
  whiteIcon: any;
  chocolateIcon: any;
  label: string;
}

const tabItems: TabItem[] = [
  {
    name: 'home',
    route: '/(tabs)/home',
    whiteIcon: require('../../assets/images/home-white.png'),
    chocolateIcon: require('../../assets/images/home-chocolate.png'),
    label: 'Home'
  },
  {
    name: 'explore',
    route: '/(tabs)/explore',
    whiteIcon: require('../../assets/images/explore-white.png'), 
    chocolateIcon: require('../../assets/images/explore-chocolate.png'), 
    label: 'Explore'
  },
  {
    name: 'upload',
    route: '/(tabs)/upload',
    whiteIcon: require('../../assets/images/upload-white.png'),
    chocolateIcon: require('../../assets/images/upload-chocolate.png'),
    label: 'Upload'
  },
  {
    name: 'umkm',
    route: '/(tabs)/umkm',
    whiteIcon: require('../../assets/images/umkm-white.png'),
    chocolateIcon: require('../../assets/images/umkm-chocolate.png'),
    label: 'MSMES'
  },
  {
    name: 'profile',
    route: '/(tabs)/profile',
    whiteIcon: require('../../assets/images/profile-white.png'),
    chocolateIcon: require('../../assets/images/profile-chocolate.png'),
    label: 'Profile'
  }
];

interface TabButtonProps {
  item: TabItem;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ item, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      className="flex-1 items-center justify-center py-2"
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isActive ? (
        <LinearGradient
          colors={['#28110A', '#4E1F00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="items-center justify-center px-3 py-2 rounded-lg"
          style={{
            minWidth: 60,
            minHeight: 50
          }}
        >
          <Image
            source={item.whiteIcon}
            className="w-6 h-6 mb-1"
            resizeMode="contain"
          />
          <Text 
            className="text-xs font-medium text-white"
            style={{ 
              fontFamily: 'Poppins-Medium',
              fontSize: 11
            }}
          >
            {item.label}
          </Text>
        </LinearGradient>
      ) : (
        <View
          className="items-center justify-center px-3 py-2 rounded-lg bg-transparent"
          style={{
            minWidth: 60,
            minHeight: 50
          }}
        >
          <Image
            source={item.chocolateIcon}
            className="w-6 h-6 mb-1"
            resizeMode="contain"
          />
          <Text 
            className="text-xs font-medium text-black font-poppins"
            style={{ 
              fontSize: 11
            }}
          >
            {item.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const BottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const getActiveTab = (pathname: string): string => {
    if (pathname.includes('/home')) return 'home';
    if (pathname.includes('/explore')) return 'explore';
    if (pathname.includes('/upload')) return 'upload';
    if (pathname.includes('/umkm')) return 'umkm';
    if (pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab(pathname);

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View 
      className="bg-white border-t border-gray-200 shadow-lg"
      style={{
        paddingBottom: insets.bottom,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center justify-around px-2 py-1">
        {tabItems.map((item) => (
          <TabButton
            key={item.name}
            item={item}
            isActive={activeTab === item.name}
            onPress={() => handleTabPress(item.route)}
          />
        ))}
      </View>
    </View>
  );
};

export default BottomBar;