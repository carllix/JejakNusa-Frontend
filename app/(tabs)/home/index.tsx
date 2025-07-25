import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native"; 
import MapView, { Marker, Callout, Region } from "react-native-maps"; 

const provincesWithCoords = [
  { name: "Aceh", latitude: 5.55, longitude: 95.316, path: "Aceh" },
  {
    name: "Sumatera Utara",
    latitude: 2.19,
    longitude: 99.17,
    path: "SumateraUtara",
  },
  {
    name: "Sumatera Barat",
    latitude: -0.9471,
    longitude: 100.4172,
    path: "SumateraBarat",
  },
  { name: "Riau", latitude: 0.2933, longitude: 101.7068, path: "Riau" },
  {
    name: "Kepulauan Riau",
    latitude: 3.9457,
    longitude: 108.1429,
    path: "KepulauanRiau",
  },
  { name: "Jambi", latitude: -1.4852, longitude: 102.4381, path: "Jambi" },
  {
    name: "Bengkulu",
    latitude: -3.7928,
    longitude: 102.2601,
    path: "Bengkulu",
  },
  {
    name: "Sumatera Selatan",
    latitude: -3.3194,
    longitude: 103.9144,
    path: "SumateraSelatan",
  },
  {
    name: "Bangka Belitung",
    latitude: -2.7411,
    longitude: 106.4406,
    path: "BangkaBelitung",
  },
  {
    name: "Lampung",
    latitude: -4.5586,
    longitude: 105.4068,
    path: "Lampung",
  },
  {
    name: "DKI Jakarta",
    latitude: -6.2088,
    longitude: 106.8456,
    path: "DKIJakarta",
  },
  {
    name: "Jawa Barat",
    latitude: -6.9034,
    longitude: 107.5732,
    path: "JawaBarat",
  },
  { name: "Banten", latitude: -6.4058, longitude: 106.064, path: "Banten" },
  {
    name: "Jawa Tengah",
    latitude: -7.25,
    longitude: 110.0,
    path: "JawaTengah",
  },
  {
    name: "DI Yogyakarta",
    latitude: -7.8014,
    longitude: 110.3649,
    path: "DIYogyakarta",
  },
  {
    name: "Jawa Timur",
    latitude: -7.5,
    longitude: 112.5,
    path: "JawaTimur",
  },
  { name: "Bali", latitude: -8.3405, longitude: 115.092, path: "Bali" },
  {
    name: "Nusa Tenggara Barat",
    latitude: -8.6529,
    longitude: 117.3616,
    path: "NTB",
  },
  {
    name: "Nusa Tenggara Timur",
    latitude: -9.4654,
    longitude: 119.9386,
    path: "NTT",
  },
  {
    name: "Kalimantan Barat",
    latitude: 0.1323,
    longitude: 111.096,
    path: "KalimantanBarat",
  },
  {
    name: "Kalimantan Tengah",
    latitude: -1.6815,
    longitude: 113.3824,
    path: "KalimantanTengah",
  },
  {
    name: "Kalimantan Selatan",
    latitude: -3.0926,
    longitude: 115.2838,
    path: "KalimantanSelatan",
  },
  {
    name: "Kalimantan Timur",
    latitude: 0.0,
    longitude: 116.5,
    path: "KalimantanTimur",
  },
  {
    name: "Kalimantan Utara",
    latitude: 3.0731,
    longitude: 116.0414,
    path: "KalimantanUtara",
  },
  {
    name: "Sulawesi Utara",
    latitude: 1.4931,
    longitude: 124.8413,
    path: "SulawesiUtara",
  },
  {
    name: "Gorontalo",
    latitude: 0.6999,
    longitude: 122.4467,
    path: "Gorontalo",
  },
  {
    name: "Sulawesi Tengah",
    latitude: -1.4309,
    longitude: 121.4456,
    path: "SulawesiTengah",
  },
  {
    name: "Sulawesi Barat",
    latitude: -2.5166,
    longitude: 119.3462,
    path: "SulawesiBarat",
  },
  {
    name: "Sulawesi Selatan",
    latitude: -4.0,
    longitude: 120.0,
    path: "SulawesiSelatan",
  },
  {
    name: "Sulawesi Tenggara",
    latitude: -4.1469,
    longitude: 122.1746,
    path: "SulawesiTenggara",
  },
  {
    name: "Maluku",
    latitude: -3.2385,
    longitude: 130.1453,
    path: "Maluku",
  },
  {
    name: "Maluku Utara",
    latitude: 1.5708,
    longitude: 127.8082,
    path: "MalukuUtara",
  },
  { name: "Papua", latitude: -4.2696, longitude: 138.6309, path: "Papua" },
  {
    name: "Papua Barat",
    latitude: -1.3361,
    longitude: 133.1747,
    path: "PapuaBarat",
  },
  {
    name: "Papua Pegunungan",
    latitude: -3.9167,
    longitude: 138.75,
    path: "PapuaPegunungan",
  },
  {
    name: "Papua Tengah",
    latitude: -3.8,
    longitude: 136.9,
    path: "PapuaTengah",
  },
  {
    name: "Papua Selatan",
    latitude: -7.5,
    longitude: 139.5,
    path: "PapuaSelatan",
  },
  {
    name: "Papua Barat Daya",
    latitude: -0.8833,
    longitude: 131.25,
    path: "PapuaBaratDaya",
  },
];

