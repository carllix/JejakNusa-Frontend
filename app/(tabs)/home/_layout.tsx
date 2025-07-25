// app/(tabs)/home/_layout.tsx
import { Stack, router } from "expo-router";
import { Pressable, Text, Platform, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/HomeHeader"; // Import CustomHeader Anda

export default function HomeStackLayout() {
  const insets = useSafeAreaInsets();

  // Tinggi Custom Header kustom (sesuaikan jika perlu)
  // Ini adalah tinggi yang harus dikompensasi oleh konten layar
  const CUSTOM_HEADER_HEIGHT_INCLUDING_OFFSET = 60 + 40; // Base height (e.g., 60) + your 40px offset

  return (
    <Stack>
      {/* Screen for app/(tabs)/home/index.tsx (Halaman Utama) */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: true, // <<< Pastikan ini TRUE agar properti 'header' bekerja
          // Hapus properti headerTitle, headerRight, headerLeft, headerStyle,
          // headerTransparent, headerTintColor, headerTitleStyle, headerTitleAlign
          // karena sekarang CustomHeader yang akan mengelolanya.

          // --- Inilah yang Penting: Gunakan properti 'header' ---
          header: (
            { navigation, route, options } // 'header' menerima fungsi yang mengembalikan komponen
          ) => (
            <CustomHeader
              button1Text="explore"
              onButton1Press={() => router.push("/home/daerah")}
              button2Text="maps"
              onButton2Press={() => router.push("/home")} // Navigasi ke peta provinsi
              button3Text="indonesia"
              onButton3Press={() => router.push("/home/indonesia")}
              backgroundColor="rgba(244, 81, 30, 0)" // Warna latar belakang header kustom
              heightOffset={40} // Jarak tambahan dari bagian atas layar
            />
          ),
        }}
      />

      {/* Screen for app/(tabs)/home/daerah/index.tsx (Peta Provinsi) */}
      <Stack.Screen
        name="daerah/index"
        options={{
          headerShown: true, // <<< Pastikan ini TRUE agar properti 'header' bekerja
          // Hapus properti headerTitle, headerRight, headerLeft, headerStyle,
          // headerTransparent, headerTintColor, headerTitleStyle, headerTitleAlign
          // karena sekarang CustomHeader yang akan mengelolanya.

          // --- Inilah yang Penting: Gunakan properti 'header' ---
          header: (
            { navigation, route, options } // 'header' menerima fungsi yang mengembalikan komponen
          ) => (
            <CustomHeader
              button1Text="explore"
              onButton1Press={() => router.push("/home/daerah")}
              button2Text="maps"
              onButton2Press={() => router.push("/home")} // Navigasi ke peta provinsi
              button3Text="indonesia"
              onButton3Press={() => router.push("/home/indonesia")}
              backgroundColor="rgba(244, 81, 30, 0)" // Warna latar belakang header kustom
              heightOffset={40} // Jarak tambahan dari bagian atas layar
            />
          ),
        }}
      />
      <Stack.Screen
        name="indonesia/index"
        options={{
          headerShown: true, // <<< Pastikan ini TRUE agar properti 'header' bekerja
          // Hapus properti headerTitle, headerRight, headerLeft, headerStyle,
          // headerTransparent, headerTintColor, headerTitleStyle, headerTitleAlign
          // karena sekarang CustomHeader yang akan mengelolanya.

          // --- Inilah yang Penting: Gunakan properti 'header' ---
          header: (
            { navigation, route, options } // 'header' menerima fungsi yang mengembalikan komponen
          ) => (
            <CustomHeader
              button1Text="explore"
              onButton1Press={() => router.push("/home/daerah")}
              button2Text="maps"
              onButton2Press={() => router.push("/home")} // Navigasi ke peta provinsi
              button3Text="indonesia"
              onButton3Press={() => router.push("/home/indonesia")}
              backgroundColor="rgba(244, 81, 30, 0)" // Warna latar belakang header kustom
              heightOffset={40} // Jarak tambahan dari bagian atas layar
            />
          ),
        }}
      />
    </Stack>
  );
}
