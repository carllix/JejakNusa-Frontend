// MapComponent.js
import React from "react";
import { View } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

const MapComponent = () => {
  // Koordinat awal untuk peta (contoh: London)
  const initialRegion = {
    latitude: 51.505,
    longitude: -0.09,
    latitudeDelta: 0.0922, // Tingkat zoom
    longitudeDelta: 0.0421, // Tingkat zoom
  };

  // GANTI DENGAN API KEY GEOAPIFY ANDA YANG SEBENARNYA
  // PENTING: Untuk aplikasi produksi, jangan menyimpan API Key langsung di kode.
  // Gunakan variabel lingkungan (environment variables) atau sistem konfigurasi yang aman.
  const GEOAPIFY_API_KEY = "4d0323362d2643dd8f13942789cca4f5"; // GANTI INI!

  // URL template untuk Geoapify map tiles
  // Contoh ini menggunakan gaya "osm-bright". Geoapify menawarkan berbagai gaya peta.
  // Lihat dokumentasi Geoapify untuk gaya peta lainnya: https://www.geoapify.com/map-tiles
  const geoapifyTileUrl = `https://maps.geoapify.com/v1/tile?zoom={z}&x={x}&y={y}&apiKey=${GEOAPIFY_API_KEY}`;

  return (
    // Gunakan kelas Tailwind untuk memastikan View mengambil seluruh ruang yang tersedia
    <View className="flex-1 w-full h-full">
      <MapView
        className="flex-1 w-full h-full" // MapView juga harus mengambil seluruh ruang
        initialRegion={initialRegion}
      >
        {/* Tambahkan UrlTile sebagai anak dari MapView */}
        <UrlTile urlTemplate={geoapifyTileUrl} zIndex={-1} />{" "}
        {/* zIndex -1 agar marker terlihat di atas tile */}
        <Marker
          coordinate={{ latitude: 51.505, longitude: -0.09 }}
          title="Lokasi Contoh"
          description="Ini adalah lokasi marker contoh."
        />
      </MapView>
    </View>
  );
};

export default MapComponent;
