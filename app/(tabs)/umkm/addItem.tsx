import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera, ArrowLeft } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import Dropdown from '@/app/components/dropdown';
import { provinceOptions } from '@/app/types/types';

// Interface untuk form data
interface ProductFormData {
  item_name: string;
  item_type: string;
  price: string;
  province: string;
  production_place: string;
  address: string;
  image_url?: string;
}

// Options untuk dropdown item type
const itemTypeOptions = [
  { label: 'Handicraft', value: 'Handicraft' },
  { label: 'Food & Beverage', value: 'Food & Beverage' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Home Decor', value: 'Home Decor' },
  { label: 'Traditional Craft', value: 'Traditional Craft' },
  { label: 'Modern Craft', value: 'Modern Craft' },
  { label: 'Textile', value: 'Textile' },
  { label: 'Wood Craft', value: 'Wood Craft' },
  { label: 'Metal Craft', value: 'Metal Craft' },
  { label: 'Ceramic', value: 'Ceramic' }
];

const Header: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <LinearGradient
      colors={['#6b4b41ff', '#4E1F00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingTop: insets.top + 10,
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity onPress={onBack} className="mr-4">
        <ArrowLeft size={24} color="white" />
      </TouchableOpacity>
      <Text 
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '600',
          fontFamily: 'Poppins-SemiBold'
        }}
      >
        {title}
      </Text>
    </LinearGradient>
  );
};

const FormInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
  required?: boolean;
}> = ({ label, value, onChangeText, placeholder, multiline = false, keyboardType = 'default', required = false }) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 text-base font-medium mb-2">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <TextInput
        className={`bg-white border border-gray-200 rounded-lg px-4 py-3 text-base ${multiline ? 'min-h-[80px]' : ''}`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={keyboardType}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      />
    </View>
  );
};

const ImageUpload: React.FC<{
  imageUri: string | null;
  onImageSelect: (uri: string) => void;
  loading: boolean;
}> = ({ imageUri, onImageSelect, loading }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant photo library permission to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 text-base font-medium mb-2">
        Product Image <Text className="text-red-500">*</Text>
      </Text>
      
      <TouchableOpacity
        onPress={pickImage}
        disabled={loading}
        className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center"
        style={{
          height: 200,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {loading ? (
          <View className="items-center">
            <ActivityIndicator size="large" color="#92400e" />
            <Text className="text-gray-500 mt-2">Uploading...</Text>
          </View>
        ) : imageUri ? (
          <View className="w-full h-full">
            <Image 
              source={{ uri: imageUri }} 
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
            <View className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
              <Text className="text-white text-xs">Tap to change</Text>
            </View>
          </View>
        ) : (
          <View className="items-center">
            <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mb-3">
              <Camera size={32} color="#9CA3AF" />
            </View>
            <Text className="text-gray-500 text-center text-base">
              Tap to upload product image
            </Text>
            <Text className="text-gray-400 text-center text-sm mt-1">
              PNG, JPG up to 10MB
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const AddItemPage: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    item_name: '',
    item_type: '',
    price: '',
    province: '',
    production_place: '',
    address: '',
    image_url: ''
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const UploadToCloudinary = async (imageUri: string): Promise<string> => {
    try {
      setIsUploading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return  URL (bisa pakai gambar yang dipilih atau placeholder)
      const CloudinaryUrl = imageUri; // Gunakan local URI sebagai 
      // Atau bisa pakai placeholder: 'https://via.placeholder.com/400x300.png?text=Uploaded+Image'
      
      return CloudinaryUrl;
    } catch (error) {
      console.error(' upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelect = async (uri: string) => {
    setSelectedImage(uri);
    
    try {
      // Simulasi upload dengan  function
      const UploadedUrl = await UploadToCloudinary(uri);
      setFormData(prev => ({ ...prev, image_url: UploadedUrl }));
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      console.error(' upload error:', error);
    }
  };

  const validateForm = (): boolean => {
    const requiredFields = ['item_name', 'item_type', 'price', 'province', 'production_place', 'address'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof ProductFormData]?.trim()) {
        Alert.alert('Error', `Please fill in ${field.replace('_', ' ')}`);
        return false;
      }
    }

    if (!selectedImage) {
      Alert.alert('Error', 'Please upload a product image');
      return false;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare final data
      const submitData = {
        item_name: formData.item_name.trim(),
        item_type: formData.item_type,
        price: Number(formData.price),
        province: formData.province,
        production_place: formData.production_place.trim(),
        address: formData.address.trim(),
        image_url: formData.image_url
      };

      console.log(' submitting product data:', submitData);

      // Simulasi API call (3 detik loading)
      await new Promise(resolve => setTimeout(resolve, 3000));

      //  response success
      Alert.alert(
        'Success!', 
        'Your product has been added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back ke halaman UMKM (index.tsx)
              router.push('./');
            }
          }
        ]
      );

    } catch (error) {
      console.error(' submit error:', error);
      Alert.alert('Error', 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('./');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <StatusBar barStyle="light-content" />
      
      <Header title="Add New Product" onBack={handleBack} />
      
      <ScrollView className="flex-1 px-4 py-4">
        <FormInput
          label="Product Name"
          value={formData.item_name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, item_name: text }))}
          placeholder="Enter product name"
          required
        />

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">
            Product Type <Text className="text-red-500">*</Text>
          </Text>
          <Dropdown
            options={itemTypeOptions}
            selectedValue={formData.item_type}
            onSelect={(value) => setFormData(prev => ({ ...prev, item_type: value }))}
            placeholder="Select product type"
          />
        </View>

        <FormInput
          label="Price (Rp)"
          value={formData.price}
          onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
          placeholder="Enter price (e.g., 150000)"
          keyboardType="numeric"
          required
        />

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">
            Province <Text className="text-red-500">*</Text>
          </Text>
          <Dropdown
            options={provinceOptions}
            selectedValue={formData.province}
            onSelect={(value) => setFormData(prev => ({ ...prev, province: value }))}
            placeholder="Select province"
          />
        </View>

        <FormInput
          label="Production Place"
          value={formData.production_place}
          onChangeText={(text) => setFormData(prev => ({ ...prev, production_place: text }))}
          placeholder="Enter production place (e.g., Solo)"
          required
        />

        <FormInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
          placeholder="Enter full address"
          multiline
          required
        />

        <ImageUpload
          imageUri={selectedImage}
          onImageSelect={handleImageSelect}
          loading={isUploading}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting || isUploading}
          className="bg-amber-800 py-4 rounded-lg mt-6 mb-8"
          style={{
            opacity: isSubmitting || isUploading ? 0.6 : 1,
          }}
        >
          {isSubmitting ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator size="small" color="white" />
              <Text className="text-white text-base font-semibold ml-2">
                 Adding Product...
              </Text>
            </View>
          ) : (
            <Text 
              className="text-white text-center text-base font-semibold"
              style={{ fontFamily: 'Poppins-SemiBold' }}
            >
              Add Product
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddItemPage;