import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image, // Make sure Image is imported
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
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Konfigurasi animasi smooth tanpa spring
const SMOOTH_TIMING_CONFIG = {
  duration: 300, // Durasi lebih cepat
  easing: Easing.out(Easing.quad), // Easing yang smooth
};

// Data dummy untuk konten seperti TikTok/Reels
const dummyContent = [
  {
    id: 1,
    username: "traveler_indonesia",
    description: "Pantai Kuta yang memukau di Bali 🏖️ #bali #pantai #sunset",
    image: require("../../../../assets/images/content/4.jpg"),
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
    image: require("../../../../assets/images/content/3.jpg"),
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
    image: require("../../../../assets/images/content/2.jpg"),
    likes: 3421,
    comments: 210,
    shares: 156,
    isLiked: false,
  },
  {
    id: 4,
    username: "culture_indonesia",
    description: "Tari Kecak Bali yang memesona 💃 #bali #tarikecak #budaya",
    // This image is already local, no change needed here.
    image: require("../../../../assets/images/content/1.jpg"),
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
    image: require("../../../../assets/images/content/5.jpg"),
    likes: 1876,
    comments: 92,
    shares: 78,
    isLiked: true,
  },
];

// Dummy page content for horizontal navigation
const pageContent = {
  maps: {
    title: "Maps Indonesia",
    bg: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    color: "#10B981",
  },
  indonesia: {
    title: "Indonesia",
    bg: "https://images.unsplash.com/photo-1555217851-6141535bd771?w=400&h=600&fit=crop",
    color: "#EF4444",
  },
  daerah: {
    title: "Daerah",
    bg: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=600&fit=crop",
    color: "#3B82F6",
  },
};

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

  // Direction lock states
  const [gestureDirection, setGestureDirection] = useState(null); // 'horizontal' | 'vertical' | null

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

  const setDirection = (direction) => {
    setGestureDirection(direction);
  };

  const navigateContent = (direction) => {
    if (direction === "up" && currentIndex < contents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "down" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to update page name based on pageNum
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
      const threshold = 20; // Threshold lebih kecil untuk responsivitas lebih baik

      // Lock direction on first significant movement
      if (!gestureDirection) {
        if (
          Math.abs(event.translationX) > threshold ||
          Math.abs(event.translationY) > threshold
        ) {
          if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
            runOnJS(setDirection)("horizontal");
          } else {
            runOnJS(setDirection)("vertical");
          }
        }
      }

      // Apply movement based on locked direction with smooth interpolation
      if (gestureDirection === "horizontal") {
        // Smooth horizontal movement dengan resistance
        const resistance = 0.8; // Memberikan sedikit resistance
        translateX.value = event.translationX * resistance;
        translateY.value = 0; // Lock vertical movement

        const feedbackThreshold = 40; // Threshold lebih kecil
        let currentStatus = "Bergerak horizontal...";

        if (event.translationX > feedbackThreshold) {
          currentStatus = "KANAN! → Daerah";
        } else if (event.translationX < -feedbackThreshold) {
          currentStatus = "KIRI! → Maps";
        }
        runOnJS(updateGestureStatus)(currentStatus);
      } else if (gestureDirection === "vertical") {
        // Smooth vertical movement dengan resistance
        const resistance = 0.8;
        translateY.value = event.translationY * resistance;
        translateX.value = 0; // Lock horizontal movement

        const feedbackThreshold = 40;
        let currentStatus = "Bergerak vertikal...";

        if (event.translationY > feedbackThreshold) {
          currentStatus = "BAWAH! (Previous Content)";
        } else if (event.translationY < -feedbackThreshold) {
          currentStatus = "ATAS! (Next Content)";
        }
        runOnJS(updateGestureStatus)(currentStatus);
      }
    })
    .onEnd((event) => {
      const threshold = 80;
      let newContentCount = contentCount;
      let newPageNum = pageNum;

      if (gestureDirection === "horizontal") {
        // Handle horizontal gestures
        if (event.translationX > threshold) {
          newPageNum = pageNum - 1;
          runOnJS(setPageNum)(newPageNum);
          runOnJS(updatePageName)(newPageNum);
        } else if (event.translationX < -threshold) {
          newPageNum = pageNum + 1;
          runOnJS(setPageNum)(newPageNum);
          runOnJS(updatePageName)(newPageNum);
        }

        // Reset position after horizontal swipe
        translateX.value = withTiming(0, SMOOTH_TIMING_CONFIG);
        translateY.value = withTiming(0, SMOOTH_TIMING_CONFIG);
      } else if (gestureDirection === "vertical") {
        if (event.translationY > threshold) {
          // ↓ Swipe ke bawah → Dismiss tanpa mantul
          runOnJS(navigateContent)("down");
          newContentCount = contentCount - 1;
          translateY.value = withTiming(0, SMOOTH_TIMING_CONFIG);
        } else if (event.translationY < -threshold) {
          // ↑ Swipe ke atas → Next content biasa
          runOnJS(navigateContent)("up");
          newContentCount = contentCount + 1;
          translateY.value = withTiming(0, SMOOTH_TIMING_CONFIG);
        } else {
          // Tidak cukup threshold → tidak memantul, langsung hilang
          translateY.value = withTiming(
            SCREEN_HEIGHT,
            SMOOTH_TIMING_CONFIG,
            (finished) => {
              if (finished) {
                runOnJS(navigateContent)("down");
                runOnJS(setContentCount)(contentCount - 1);
                runOnJS(updateGestureStatus)("Swipe untuk navigasi");
                runOnJS(setDirection)(null);
                translateY.value = 0;
              }
            }
          );
        }

        // Reset horizontal posisi (selalu)
        translateX.value = withTiming(0, SMOOTH_TIMING_CONFIG);
      } else {
        // Jika tidak ada direction (fallback)
        translateX.value = withTiming(0, SMOOTH_TIMING_CONFIG);
        translateY.value = withTiming(0, SMOOTH_TIMING_CONFIG);
      }
    });

  // Main content animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // Next content preview (vertical) - Smooth interpolation
  const nextContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-120, 0],
      [0.8, 0], // Opacity lebih tinggi untuk preview yang lebih jelas
      Extrapolate.CLAMP
    );
    const translateYNext = interpolate(
      translateY.value,
      [-120, 0],
      [0, SCREEN_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: translateYNext }],
    };
  });

  // Previous content preview (vertical) - Smooth interpolation
  const prevContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, 120],
      [0, 0.8],
      Extrapolate.CLAMP
    );
    const translateYPrev = interpolate(
      translateY.value,
      [0, 120],
      [-SCREEN_HEIGHT, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: translateYPrev }],
    };
  });

  // Page preview styles (horizontal) - Smooth interpolation
  const nextPageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-120, 0],
      [0.9, 0], // Opacity tinggi untuk page preview
      Extrapolate.CLAMP
    );
    const translateXNext = interpolate(
      translateX.value,
      [-120, 0],
      [0, SCREEN_WIDTH],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX: translateXNext }],
    };
  });

  const prevPageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, 120],
      [0, 0.9],
      Extrapolate.CLAMP
    );
    const translateXPrev = interpolate(
      translateX.value,
      [0, 120],
      [-SCREEN_WIDTH, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX: translateXPrev }],
    };
  });

  const currentContent = contents[currentIndex];
  const nextContent =
    currentIndex < contents.length - 1 ? contents[currentIndex + 1] : null;
  const prevContent = currentIndex > 0 ? contents[currentIndex - 1] : null;

  // Get page info for previews
  const getPageInfo = (pageOffset) => {
    const targetPage = (pageNum + pageOffset) % 3;
    const normalizedPage = targetPage < 0 ? targetPage + 3 : targetPage;

    if (normalizedPage === 0) return pageContent.maps;
    if (normalizedPage === 1) return pageContent.indonesia;
    return pageContent.daerah;
  };
  const screenHeight = Dimensions.get("window").height;
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <GestureDetector gesture={panGesture}>
        <View style={{ flex: 1 }}>
          {/* Previous Content Preview (Vertical) */}
          {prevContent && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                prevContentStyle,
              ]}
            >
              {/* Conditional rendering for image source */}
              <Image
                source={
                  typeof prevContent.image === "string" &&
                  prevContent.image.startsWith("http")
                    ? { uri: prevContent.image }
                    : prevContent.image
                }
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 50,
                  left: 20,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  @{prevContent.username}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Next Content Preview (Vertical) */}
          {nextContent && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                nextContentStyle,
              ]}
            >
              {/* Conditional rendering for image source */}
              <Image
                source={
                  typeof nextContent.image === "string" &&
                  nextContent.image.startsWith("http")
                    ? { uri: nextContent.image }
                    : nextContent.image
                }
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 50,
                  left: 20,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  @{nextContent.username}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Previous Page Preview (Horizontal) */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              prevPageStyle,
            ]}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: getPageInfo(-1).color,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
              >
                {getPageInfo(-1).title}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginTop: 8,
                  opacity: 0.8,
                }}
              >
                ← Swipe untuk masuk
              </Text>
            </View>
          </Animated.View>

          {/* Next Page Preview (Horizontal) */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              nextPageStyle,
            ]}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: getPageInfo(1).color,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
              >
                {getPageInfo(1).title}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginTop: 8,
                  opacity: 0.8,
                }}
              >
                Swipe untuk masuk →
              </Text>
            </View>
          </Animated.View>

          {/* Main Content */}
          <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <View style={{ flex: 1, position: "relative" }}>
              {/* Background Image */}
              {/* Conditional rendering for image source */}
              <Image
                source={
                  typeof currentContent.image === "string" &&
                  currentContent.image.startsWith("http")
                    ? { uri: currentContent.image }
                    : currentContent.image
                }
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="contain"
              />

              {/* Overlay Gradient */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    backgroundColor: "transparent",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  }}
                />
              </View>

              {/* Top Bar - Status hanya */}
              <View
                style={{
                  position: "absolute",
                  top: 60,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "500" }}
                  >
                    {gestureStatus}
                  </Text>
                </View>
              </View>

              {/* Right Side Actions */}
              <View
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: 850 - 758,

                  alignItems: "center",
                  rowGap: 28,
                }}
              >
                {/* Like Button */}
                <TouchableOpacity
                  onPress={toggleLike}
                  style={{ alignItems: "center", marginBottom: 24 }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/images/like.png")} // Local image
                      resizeMode="contain"
                      style={{
                        width: "100%", // Make the image take 100% of the parent's width
                        height: "100%", // Make the image take 100% of the parent's height
                      }}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {currentContent.likes.toLocaleString()}
                  </Text>
                </TouchableOpacity>

                {/* Comment Button */}
                <TouchableOpacity
                  onPress={() => setShowComments(true)}
                  style={{ alignItems: "center", marginBottom: 24 }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/images/comment.png")} // Local image
                      resizeMode="contain"
                      style={{
                        width: "100%", // Make the image take 100% of the parent's width
                        height: "100%", // Make the image take 100% of the parent's height
                      }}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {currentContent.comments}
                  </Text>
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity
                  onPress={handleShare}
                  style={{ alignItems: "center", marginBottom: 24 }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/images/share.png")} // Local image
                      resizeMode="contain"
                      style={{
                        width: "100%", // Make the image take 100% of the parent's width
                        height: "100%", // Make the image take 100% of the parent's height
                      }}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {currentContent.shares}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Content Info */}
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 16,
                  right: 80,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  @{currentContent.username}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    lineHeight: 20,
                    marginBottom: 12,
                  }}
                >
                  {currentContent.description}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        onRequestClose={() => setShowComments(false)}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginTop: 325,
          }}
        >
          {/* Comments Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Komentar</Text>
            <TouchableOpacity onPress={() => setShowComments(false)}>
              <Text style={{ color: "#6B7280", fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <ScrollView style={{ flex: 1, padding: 16 }}>
            {dummyComments.map((comment) => (
              <View
                key={comment.id}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: "#D1D5DB",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>👤</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 14,
                        marginRight: 8,
                      }}
                    >
                      {comment.username}
                    </Text>
                    <Text style={{ color: "#6B7280", fontSize: 12 }}>
                      {comment.time}
                    </Text>
                  </View>
                  <Text style={{ color: "#1F2937" }}>{comment.comment}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Comment Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: "#E5E7EB",
            }}
          >
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Tulis komentar..."
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#D1D5DB",
                borderRadius: 25,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 12,
              }}
              multiline={false}
            />
            <TouchableOpacity
              onPress={addComment}
              style={{
                backgroundColor: "#3B82F6",
                borderRadius: 25,
                paddingHorizontal: 24,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
