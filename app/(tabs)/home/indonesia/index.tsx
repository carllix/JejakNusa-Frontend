import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Data dummy untuk konten seperti TikTok/Reels
const dummyContent = [
  {
    id: 1,
    username: "traveler_indonesia",
    description: "Pantai Kuta yang memukau di Bali 🏖️ #bali #pantai #sunset",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=600&fit=crop",
    likes: 1234,
    comments: 89,
    shares: 45,
    isLiked: false,
  },
  {
    id: 2,
    username: "foodie_nusantara",
    description:
      "Gudeg Jogja yang legendaris! Siapa yang kangen? 🍛 #jogja #gudeg #kuliner",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop",
    likes: 2156,
    comments: 134,
    shares: 67,
    isLiked: true,
  },
  {
    id: 3,
    username: "adventure_id",
    description:
      "Sunrise di Bromo yang tak terlupakan ⛰️ #bromo #sunrise #adventure",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    likes: 3421,
    comments: 210,
    shares: 156,
    isLiked: false,
  },
  {
    id: 4,
    username: "culture_indonesia",
    description: "Tari Kecak Bali yang memesona 💃 #bali #tarikecak #budaya",
    image:
      "https://images.unsplash.com/photo-1555400082-ac5d8f6d6a43?w=400&h=600&fit=crop",
    likes: 987,
    comments: 45,
    shares: 23,
    isLiked: false,
  },
  {
    id: 5,
    username: "nature_lover",
    description:
      "Danau Toba yang mempesona dari atas 🌊 #danautoба #sumut #alam",
    image:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=400&h=600&fit=crop",
    likes: 1876,
    comments: 92,
    shares: 78,
    isLiked: true,
  },
];

// Dummy comments data
const dummyComments = [
  { id: 1, username: "user123", comment: "Keren banget!", time: "2j" },
  {
    id: 2,
    username: "traveler99",
    comment: "Kapan ke sini lagi nih",
    time: "5j",
  },
  {
    id: 3,
    username: "foodlover",
    comment: "Pengen banget ke sana!",
    time: "1h",
  },
  {
    id: 4,
    username: "exploreindonesia",
    comment: "Indonesia memang indah 🇮🇩",
    time: "3h",
  },
];

