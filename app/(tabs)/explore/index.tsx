import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Header from '@/app/components/header';

interface Region {
  id: string;
  name: string;
  description: string;
  image: string;
  contributors: number;
  contents: number;
  culturalHighlights: string[];
}

// Mock data regions
const mockRegions: Region[] = [
  {
    id: '1',
    name: 'Bali',
    description: 'A land rich in Hindu wisdom and traditions.',
    image: '../../../assets/images/default-explore-1.png',
    contributors: 38,
    contents: 156,
    culturalHighlights: ['Kecak Dance', 'Tanah Lot Temple', 'Galungan Ceremony', 'Ogoh-Ogoh']
  },
  {
    id: '2',
    name: 'Sumatera Utara',
    description: 'A region rooted in strong customs and ancestral values.',
    image: '../../../assets/images/default-explore-2.png',
    contributors: 24,
    contents: 112,
    culturalHighlights: ['Tor-tor Dance', 'Batak Architecture', 'Gondang Music', 'Ulos Weaving']
  }
];

// const Header: React.FC<{ title: string }> = ({ title }) => {
//   const insets = useSafeAreaInsets();
  
//   return (
//     <LinearGradient
//       colors={['#28110A', '#4E1F00']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}
//       style={{
//         paddingTop: insets.top + 10,
//         paddingHorizontal: 24,
//         paddingBottom: 16,
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <Text 
//         style={{
//           color: 'white',
//           fontSize: 20,
//           fontWeight: '600',
//           textAlign: 'center',
//           fontFamily: 'Poppins-SemiBold'
//         }}
//       >
//         {title}
//       </Text>
//     </LinearGradient>
//   );
// };

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  return (
    <View className="px-4 py-3 bg-transparent">
      <View className="flex-row items-center bg-white rounded-lg px-3 py-2 shadow-sm">
        <MaterialIcons 
          name="search"
          size={20}
          color="#999"
          style={{ marginRight: 12 }}
        />
        <TextInput
          className="flex-1 text-base"
          placeholder="Explore regions or cultures"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          style={{ fontFamily: 'Poppins-Regular' }}
        />
      </View>
    </View>
  );
};

const RegionCard: React.FC<{ region: Region }> = ({ region }) => {
  return (
    <View className="bg-white mx-4 my-2 rounded-lg shadow-sm overflow-hidden">
      {/* Region Image */}
      <View className="relative">
        <Image 
          source={region.id === '1' 
            ? require('../../../assets/images/default-explore-1.png')
            : require('../../../assets/images/default-explore-2.png')
          }
          className="w-full  "
          resizeMode="cover"
        />
        {/* Overlay dengan gradient */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0"
        />
        {/* Region Name & Description */}
        <View className="absolute bottom-4 left-4 right-4">
          <Text 
            className="text-white text-2xl font-bold mb-1"
            style={{ fontFamily: 'Poppins-Bold' }}
          >
            {region.name}
          </Text>
          <Text 
            className="text-white text-sm opacity-90"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            {region.description}
          </Text>
        </View>
      </View>
      
      <View className="p-4">
        {/* Stats */}
        <View className="flex-row items-center mb-4 space-x-6">
          <View className="flex-row items-center">
            <MaterialIcons name="person" size={16} color="#666" />
            <Text 
              className="text-gray-600 text-sm ml-1 font-poppins"
            >
              {region.contributors} contributors
            </Text>
          </View>
          
          <View className="flex-row items-center ml-2">
            <FontAwesome5 name="camera" size={14} color="#666" />
            <Text 
              className="text-gray-600 text-sm ml-1 font-poppins"
            >
              {region.contents} contents
            </Text>
          </View>
        </View>

        {/* Cultural Highlights */}
        <View className="mb-4">
          <Text 
            className="text-gray-900 font-semibold mb-3"
            style={{ fontFamily: 'Poppins-SemiBold' }}
          >
            Cultural Highlights:
          </Text>
          
          <View className="flex-row flex-wrap">
            {region.culturalHighlights.map((highlight, index) => (
              <View
                key={index}
                className="mr-2 mb-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: '#74502D' }}
              >
                <Text 
                  className="text-white text-xs font-medium"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  {highlight}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => {
            console.log(`Exploring ${region.name}`);
            // Handle explore region navigation
          }}
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            marginTop: 4
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#28110A', '#4E1F00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text 
            className='text-center font-medium font-poppins text-white '

            >
              Explore
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExplorePage: React.FC = () => {
  return (
    <View className="flex-1 bg-yellow-low">
      <StatusBar barStyle="light-content" />
      
      <Header title="Explore" />
      
      <ScrollView className="flex-1">
        <SearchBar />
        
        <View className="py-2">
          {mockRegions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExplorePage;