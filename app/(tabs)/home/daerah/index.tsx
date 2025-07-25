import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming, // Tambahkan ini untuk animasi
  Easing, // Tambahkan ini untuk easing animasi
} from "react-native-reanimated";

// Pastikan Anda telah menginstal dan mengonfigurasi NativeWind atau alat serupa
// untuk menggunakan Tailwind CSS di React Native.
// Contoh: npm install nativewind
// Kemudian ikuti petunjuk instalasi NativeWind untuk setup babel.config.js dan tailwind.config.js

export default function GestureDirectionScreenNewAPI() {
  // Shared value untuk melacak posisi perpindahan
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // State untuk mengelola konten dan halaman
  const [contentCount, setContentCount] = useState(0);
  const [page, setPage] = useState("daerah");
  const [pageNum, setPageNum] = useState(1); // pageNum akan siklus 0, 1, 2

  // State untuk status gesture (hanya untuk ditampilkan di UI)
  const [gestureStatus, setGestureStatus] = useState(
    "Tidak ada gesture terdeteksi"
  );

  // Fungsi untuk memperbarui status di JS thread (karena callback Reanimated berjalan di UI thread)
  const updateGestureStatus = (status: React.SetStateAction<string>) => {
    setGestureStatus(status);
  };

  // Fungsi untuk memperbarui nama halaman berdasarkan pageNum yang baru
  // Fungsi ini dipanggil dari JS thread, jadi bisa mengakses state terbaru
  const updatePageName = (newNum: number) => {
    // Pastikan pageNum selalu dalam rentang 0, 1, 2
    let currentPageMod = newNum % 3;
    if (currentPageMod < 0) {
      currentPageMod += 3; // Menangani hasil modulo negatif di JavaScript
    }

    if (currentPageMod === 0) {
      setPage("indonesia");
      router.push("/home/indonesia");
    } else if (currentPageMod === 1) {
      setPage("daerah");
      router.push("/home/daerah");
    } else if (currentPageMod === 2) {
      setPage("maps");
      router.push("/home");
    }
  };

  // Fungsi untuk menampilkan alert di JS thread
  const showAlert = (title: string, message: string | undefined) => {};

  // Definisikan gesture Pan
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Ketika gesture dimulai
      runOnJS(updateGestureStatus)("Gesture dimulai...");
    })
    .onChange((event) => {
      // Ketika posisi jari berubah, perbarui shared values
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      // Logika deteksi arah
      const threshold = 50; // Ambang batas gerakan dalam piksel
      let currentStatus = "Bergerak...";

      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        // Gerakan horizontal lebih dominan
        if (event.translationX > threshold) {
          currentStatus = "KANAN!";
        } else if (event.translationX < -threshold) {
          currentStatus = "KIRI!";
        }
      } else {
        // Gerakan vertikal lebih dominan
        if (event.translationY > threshold) {
          currentStatus = "BAWAH!";
        } else if (event.translationY < -threshold) {
          currentStatus = "ATAS!";
        }
      }
      runOnJS(updateGestureStatus)(currentStatus);
    })
    .onEnd((event) => {
      // Ketika gesture selesai (jari diangkat)
      const finalStatus = gestureStatus; // Ambil status terakhir sebelum reset

      runOnJS(updateGestureStatus)("Tidak ada gesture terdeteksi");

      let newContentCount = contentCount;
      let newPageNum = pageNum;

      // Perbarui nilai state sementara berdasarkan gesture yang terdeteksi
      if (finalStatus === "BAWAH!") {
        newContentCount = contentCount - 1;
      } else if (finalStatus === "ATAS!") {
        newContentCount = contentCount + 1;
      } else if (finalStatus === "KANAN!") {
        newPageNum = pageNum - 1;
        runOnJS(setPageNum)(newPageNum);

        // Panggil updatePageName di JS thread dengan nilai pageNum yang sudah diperbarui
        runOnJS(updatePageName)(newPageNum);
      } else if (finalStatus === "KIRI!") {
        newPageNum = pageNum + 1;
        runOnJS(setPageNum)(newPageNum);

        // Panggil updatePageName di JS thread dengan nilai pageNum yang sudah diperbarui
        runOnJS(updatePageName)(newPageNum);
      }

      // Panggil setter state di JS thread dengan nilai yang sudah diperbarui
      runOnJS(setContentCount)(newContentCount);

      // Reset posisi elemen kembali ke awal dengan animasi
      translateX.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    });

  // Gaya animasi yang akan diterapkan pada View yang digeser
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      {/* GestureDetector membungkus komponen yang akan menerima gesture */}
      <GestureDetector gesture={panGesture}>
        {/* Animated.View digunakan untuk animasi yang dioptimalkan oleh Reanimated */}
        <Animated.View
          className="w-[98%] h-[90%] bg-blue-200 justify-center items-center rounded-lg border-2 border-blue-500 p-5"
          style={animatedStyle}
        >
          <Text className="text-lg text-center my-2 text-gray-800 font-bold">
            Geser jari Anda ke atas, bawah, kanan, atau kiri
          </Text>
          <Text className="text-xl text-center mt-5 text-red-600 font-bold">
            Status Gesture: {gestureStatus}
          </Text>
          <Text className="text-xl text-center mt-5 text-red-600 font-bold">
            Content No: {contentCount}
          </Text>
          <Text className="text-xl text-center mt-5 text-red-600 font-bold">
            page No: {pageNum}
          </Text>
          <Text className="text-xl text-center mt-5 text-red-600 font-bold">
            Page: {page}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
