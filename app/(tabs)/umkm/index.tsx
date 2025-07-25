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
import Dropdown from '@/app/components/dropdown';


interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  seller: string;
  location: string;
  category: string;
}

// Mock data produk
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Bamboo Angklung Craft',
    price: 'Rp 150.000,00',
    description: 'Handcrafted traditional Angklung made from bamboo',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    seller: 'Saung Angklung Udjo',
    location: 'Bandung, Jawa Barat',
    category: 'Handmade'
  },
  {
    id: '2',
    title: 'Batik Traditional Cloth',
    price: 'Rp 95.000,00',
    description: 'Traditional batik cloth from Central Java',
    image: 'https://images.unsplash.com/photo-1594736797933-d0301ba2fe65?w=400',
    seller: 'Batik Nusantara',
    location: 'Yogyakarta, DIY',
    category: 'Premium'
  },
  {
    id: '3',
    title: 'Kerajinan Kayu Jati',
    price: 'Rp 275.000,00',
    description: 'Handcrafted teak wood decoration',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    seller: 'Ukir Jepara',
    location: 'Jepara, Jawa Tengah',
    category: 'Handmade'
  }
];

const Header: React.FC<{ title: string }> = ({ title }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <LinearGradient
      colors={['#28110A', '#4E1F00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingTop: insets.top + 10,
        paddingHorizontal: 24,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text 
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '600',
          textAlign: 'center',
          fontFamily: 'Poppins-SemiBold'
        }}
      >
        {title}
      </Text>
    </LinearGradient>
  );
};

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  return (
    <View className="px-4 py-3 bg-gray-50">
      <View className="flex-row items-center bg-white rounded-lg px-3 py-2 shadow-sm">
        <Image 
          source={require('../../../assets/images/search.png')}
          className="w-5 h-5 mr-3"
          style={{ tintColor: '#999' }}
        />
        <TextInput
          className="flex-1 text-base"
          placeholder="Discover MSME products"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
};


const typeOptions = [
  { label: 'All types', value: 'all' },
  { label: 'Handmade', value: 'handmade' },
  { label: 'Premium', value: 'premium' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Modern', value: 'modern' }
];

const regionOptions = [
  { label: 'All regions', value: 'all' },
  { label: 'Jawa Barat', value: 'jabar' },
  { label: 'Jawa Tengah', value: 'jateng' },
  { label: 'Jawa Timur', value: 'jatim' },
  { label: 'DIY Yogyakarta', value: 'diy' },
  { label: 'Bali', value: 'bali' },
  { label: 'Sumatera', value: 'sumatra' }
];

const FilterButtons: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  return (
    <View className="flex-row px-4 py-2 space-x-6">
      <Dropdown
        options={typeOptions}
        selectedValue={selectedType}
        onSelect={setSelectedType}
        placeholder="Select Type"
        style={{ flex: 1 }}
      />
      <View className='w-2'></View>
      
      <Dropdown
        options={regionOptions}
        selectedValue={selectedRegion}
        onSelect={setSelectedRegion}
        placeholder="Select Region"
        style={{ flex: 1 }}
      />
    </View>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <View className="bg-white mx-4 my-2 rounded-lg shadow-sm overflow-hidden">
      <View className="relative">
        <Image 
          source={{ uri: product.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-3 left-3 bg-amber-800 px-2 py-1 rounded">
          <Text className="text-white text-xs font-medium">{product.category}</Text>
        </View>
      </View>
      
      <View className="p-4">
        <Text 
          className="text-xl font-semibold text-gray-900 mb-1 font-poppins"
        >
          {product.price}
        </Text>
        
        <Text className="text-lg font-medium text-gray-800 mb-2">
          {product.title}
        </Text>
        
        <Text className="text-gray-600 text-sm mb-3">
          {product.description}
        </Text>
        
        <View className="flex-row items-center mb-2">
          <Image 
            source={require('../../../assets/images/address.png')}
            className="w-4 h-4 mr-2"
            style={{ tintColor: '#666' }}
          />
          <Text className="text-gray-600 text-sm">{product.seller}</Text>
        </View>
        
        <View className="flex-row items-center mb-4">
          <Image 
            source={require('../../../assets/images/location-production.png')}
            className="w-4 h-4 mr-2"
            style={{ tintColor: '#666' }}
          />
          <Text className="text-gray-600 text-sm">{product.location}</Text>
        </View>
        
        <TouchableOpacity 
          className="bg-amber-800 py-3 rounded-lg"
          onPress={() => {/* Handle buy now */}}
        >
          <Text 
            className="text-white text-center font-semibold"
            style={{ fontFamily: 'Poppins-SemiBold' }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MSMESPage: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      
      <Header title="MSMES" />
      
      <ScrollView className="flex-1">
        <SearchBar />
        <FilterButtons />
        
        <View className="py-2">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MSMESPage;