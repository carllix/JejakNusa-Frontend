// app/(tabs)/_layout.tsx
import React from "react"; // Pastikan React diimpor
import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme"; // Pastikan path ini benar
import { TabBarIcon } from "@/components/navigation/TabBarIcon"; // Contoh jika Anda punya ikon kustom

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerShown: false, // Sembunyikan header default jika Anda ingin custom
      }}
    >
      {/* Pastikan properti 'title' adalah string sederhana */}
      <Tabs.Screen
        name="index" // Ini merujuk ke app/(tabs)/index.tsx
        options={{
          title: "Peta Utama", // Ini adalah teks yang muncul di tab bar
          // Contoh penggunaan ikon kustom (jika Anda punya TabBarIcon)
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? "map" : "map-outline"} color={color} />
          // ),
        }}
      />
      {/* Tambahkan Tabs.Screen lain sesuai kebutuhan Anda, contoh: */}
      {/*
      <Tabs.Screen
        name="explore" // Ini merujuk ke app/(tabs)/explore.tsx
        options={{
          title: "Eksplorasi",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? "search" : "search-outline"} color={color} />
          // ),
        }}
      />
      */}
    </Tabs>
  );
}