export default function TikTokReelsComponent() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contents, setContents] = useState(dummyContent);
  const [gestureStatus, setGestureStatus] = useState("Swipe untuk navigasi");

  // States from original gesture component
  const [contentCount, setContentCount] = useState(0);
  const [page, setPage] = useState("indonesia");
  const [pageNum, setPageNum] = useState(1);

  // Modal states
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const updateGestureStatus = (status) => {
    setGestureStatus(status);
  };

  const navigateContent = (direction) => {
    if (direction === "up" && currentIndex < contents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "down" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to update page name based on pageNum (from original)
  const updatePageName = (newNum) => {
    let currentPageMod = newNum % 3;
    if (currentPageMod < 0) {
      currentPageMod += 3;
    }

    if (currentPageMod === 0) {
      setPage("maps");
      router.push("/home");
    } else if (currentPageMod === 1) {
      setPage("indonesia");
      router.push("/home/indonesia");
    } else if (currentPageMod === 2) {
      setPage("daerah");
      router.push("/home/daerah");
    }
  };

  const toggleLike = () => {
    const updatedContents = [...contents];
    const current = updatedContents[currentIndex];
    current.isLiked = !current.isLiked;
    current.likes += current.isLiked ? 1 : -1;
    setContents(updatedContents);
  };

  const handleShare = () => {
    Alert.alert("Share", "Fitur share akan segera tersedia!");
  };

  const handleFollow = () => {
    Alert.alert("Follow", `Mengikuti @${contents[currentIndex].username}`);
  };

  const addComment = () => {
    if (newComment.trim()) {
      Alert.alert("Comment", `Komentar ditambahkan: "${newComment}"`);
      setNewComment("");
      setShowComments(false);
    }
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(updateGestureStatus)("Gesture dimulai...");
    })
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      const threshold = 50;
      let currentStatus = "Bergerak...";

      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        // Horizontal gesture (left/right) - for page navigation
        if (event.translationX > threshold) {
          currentStatus = "KANAN! → Daerah";
        } else if (event.translationX < -threshold) {
          currentStatus = "KIRI! → Maps";
        }
      } else {
        // Vertical gesture (up/down) - for content navigation
        if (event.translationY > threshold) {
          currentStatus = "BAWAH! (Previous Content)";
        } else if (event.translationY < -threshold) {
          currentStatus = "ATAS! (Next Content)";
        }
      }
      runOnJS(updateGestureStatus)(currentStatus);
    })
    .onEnd((event) => {
      const threshold = 100;
      const finalStatus = gestureStatus;

      let newContentCount = contentCount;
      let newPageNum = pageNum;

      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        // Handle horizontal gestures (page navigation)
        if (event.translationX > threshold) {
          // Right swipe → Daerah
          newPageNum = pageNum - 1; // Increment to go to daerah
          runOnJS(setPageNum)(newPageNum);
          runOnJS(updatePageName)(newPageNum);
        } else if (event.translationX < -threshold) {
          // Left swipe → Maps
          newPageNum = pageNum + 1; // Decrement to go to maps
          runOnJS(setPageNum)(newPageNum);
          runOnJS(updatePageName)(newPageNum);
        }
      } else {
        // Handle vertical gestures (content navigation)
        if (event.translationY > threshold) {
          // Down swipe - previous content
          runOnJS(navigateContent)("down");
          newContentCount = contentCount - 1;
        } else if (event.translationY < -threshold) {
          // Up swipe - next content
          runOnJS(navigateContent)("up");
          newContentCount = contentCount + 1;
        }
      }

      runOnJS(setContentCount)(newContentCount);
      runOnJS(updateGestureStatus)("Swipe untuk navigasi");

      // Reset position with animation
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const currentContent = contents[currentIndex];

  return (
    <View className="flex-1 bg-black">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          {/* Main Content Container */}
          <View className="flex-1 relative">
            {/* Background Image/Video */}
            <Image
              source={{ uri: currentContent.image }}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />

            {/* Overlay Gradient */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

            {/* Top Bar */}
            <View className="absolute top-12 left-0 right-0 flex-row justify-between items-center px-4 z-10">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-white text-lg">← Back</Text>
              </TouchableOpacity>
              <Text className="text-white text-sm">{gestureStatus}</Text>
            </View>

            {/* Right Side Actions */}
            <View className="absolute right-4 bottom-32 z-10">
              {/* Like Button */}
              <TouchableOpacity
                onPress={toggleLike}
                className="items-center mb-6"
              >
                <View className="w-12 h-12 rounded-full bg-white/20 justify-center items-center mb-1">
                  <Text
                    className={`text-2xl ${currentContent.isLiked ? "text-red-500" : "text-white"}`}
                  >
                    {currentContent.isLiked ? "❤️" : "🤍"}
                  </Text>
                </View>
                <Text className="text-white text-xs font-semibold">
                  {currentContent.likes.toLocaleString()}
                </Text>
              </TouchableOpacity>

              {/* Comment Button */}
              <TouchableOpacity
                onPress={() => setShowComments(true)}
                className="items-center mb-6"
              >
                <View className="w-12 h-12 rounded-full bg-white/20 justify-center items-center mb-1">
                  <Text className="text-white text-xl">💬</Text>
                </View>
                <Text className="text-white text-xs font-semibold">
                  {currentContent.comments}
                </Text>
              </TouchableOpacity>

              {/* Share Button */}
              <TouchableOpacity
                onPress={handleShare}
                className="items-center mb-6"
              >
                <View className="w-12 h-12 rounded-full bg-white/20 justify-center items-center mb-1">
                  <Text className="text-white text-xl">↗️</Text>
                </View>
                <Text className="text-white text-xs font-semibold">
                  {currentContent.shares}
                </Text>
              </TouchableOpacity>

              {/* Profile Picture */}
              <TouchableOpacity onPress={handleFollow} className="items-center">
                <View className="w-12 h-12 rounded-full bg-gray-300 justify-center items-center border-2 border-white">
                  <Text className="text-lg">👤</Text>
                </View>
                <View className="w-6 h-6 rounded-full bg-red-500 justify-center items-center -mt-2 border-2 border-white">
                  <Text className="text-white text-xs font-bold">+</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Bottom Content Info */}
            <View className="absolute bottom-8 left-4 right-20 z-10">
              <Text className="text-white font-bold text-lg mb-2">
                @{currentContent.username}
              </Text>
              <Text className="text-white text-sm leading-5 mb-3">
                {currentContent.description}
              </Text>

              {/* Debug Info */}
              <View className="bg-black/50 p-2 rounded mb-2">
                <Text className="text-white text-xs">
                  Content: {contentCount}
                </Text>
                <Text className="text-white text-xs">
                  Page: {page} ({pageNum})
                </Text>
                <Text className="text-white text-xs">
                  Index: {currentIndex + 1}/{contents.length}
                </Text>
              </View>

              {/* Progress Indicator */}
              <View className="flex-row space-x-1">
                {contents.map((_, index) => (
                  <View
                    key={index}
                    className={`h-1 flex-1 rounded ${
                      index === currentIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        onRequestClose={() => setShowComments(false)}
      >
        <View className="flex-1 bg-white">
          {/* Comments Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="font-bold text-lg">Komentar</Text>
            <TouchableOpacity onPress={() => setShowComments(false)}>
              <Text className="text-gray-500 text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <ScrollView className="flex-1 p-4">
            {dummyComments.map((comment) => (
              <View key={comment.id} className="flex-row items-start mb-4">
                <View className="w-8 h-8 rounded-full bg-gray-300 justify-center items-center mr-3">
                  <Text className="text-sm">👤</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="font-semibold text-sm mr-2">
                      {comment.username}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {comment.time}
                    </Text>
                  </View>
                  <Text className="text-gray-800">{comment.comment}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Comment Input */}
          <View className="flex-row items-center p-4 border-t border-gray-200">
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Tulis komentar..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-3"
              multiline={false}
            />
            <TouchableOpacity
              onPress={addComment}
              className="bg-blue-500 rounded-full px-6 py-2"
            >
              <Text className="text-white font-semibold">Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