const imageMap: { [key: string]: any } = {
  Aceh: require("../../../assets/images/provinces/Aceh.jpg"),
  SumateraUtara: require("../../../assets/images/provinces/SumateraUtara.jpg"),
  SumateraBarat: require("../../../assets/images/provinces/SumateraBarat.jpg"),
  Riau: require("../../../assets/images/provinces/Riau.jpg"),
  KepulauanRiau: require("../../../assets/images/provinces/KepulauanRiau.jpg"),
  Jambi: require("../../../assets/images/provinces/Jambi.jpg"),
  SumateraSelatan: require("../../../assets/images/provinces/SumateraSelatan.jpg"),
  Bengkulu: require("../../../assets/images/provinces/Bengkulu.jpg"),
  Lampung: require("../../../assets/images/provinces/Lampung.jpg"),
  BangkaBelitung: require("../../../assets/images/provinces/BangkaBelitung.jpg"),
  Banten: require("../../../assets/images/provinces/Banten.jpg"),
  JawaBarat: require("../../../assets/images/provinces/JawaBarat.jpg"),
  DKIJakarta: require("../../../assets/images/provinces/DKIJakarta.jpg"),
  JawaTengah: require("../../../assets/images/provinces/JawaTengah.jpg"),
  DIYogyakarta: require("../../../assets/images/provinces/DIYogyakarta.jpg"),
  JawaTimur: require("../../../assets/images/provinces/JawaTimur.jpg"),
  Bali: require("../../../assets/images/provinces/Bali.jpg"),
  NTB: require("../../../assets/images/provinces/NTB.jpg"),
  NTT: require("../../../assets/images/provinces/NTT.jpg"),
  KalimantanBarat: require("../../../assets/images/provinces/Kalbar.jpg"),
  KalimantanTengah: require("../../../assets/images/provinces/Kalteng.jpg"),
  KalimantanSelatan: require("../../../assets/images/provinces/Kalsel.jpg"),
  KalimantanTimur: require("../../../assets/images/provinces/Kaltim.jpg"),
  KalimantanUtara: require("../../../assets/images/provinces/Kaltara.jpg"),
  SulawesiUtara: require("../../../assets/images/provinces/SulawesiUtara.jpg"),
  Gorontalo: require("../../../assets/images/provinces/Gorontalo.jpg"),
  SulawesiTengah: require("../../../assets/images/provinces/SulawesiTengah.jpg"),
  SulawesiBarat: require("../../../assets/images/provinces/SulawesiBarat.jpg"),
  SulawesiSelatan: require("../../../assets/images/provinces/SulawesiSelatan.jpg"),
  SulawesiTenggara: require("../../../assets/images/provinces/SulawesiTenggara.jpg"),
  Maluku: require("../../../assets/images/provinces/Maluku.jpg"),
  MalukuUtara: require("../../../assets/images/provinces/MalukuUtara.jpg"),
  Papua: require("../../../assets/images/provinces/Papua.jpg"),
  PapuaBarat: require("../../../assets/images/provinces/PapuaBarat.jpg"),
  PapuaTengah: require("../../../assets/images/provinces/PapuaTengah.jpg"),
  PapuaPegunungan: require("../../../assets/images/provinces/PapuaPegunungan.jpg"),
  PapuaSelatan: require("../../../assets/images/provinces/PapuaSelatan.jpg"),
  PapuaBaratDaya: require("../../../assets/images/provinces/PapuaBaratDaya.jpg"),
};

