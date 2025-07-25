import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Header from "@/app/components/header";
import { apiService } from "../../services/api";

interface Province {
  province: string;
  contributors: number;
  totalContent: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Province[];
}

// Mapping nama provinsi ke file gambar
const provinceImageMap: Record<string, any> = {
  Aceh: require("../../../assets/images/provinces/Aceh.jpg"),
  Bali: require("../../../assets/images/provinces/Bali.jpg"),
  "Bangka Belitung": require("../../../assets/images/provinces/BangkaBelitung.jpg"),
  Banten: require("../../../assets/images/provinces/Banten.jpg"),
  Bengkulu: require("../../../assets/images/provinces/Bengkulu.jpg"),
  "DI Yogyakarta": require("../../../assets/images/provinces/DIYogyakarta.jpg"),
  "DKI Jakarta": require("../../../assets/images/provinces/DKIJakarta.jpg"),
  Gorontalo: require("../../../assets/images/provinces/Gorontalo.jpg"),
  Jambi: require("../../../assets/images/provinces/Jambi.jpg"),
  "Jawa Barat": require("../../../assets/images/provinces/JawaBarat.jpg"),
  "Jawa Tengah": require("../../../assets/images/provinces/JawaTengah.jpg"),
  "Jawa Timur": require("../../../assets/images/provinces/JawaTimur.jpg"),
  "Kalimantan Barat": require("../../../assets/images/provinces/Kalbar.jpg"),
  "Kalimantan Selatan": require("../../../assets/images/provinces/Kalsel.jpg"),
  "Kalimantan Utara": require("../../../assets/images/provinces/Kaltara.jpg"),
  "Kalimantan Tengah": require("../../../assets/images/provinces/Kalteng.jpg"),
  "Kalimantan Timur": require("../../../assets/images/provinces/Kaltim.jpg"),
  "Kepulauan Riau": require("../../../assets/images/provinces/KepulauanRiau.jpg"),
  Lampung: require("../../../assets/images/provinces/Lampung.jpg"),
  Maluku: require("../../../assets/images/provinces/Maluku.jpg"),
  "Maluku Utara": require("../../../assets/images/provinces/MalukuUtara.jpg"),
  "Nusa Tenggara Barat": require("../../../assets/images/provinces/NTB.jpg"),
  "Nusa Tenggara Timur": require("../../../assets/images/provinces/NTT.jpg"),
  Papua: require("../../../assets/images/provinces/Papua.jpg"),
  "Papua Barat": require("../../../assets/images/provinces/PapuaBarat.jpg"),
  "Papua Barat Daya": require("../../../assets/images/provinces/PapuaBaratDaya.jpg"),
  "Papua Pegunungan": require("../../../assets/images/provinces/PapuaPegunungan.jpg"),
  "Papua Selatan": require("../../../assets/images/provinces/PapuaSelatan.jpg"),
  "Papua Tengah": require("../../../assets/images/provinces/PapuaTengah.jpg"),
  Riau: require("../../../assets/images/provinces/Riau.jpg"),
  "Sulawesi Barat": require("../../../assets/images/provinces/SulawesiBarat.jpg"),
  "Sulawesi Selatan": require("../../../assets/images/provinces/SulawesiSelatan.jpg"),
  "Sulawesi Tengah": require("../../../assets/images/provinces/SulawesiTengah.jpg"),
  "Sulawesi Tenggara": require("../../../assets/images/provinces/SulawesiTenggara.jpg"),
  "Sulawesi Utara": require("../../../assets/images/provinces/SulawesiUtara.jpg"),
  "Sumatera Barat": require("../../../assets/images/provinces/SumateraBarat.jpg"),
  "Sumatera Selatan": require("../../../assets/images/provinces/SumateraSelatan.jpg"),
  "Sumatera Utara": require("../../../assets/images/provinces/SumateraUtara.jpg"),
};

const defaultProvinceImage = require("../../../assets/images/default-explore-1.png");

const getProvinceImage = (provinceName: string) => {
  return provinceImageMap[provinceName] || defaultProvinceImage;
};

const getProvinceDescription = (provinceName: string): string => {
  const descriptions: Record<string, string> = {
    // Sumatera
    Aceh: "The gateway to Indonesia with rich Islamic heritage and strong Acehnese traditions.",
    "Sumatera Utara":
      "Land of the Batak people with ancient customs and Lake Toba's mystical beauty.",
    "Sumatera Barat":
      "Home of Minangkabau matrilineal culture and the magnificent Rumah Gadang.",
    Riau: "The cradle of Malay civilization with royal palaces and traditional crafts.",
    "Kepulauan Riau":
      "A maritime province where Malay culture meets modern island life.",
    Jambi:
      "Ancient kingdom land rich in Malay heritage and Batanghari River traditions.",
    "Sumatera Selatan":
      "Home to Palembang's Srivijaya legacy and authentic Pempek cuisine.",
    "Bangka Belitung":
      "Tin islands with unique Hakka Chinese-Malay cultural fusion.",
    Bengkulu:
      "Raffles' historic land with traditional Rejang culture and spice heritage.",
    Lampung:
      "The gateway between Java and Sumatera with diverse ethnic traditions.",

    // Jawa
    "DKI Jakarta":
      "The vibrant capital where Indonesia's diverse cultures converge and thrive.",
    "Jawa Barat":
      "Sundanese heartland with angklung music, traditional dances, and highland beauty.",
    "Jawa Tengah":
      "The soul of Javanese culture with ancient temples and royal traditions.",
    "DI Yogyakarta":
      "The cultural heart of Java, home to the Sultan's palace and artistic heritage.",
    "Jawa Timur":
      "Where Javanese tradition meets Madurese culture in historical harmony.",
    Banten:
      "Islamic sultanate heritage with Baduy indigenous wisdom and coastal traditions.",

    // Bali & Nusa Tenggara
    Bali: "Island of the gods where Hindu-Balinese culture creates magical daily ceremonies.",
    "Nusa Tenggara Barat":
      "Sasak and Sumbawan cultures with Islamic traditions and pristine nature.",
    "Nusa Tenggara Timur":
      "Land of diverse tribes with ancient animistic beliefs and traditional weaving.",

    // Kalimantan
    "Kalimantan Barat":
      "Dayak heartland where river cultures and longhouse traditions flourish.",
    "Kalimantan Tengah":
      "Sacred Dayak territories with Kaharingan beliefs and forest wisdom.",
    "Kalimantan Selatan":
      "Banjar Islamic culture with floating markets and diamond river traditions.",
    "Kalimantan Timur":
      "Kutai kingdom legacy with diverse Dayak cultures and coal-rich heritage.",
    "Kalimantan Utara":
      "Newest province blending Dayak traditions with modern border dynamics.",

    // Sulawesi
    "Sulawesi Utara":
      "Minahasan Christian culture with spicy cuisine and volcanic island beauty.",
    "Sulawesi Tengah":
      "Kaili and Pamona cultures with mystical Lore Lindu and megalithic heritage.",
    "Sulawesi Selatan":
      "Bugis-Makassar maritime kingdom with legendary seafaring traditions.",
    "Sulawesi Tenggara":
      "Tolaki and Butonese cultures with ancient sultanate and maritime heritage.",
    Gorontalo:
      "Gorontalese Islamic culture with traditional boat-making and corn-based cuisine.",
    "Sulawesi Barat":
      "Mandar maritime culture with traditional boat craftsmanship and coastal wisdom.",

    // Maluku
    Maluku:
      "The legendary Spice Islands with Ambonese music and rich maritime history.",
    "Maluku Utara":
      "Sultanate heritage in the original spice islands with clove and nutmeg traditions.",

    // Papua
    "Papua Barat":
      "Land of diverse Papuan tribes with ancient customs and Bird of Paradise.",
    Papua:
      "Indonesia's easternmost treasure with hundreds of indigenous cultures and traditions.",
    "Papua Tengah":
      "Highland Papuan cultures with traditional agriculture and mountain wisdom.",
    "Papua Pegunungan":
      "Mountainous region where ancient Papuan traditions meet modern times.",
    "Papua Selatan":
      "Southern Papuan cultures with coastal and inland tribal diversity.",
    "Papua Barat Daya":
      "Western Papuan heritage with marine cultures and island traditions.",
  };

  return (
    descriptions[provinceName] ||
    "Explore the rich cultural heritage of this beautiful region."
  );
};

