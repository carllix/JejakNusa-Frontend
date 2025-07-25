import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Dropdown from '@/app/components/dropdown';
import { router } from 'expo-router';
import Header from '@/app/components/header';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

// Interface untuk product berdasarkan API response
interface Seller {
  t_users_id: number;
  email: string;
  display_name: string;
  profile_pict_url: string | null;
}

interface Item {
  t_item_id: number;
  item_name: string;
  item_type: string;
  price: number;
  province: string;
  production_place: string;
  address: string;
  seller_id: number;
  item_image_url: string;
  seller: Seller;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Item[];
}

// Mapping untuk item images
const getItemImage = (imageName: string) => {
  const imageMap: Record<string, any> = {
    'angklung.png': require('../../../assets/images/items/angklung.png'),
    'ulos.png': require('../../../assets/images/items/ulos.png'),
    'tenun_sikka.png': require('../../../assets/images/items/tenun_sikka.png'),
    'gerabah_kasongan.png': require('../../../assets/images/items/gerabah_kasongan.png'),
    'ukiran_jepara.png': require('../../../assets/images/items/ukiran_jepara.png'),
  };
  
  // Fallback ke default image jika tidak ada mapping
  return imageMap[imageName] || require('../../../assets/images/items/angklung.png');
};

// Format currency ke Rupiah
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const SearchBar: React.FC<{ 
  value: string; 
  onChangeText: (text: string) => void;
  onSearch: () => void;
}> = ({ value, onChangeText, onSearch }) => {
  return (
    <View className="px-4 py-3 bg-transparent">
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
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          style={{ fontFamily: 'Poppins-Regular' }}
        />
        {value.length > 0 && (
          <TouchableOpacity 
            onPress={() => onChangeText('')}
            className="ml-2"
          >
            <Text className="text-gray-400 text-lg">✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Options berdasarkan data real dari database
const typeOptions = [
  { label: 'All types', value: 'all' },
  { label: 'Musik', value: 'Musik' },
  { label: 'Kain Tradisional', value: 'Kain Tradisional' },
  { label: 'Keramik', value: 'Keramik' },
  { label: 'Furnitur', value: 'Furnitur' },
];

// 38 Provinsi Indonesia lengkap
const provinceOptions = [
  { label: 'All regions', value: 'all' },
  // Sumatera
  { label: 'Aceh', value: 'Aceh' },
  { label: 'Sumatera Utara', value: 'Sumatera Utara' },
  { label: 'Sumatera Barat', value: 'Sumatera Barat' },
  { label: 'Riau', value: 'Riau' },
  { label: 'Kepulauan Riau', value: 'Kepulauan Riau' },
  { label: 'Jambi', value: 'Jambi' },
  { label: 'Sumatera Selatan', value: 'Sumatera Selatan' },
  { label: 'Bangka Belitung', value: 'Bangka Belitung' },
  { label: 'Bengkulu', value: 'Bengkulu' },
  { label: 'Lampung', value: 'Lampung' },
  // Jawa & Bali
  { label: 'DKI Jakarta', value: 'DKI Jakarta' },
  { label: 'Jawa Barat', value: 'Jawa Barat' },
  { label: 'Jawa Tengah', value: 'Jawa Tengah' },
  { label: 'DI Yogyakarta', value: 'DI Yogyakarta' },
  { label: 'Jawa Timur', value: 'Jawa Timur' },
  { label: 'Banten', value: 'Banten' },
  { label: 'Bali', value: 'Bali' },
  // Nusa Tenggara
  { label: 'Nusa Tenggara Barat', value: 'Nusa Tenggara Barat' },
  { label: 'Nusa Tenggara Timur', value: 'Nusa Tenggara Timur' },
  // Kalimantan
  { label: 'Kalimantan Barat', value: 'Kalimantan Barat' },
  { label: 'Kalimantan Tengah', value: 'Kalimantan Tengah' },
  { label: 'Kalimantan Selatan', value: 'Kalimantan Selatan' },
  { label: 'Kalimantan Timur', value: 'Kalimantan Timur' },
  { label: 'Kalimantan Utara', value: 'Kalimantan Utara' },
  // Sulawesi
  { label: 'Sulawesi Utara', value: 'Sulawesi Utara' },
  { label: 'Sulawesi Tengah', value: 'Sulawesi Tengah' },
  { label: 'Sulawesi Selatan', value: 'Sulawesi Selatan' },
  { label: 'Sulawesi Tenggara', value: 'Sulawesi Tenggara' },
  { label: 'Gorontalo', value: 'Gorontalo' },
  { label: 'Sulawesi Barat', value: 'Sulawesi Barat' },
  // Maluku
  { label: 'Maluku', value: 'Maluku' },
  { label: 'Maluku Utara', value: 'Maluku Utara' },
  // Papua
  { label: 'Papua Barat', value: 'Papua Barat' },
  { label: 'Papua', value: 'Papua' },
  { label: 'Papua Tengah', value: 'Papua Tengah' },
  { label: 'Papua Pegunungan', value: 'Papua Pegunungan' },
  { label: 'Papua Selatan', value: 'Papua Selatan' },
  { label: 'Papua Barat Daya', value: 'Papua Barat Daya' },
];

const FilterButtons: React.FC<{
  selectedType: string;
  selectedRegion: string;
  onTypeChange: (type: string) => void;
  onRegionChange: (region: string) => void;
}> = ({ selectedType, selectedRegion, onTypeChange, onRegionChange }) => {
  return (
    <View className="flex-row px-4 py-2 space-x-6">
      <Dropdown
        options={typeOptions}
        selectedValue={selectedType}
        onSelect={onTypeChange}
        placeholder="Select Type"
        style={{ flex: 1 }}
      />
      <View className='w-2'></View>
      
      <Dropdown
        options={provinceOptions}
        selectedValue={selectedRegion}
        onSelect={onRegionChange}
        placeholder="Select Region"
        style={{ flex: 1 }}
      />
    </View>
  );
};

const ProductCard: React.FC<{ item: Item }> = ({ item }) => {
  const itemImage = getItemImage(item.item_image_url);

  const handleBuyNow = () => {
    Alert.alert(
      'Contact Seller',
      `Would you like to contact ${item.seller.display_name} for ${item.item_name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Contact', onPress: () => {
          // Implementasi contact seller (bisa via WhatsApp, email, dll)
          console.log('Contacting seller:', item.seller.email);
        }}
      ]
    );
  };

  return (
    <View className="bg-white mx-4 my-2 rounded-lg shadow-sm overflow-hidden">
      <View className="relative">
        <Image 
          source={itemImage}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-3 left-3 bg-amber-800 px-2 py-1 rounded">
          <Text 
            className="text-white text-xs font-medium"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            {item.item_type}
          </Text>
        </View>
      </View>
      
      <View className="p-4">
        <Text 
          className="text-xl font-semibold text-gray-900 mb-1"
          style={{ fontFamily: 'Poppins-SemiBold' }}
        >
          {formatCurrency(item.price)}
        </Text>
        
        <Text 
          className="text-lg font-medium text-gray-800 mb-2"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          {item.item_name}
        </Text>
        
        <Text 
          className="text-gray-600 text-sm mb-3"
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          Traditional craft from {item.province}
        </Text>
        
        <View className="flex-row items-center mb-2">
          <Image 
            source={require('../../../assets/images/address.png')}
            className="w-4 h-4 mr-2"
            style={{ tintColor: '#666' }}
          />
          <Text 
            className="text-gray-600 text-sm flex-1"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            {item.seller.display_name}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-2">
          <Image 
            source={require('../../../assets/images/location-production.png')}
            className="w-4 h-4 mr-2"
            style={{ tintColor: '#666' }}
          />
          <Text 
            className="text-gray-600 text-sm flex-1"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            {item.production_place}
          </Text>
        </View>

        <View className="flex-row items-center mb-4">
          <Image 
            source={require('../../../assets/images/location-production.png')}
            className="w-4 h-4 mr-2"
            style={{ tintColor: '#666' }}
          />
          <Text 
            className="text-gray-600 text-sm flex-1"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            {item.address}
          </Text>
        </View>
        
        <TouchableOpacity 
          className="bg-amber-800 py-3 rounded-lg"
          onPress={handleBuyNow}
        >
          <Text 
            className="text-white text-center font-semibold"
            style={{ fontFamily: 'Poppins-SemiBold' }}
          >
            Contact Seller
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoadingCard: React.FC = () => {
  return (
    <View className="bg-white mx-4 my-2 rounded-lg shadow-sm overflow-hidden">
      <View className="w-full h-48 bg-gray-200 items-center justify-center">
        <ActivityIndicator size="large" color="#4E1F00" />
      </View>
      <View className="p-4">
        <View className="h-6 bg-gray-200 rounded mb-2" />
        <View className="h-5 bg-gray-200 rounded mb-2" />
        <View className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <View className="h-4 bg-gray-200 rounded mb-2" />
        <View className="h-4 bg-gray-200 rounded mb-4" />
        <View className="h-10 bg-gray-200 rounded" />
      </View>
    </View>
  );
};

const EmptyState: React.FC<{ searchText: string }> = ({ searchText }) => {
  return (
    <View className="flex-1 items-center justify-center py-12 px-8">
      <Image 
        source={require('../../../assets/images/search.png')}
        className="w-16 h-16 mb-4"
        style={{ tintColor: '#9ca3af' }}
      />
      <Text 
        className="text-gray-500 text-lg font-medium mt-4 mb-2 text-center"
        style={{ fontFamily: 'Poppins-Medium' }}
      >
        {searchText ? 'No products found' : 'No products available'}
      </Text>
      <Text 
        className="text-gray-400 text-center"
        style={{ fontFamily: 'Poppins-Regular' }}
      >
        {searchText 
          ? `Try searching for different keywords`
          : 'Check your internet connection and try again'
        }
      </Text>
    </View>
  );
};

const FloatingAddButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const handleAddUMKM = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please login to add your MSME products',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/login') }
        ]
      );
      return;
    }
    
    router.push('/umkm/addItem');
  };

  const buttonSize = 64;

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      }}
      onPress={handleAddUMKM}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#92400e', '#6b4b41ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text 
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          +
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const MSMESPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searching, setSearching] = useState(false);

  // Function untuk fetch items
  const fetchItems = async (searchQuery?: string, type?: string, province?: string) => {
    try {
      setError(null);
      if (searchQuery || type !== 'all' || province !== 'all') {
        setSearching(true);
      } else {
        setLoading(true);
      }

      let endpoint = '/items';
      
      // Prioritas: search > province > type
      if (searchQuery && searchQuery.trim()) {
        endpoint = `/items/search?q=${encodeURIComponent(searchQuery.trim())}`;
      } else if (province && province !== 'all') {
        endpoint = `/items/province/${encodeURIComponent(province)}`;
      } else if (type && type !== 'all') {
        endpoint = `/items/type/${encodeURIComponent(type)}`;
      }
      
      const response = await apiService.get<Item[]>(endpoint);
      
      if (response.success) {
        setItems(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch items');
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err instanceof Error ? err.message : 'Failed to load items');
      setItems([]);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle search
  const handleSearch = () => {
    fetchItems(searchText, selectedType, selectedRegion);
  };

  // Handle search text change
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    
    // Auto search ketika text kosong (untuk reset)
    if (text === '') {
      fetchItems(undefined, selectedType, selectedRegion);
    }
  };

  // Handle filter changes
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    fetchItems(searchText, type, selectedRegion);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    fetchItems(searchText, selectedType, region);
  };

  // Retry function
  const handleRetry = () => {
    fetchItems(searchText || undefined, selectedType, selectedRegion);
  };

  return (
    <View className="flex-1 bg-yellow-low">
      <StatusBar barStyle="light-content" />
      
      <Header title="MSMES" />
      
      <ScrollView className="flex-1">
        <SearchBar 
          value={searchText}
          onChangeText={handleSearchTextChange}
          onSearch={handleSearch}
        />
        <FilterButtons 
          selectedType={selectedType}
          selectedRegion={selectedRegion}
          onTypeChange={handleTypeChange}
          onRegionChange={handleRegionChange}
        />
        
        {/* Loading State */}
        {loading && (
          <View className="py-2">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View className="flex-1 items-center justify-center py-12 px-8">
            <Text className="text-6xl mb-4">⚠️</Text>
            <Text 
              className="text-red-500 text-lg font-medium mt-4 mb-2 text-center"
              style={{ fontFamily: 'Poppins-Medium' }}
            >
              Failed to load products
            </Text>
            <Text 
              className="text-gray-600 text-center mb-6"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              {error}
            </Text>
            <TouchableOpacity 
              onPress={handleRetry}
              className="bg-amber-800 px-6 py-3 rounded-lg"
            >
              <Text 
                className="text-white font-medium"
                style={{ fontFamily: 'Poppins-Medium' }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Loading */}
        {searching && !loading && (
          <View className="py-8 items-center">
            <ActivityIndicator size="large" color="#4E1F00" />
            <Text 
              className="text-gray-600 mt-2"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Searching products...
            </Text>
          </View>
        )}

        {/* Content */}
        {!loading && !error && !searching && (
          <View className="py-2">
            {items.length > 0 ? (
              items.map((item) => (
                <ProductCard key={item.t_item_id} item={item} />
              ))
            ) : (
              <EmptyState searchText={searchText} />
            )}
          </View>
        )}
        
        {/* Spacing untuk floating button */}
        <View className="h-20" />
      </ScrollView>
      
      {/* Floating Action Button untuk Add UMKM */}
      <FloatingAddButton />
    </View>
  );
};

export default MSMESPage;