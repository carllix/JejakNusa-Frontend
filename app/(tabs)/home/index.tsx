import React, { useEffect, useState } from "react";
import { View, Button, Alert, StyleSheet, Text, Image } from "react-native"; // Tambahkan Text untuk judul marker
import MapView, { Marker, Callout, Region } from "react-native-maps"; // Import Marker dan Callout

// Data provinsi dengan koordinat (ini hanya sebagian kecil sebagai contoh!)
const provincesWithCoords = [
  { name: "Aceh", latitude: 5.55, longitude: 95.316 },
  { name: "Sumatera Utara", latitude: 2.19, longitude: 99.17 },
  { name: "Sumatera Barat", latitude: -0.9471, longitude: 100.4172 },
  { name: "Riau", latitude: 0.2933, longitude: 101.7068 },
  { name: "Kepulauan Riau", latitude: 3.9457, longitude: 108.1429 },
  { name: "Jambi", latitude: -1.4852, longitude: 102.4381 },
  { name: "Bengkulu", latitude: -3.7928, longitude: 102.2601 },
  { name: "Sumatera Selatan", latitude: -3.3194, longitude: 103.9144 },
  { name: "Bangka Belitung", latitude: -2.7411, longitude: 106.4406 },
  { name: "Lampung", latitude: -4.5586, longitude: 105.4068 },
  { name: "DKI Jakarta", latitude: -6.2088, longitude: 106.8456 },
  { name: "Jawa Barat", latitude: -6.9034, longitude: 107.5732 },
  { name: "Banten", latitude: -6.4058, longitude: 106.064 },
  { name: "Jawa Tengah", latitude: -7.25, longitude: 110.0 },
  { name: "DI Yogyakarta", latitude: -7.8014, longitude: 110.3649 },
  { name: "Jawa Timur", latitude: -7.5, longitude: 112.5 },
  { name: "Bali", latitude: -8.3405, longitude: 115.092 },
  { name: "Nusa Tenggara Barat", latitude: -8.6529, longitude: 117.3616 },
  { name: "Nusa Tenggara Timur", latitude: -9.4654, longitude: 119.9386 },
  { name: "Kalimantan Barat", latitude: 0.1323, longitude: 111.096 },
  { name: "Kalimantan Tengah", latitude: -1.6815, longitude: 113.3824 },
  { name: "Kalimantan Selatan", latitude: -3.0926, longitude: 115.2838 },
  { name: "Kalimantan Timur", latitude: 0.0, longitude: 116.5 },
  { name: "Kalimantan Utara", latitude: 3.0731, longitude: 116.0414 },
  { name: "Sulawesi Utara", latitude: 1.4931, longitude: 124.8413 },
  { name: "Gorontalo", latitude: 0.6999, longitude: 122.4467 },
  { name: "Sulawesi Tengah", latitude: -1.4309, longitude: 121.4456 },
  { name: "Sulawesi Barat", latitude: -2.5166, longitude: 119.3462 },
  { name: "Sulawesi Selatan", latitude: -4.0, longitude: 120.0 },
  { name: "Sulawesi Tenggara", latitude: -4.1469, longitude: 122.1746 },
  { name: "Maluku", latitude: -3.2385, longitude: 130.1453 },
  { name: "Maluku Utara", latitude: 1.5708, longitude: 127.8082 },
  { name: "Papua", latitude: -4.2696, longitude: 138.6309 },
  { name: "Papua Barat", latitude: -1.3361, longitude: 133.1747 },
  { name: "Papua Pegunungan", latitude: -3.9167, longitude: 138.75 },
  { name: "Papua Tengah", latitude: -3.8, longitude: 136.9 },
  { name: "Papua Selatan", latitude: -7.5, longitude: 139.5 },
  { name: "Papua Barat Daya", latitude: -0.8833, longitude: 131.25 },
];
const getRandomProvinceRegion = (): Region => {
  const random =
    provincesWithCoords[Math.floor(Math.random() * provincesWithCoords.length)];
  return {
    latitude: random.latitude,
    longitude: random.longitude,
    latitudeDelta: 1.5, // zoom level sedang
    longitudeDelta: 1.5,
  };
};

const MyMap = () => {
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const region = getRandomProvinceRegion();
    setInitialRegion(region);
  }, []);

  if (!initialRegion) return <Text>Memuat peta...</Text>;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {provincesWithCoords.map((province, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: province.latitude,
              longitude: province.longitude,
            }}
          >
            <View style={styles.customMarker}>
              <Image
                source={require("../../../assets/markers/province.png")} 
                style={styles.markerImage}
                resizeMode="contain"
              />
            </View>
            <Callout>
              <View>
                <Text style={styles.calloutText}>{province.name}</Text>
                <Button
                  title={`Lihat ${province.name}`}
                  onPress={() => Alert.alert(`Provinsi: ${province.name}`)}
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  customMarker: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8, // hapus jika mau full kotak
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // untuk Android
  },

  markerImage: {
    width: 40,
    height: 70,
    borderRadius: 4, // bisa disesuaikan
  },
});

export default MyMap;