const SearchBar: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}> = ({ value, onChangeText, onSearch }) => {
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
          placeholder="Search provinces..."
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          style={{ fontFamily: "Poppins-Regular" }}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")} className="ml-2">
            <MaterialIcons name="clear" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const ProvinceCard: React.FC<{ province: Province }> = ({ province }) => {
  const provinceImage = getProvinceImage(province.province);
  const description = getProvinceDescription(province.province);

  return (
    <View className="bg-white mx-4 my-2 rounded-lg shadow-sm overflow-hidden">
      {/* Province Image */}
      <View className="relative">
        <Image
          source={provinceImage}
          className="w-full h-48"
          resizeMode="cover"
        />
        {/* Overlay dengan gradient */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0"
        />
        {/* Province Name & Description */}
        <View className="absolute bottom-4 left-4 right-4">
          <Text
            className="text-white text-2xl font-bold mb-1"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            {province.province}
          </Text>
          <Text
            className="text-white text-sm opacity-90"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {description}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-center mb-4 space-x-6">
          <View className="flex-row items-center">
            <MaterialIcons name="person" size={16} color="#666" />
            <Text className="text-gray-600 text-sm ml-1 font-poppins">
              {province.contributors} contributors
            </Text>
          </View>

          <View className="flex-row items-center ml-2">
            <FontAwesome5 name="camera" size={14} color="#666" />
            <Text className="text-gray-600 text-sm ml-1 font-poppins">
              {province.totalContent} contents
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log(`Exploring ${province.province}`);
            // Handle explore province navigation
            Alert.alert(
              "Coming Soon",
              `Explore ${province.province} feature will be available soon!`
            );
          }}
          style={{
            borderRadius: 8,
            overflow: "hidden",
            marginTop: 4,
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#28110A", "#4E1F00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-center font-medium font-poppins text-white">
              Explore
            </Text>
          </LinearGradient>
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
        <View className="h-4 bg-gray-200 rounded mb-2" />
        <View className="h-3 bg-gray-200 rounded w-3/4 mb-4" />
        <View className="flex-row space-x-4 mb-4">
          <View className="h-3 bg-gray-200 rounded w-20" />
          <View className="h-3 bg-gray-200 rounded w-20" />
        </View>
        <View className="h-10 bg-gray-200 rounded" />
      </View>
    </View>
  );
};

const EmptyState: React.FC<{ searchText: string }> = ({ searchText }) => {
  return (
    <View className="flex-1 items-center justify-center py-12 px-8">
      <MaterialIcons name="search-off" size={64} color="#9ca3af" />
      <Text
        className="text-gray-500 text-lg font-medium mt-4 mb-2 text-center"
        style={{ fontFamily: "Poppins-Medium" }}
      >
        {searchText ? "No provinces found" : "No provinces available"}
      </Text>
      <Text
        className="text-gray-400 text-center"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        {searchText
          ? `Try searching for a different province name`
          : "Check your internet connection and try again"}
      </Text>
    </View>
  );
};

const ExplorePage: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchProvinces = async (search?: string) => {
    try {
      setError(null);
      if (search) {
        setSearching(true);
      } else {
        setLoading(true);
      }

      const endpoint = search
        ? `/content/provinces?search=${encodeURIComponent(search)}`
        : "/content/provinces";

      const response = await apiService.get<Province[]>(endpoint);

      if (response.success) {
        setProvinces(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch provinces");
      }
    } catch (err) {
      console.error("Error fetching provinces:", err);
      setError(err instanceof Error ? err.message : "Failed to load provinces");
      setProvinces([]);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleSearch = () => {
    if (searchText.trim()) {
      fetchProvinces(searchText.trim());
    } else {
      fetchProvinces();
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);

    if (text === "") {
      fetchProvinces();
    }
  };

  const handleRetry = () => {
    fetchProvinces(searchText || undefined);
  };

  return (
    <View className="flex-1 bg-yellow-low">
      <StatusBar barStyle="light-content" />

      <Header title="Explore" />

      <ScrollView className="flex-1">
        <SearchBar
          value={searchText}
          onChangeText={handleSearchTextChange}
          onSearch={handleSearch}
        />

        {loading && (
          <View className="py-2">
            <LoadingCard />
            <LoadingCard />
          </View>
        )}

        {error && !loading && (
          <View className="flex-1 items-center justify-center py-12 px-8">
            <MaterialIcons name="error-outline" size={64} color="#ef4444" />
            <Text
              className="text-red-500 text-lg font-medium mt-4 mb-2 text-center"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Failed to load provinces
            </Text>
            <Text
              className="text-gray-600 text-center mb-6"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {error}
            </Text>
            <TouchableOpacity
              onPress={handleRetry}
              className="bg-amber-800 px-6 py-3 rounded-lg"
            >
              <Text
                className="text-white font-medium"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {searching && !loading && (
          <View className="py-8 items-center">
            <ActivityIndicator size="large" color="#4E1F00" />
            <Text
              className="text-gray-600 mt-2"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              Searching...
            </Text>
          </View>
        )}

        {!loading && !error && !searching && (
          <View className="py-2">
            {provinces.length > 0 ? (
              provinces.map((province, index) => (
                <ProvinceCard
                  key={`${province.province}-${index}`}
                  province={province}
                />
              ))
            ) : (
              <EmptyState searchText={searchText} />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ExplorePage;