const getRandomProvinceRegion = (): Region => {
  const random =
    provincesWithCoords[Math.floor(Math.random() * provincesWithCoords.length)];
  return {
    latitude: random.latitude,
    longitude: random.longitude,
    latitudeDelta: 1.5, 
    longitudeDelta: 1.5,
  };
};

const MyMap = () => {
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const region = getRandomProvinceRegion();
    setInitialRegion(region);
  }, []);

  const handleProvincePress = (provinceName: string) => {
    Alert.alert("Provinsi", `Anda memilih: ${provinceName}`, [
      { text: "OK", style: "default" },
    ]);
    router.push("/home/daerah");
  };

  if (!initialRegion) return <Text>Memuat peta...</Text>;
  const openWebsite = () => {
    Linking.openURL(
      "https://www.google.com/maps/place/7+Tempat+Keajaiban+dunia/@-7.6078728,110.2038319,2a,89.9y,85.52h,94.68t/data=!3m7!1e1!3m5!1sueD4CkqetE9dT7SUo6cyug!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-4.6815258553536125%26panoid%3DueD4CkqetE9dT7SUo6cyug%26yaw%3D85.52253035939387!7i13312!8i6656!4m14!1m7!3m6!1s0x2e7a8dd217aad765:0x99123cb8cb53fa40!2s7+Tempat+Keajaiban+dunia!8m2!3d-7.6078632!4d110.2038479!16s%2Fg%2F11sjvt6t4p!3m5!1s0x2e7a8dd217aad765:0x99123cb8cb53fa40!8m2!3d-7.6078632!4d110.2038479!16s%2Fg%2F11sjvt6t4p?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
    ); 
  };
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
                source={imageMap[province.path]} 
                style={styles.markerImage}
                resizeMode="contain"
              />
            </View>
            <Callout
              style={styles.calloutContainer}
              onPress={() => handleProvincePress(province.name)}
            >
              <View style={styles.calloutContent}>
                <Text style={styles.calloutTitle}>{province.name}</Text>

                <TouchableOpacity
                  style={styles.calloutButton}
                  onPress={() => handleProvincePress(province.name)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.calloutButtonText}>
                    Jelajahi {province.name}
                  </Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
        <Marker
          key={10000}
          coordinate={{
            latitude: -7.6079,
            longitude: 110.2038,
          }}
        >
          <View style={styles.customMarker}>
            <Image
              source={require("../../../assets/images/provinces/Borobudur.png")} 
              style={styles.markerImage}
              resizeMode="contain"
            />
          </View>
          <Callout
            style={styles.calloutContainer}
            onPress={() => openWebsite()}
          >
            <View style={styles.calloutContent}>
              <Text style={styles.calloutTitle}>Candi Borobudur</Text>

              <TouchableOpacity
                style={styles.calloutButton}
                activeOpacity={0.7}
              >
                <Text style={styles.calloutButtonText}>Jelajahi 3D</Text>
              </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0066CC",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  markerImage: {
    width: 65,
    height: 65,
    borderRadius: 4,
  },
  calloutContainer: {
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: 0,
    margin: 0,
  },
  calloutContent: {
    backgroundColor: "white",
    padding: 15,
    minWidth: 200,
    shadowColor: "#000",
    elevation: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  calloutSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  calloutButton: {
    backgroundColor: "#74502D",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
  },
  calloutButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default MyMap;
