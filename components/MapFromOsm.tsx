import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polygon, Polyline } from "react-native-maps";

import osmtogeojson from "osmtogeojson";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

// --- Render fitur GeoJSON ---
const renderFeature = (feature, index) => {
  const { geometry, properties } = feature;
  if (!geometry) return null;

  const key = `${geometry.type}-${index}`;

  switch (geometry.type) {
    case "Point":
      return (
        <Marker
          key={key}
          coordinate={{
            longitude: geometry.coordinates[0],
            latitude: geometry.coordinates[1],
          }}
          title={properties?.name || "Point"}
        />
      );

    case "LineString":
      const lineCoords = geometry.coordinates.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));
      return (
        <Polyline
          key={key}
          coordinates={lineCoords}
          strokeColor="#007BFF"
          strokeWidth={3}
        />
      );

    case "Polygon":
      const polygonCoords = geometry.coordinates[0].map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));
      return (
        <Polygon
          key={key}
          coordinates={polygonCoords}
          strokeColor="#FF0000"
          fillColor="rgba(255, 0, 0, 0.2)"
        />
      );

    default:
      return null;
  }
};

// --- Komponen Utama ---
const MapFromOsm = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAndParseOsm = async () => {
      try {
        const asset = Asset.fromModule(require("./assets/data.osm"));
        await asset.downloadAsync();

        const xmlString = await FileSystem.readAsStringAsync(asset.localUri);
        const xml = new window.DOMParser().parseFromString(
          xmlString,
          "text/xml"
        );
        const geojson = osmtogeojson(xml);

        setGeoJsonData(geojson);
      } catch (e) {
        console.error("Gagal memuat atau mem-parsing file OSM:", e);
        setError("Tidak dapat memuat data peta.");
      }
    };

    loadAndParseOsm();
  }, []);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {geoJsonData?.features.map(renderFeature)}
      </MapView>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 8,
  },
});

export default MapFromOsm;
