import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabItem {
  name: string;
  route: string;
  whiteIcon: any;
  chocolateIcon: any;
  label: string;
}

const tabItems: TabItem[] = [
  {
    name: "home",
    route: "/(tabs)/home",
    whiteIcon: require("../../assets/images/home-white.png"),
    chocolateIcon: require("../../assets/images/home-chocolate.png"),
    label: "Home",
  },
  {
    name: "explore",
    route: "/(tabs)/explore",
    whiteIcon: require("../../assets/images/explore-white.png"),
    chocolateIcon: require("../../assets/images/explore-chocolate.png"),
    label: "Explore",
  },
  {
    name: "laga",
    route: "/(tabs)/laga",
    whiteIcon: require("../../assets/images/upload-white.png"),
    chocolateIcon: require("../../assets/images/upload-chocolate.png"),
    label: "Laga",
  },
  {
    name: "umkm",
    route: "/(tabs)/umkm",
    whiteIcon: require("../../assets/images/umkm-white.png"),
    chocolateIcon: require("../../assets/images/umkm-chocolate.png"),
    label: "MSMES",
  },
  {
    name: "profile",
    route: "/(tabs)/profile",
    whiteIcon: require("../../assets/images/profile-white.png"),
    chocolateIcon: require("../../assets/images/profile-chocolate.png"),
    label: "Profile",
  },
];

interface TabButtonProps {
  item: TabItem;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ item, isActive, onPress }) => {
  const containerStyle = {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 8,
    paddingHorizontal: 4,
  };

  const buttonStyle = {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
    minHeight: 50,
    borderRadius: 8,
  };

  const iconStyle = {
    width: 24,
    height: 24,
    marginBottom: 4,
  };

  const textStyle = {
    fontSize: 11,
    fontWeight: "500" as const,
    textAlign: "center" as const,
    // Remove fontFamily untuk menghindari masalah loading font
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isActive ? (
        <LinearGradient
          colors={["#28110A", "#4E1F00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={buttonStyle}
        >
          <Image
            source={item.whiteIcon}
            style={iconStyle}
            resizeMode="contain"
          />
          <Text style={[textStyle, { color: "white" }]}>{item.label}</Text>
        </LinearGradient>
      ) : (
        <View style={[buttonStyle, { backgroundColor: "transparent" }]}>
          <Image
            source={item.chocolateIcon}
            style={iconStyle}
            resizeMode="contain"
          />
          <Text style={[textStyle, { color: "#000" }]}>{item.label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const BottomBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const getActiveTab = (pathname: string): string => {
    if (pathname.includes('/home')) return 'home';
    if (pathname.includes('/explore')) return 'explore';
    if (pathname.includes('/laga')) return 'laga';
    if (pathname.includes('/umkm')) return 'umkm';
    if (pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab(pathname);

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  // Style untuk container utama
  const containerStyle = {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingBottom: Math.max(insets.bottom, 16), // Minimum 16px untuk Android
    paddingTop: 4,
    // Shadow yang konsisten untuk iOS dan Android
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  };

  const tabContainerStyle = {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-around" as const,
    paddingHorizontal: 8,
    paddingVertical: 4,
  };

  return (
    <View style={containerStyle}>
      <View style={tabContainerStyle}>
        {tabItems.map((item) => (
          <TabButton
            key={item.name}
            item={item}
            isActive={activeTab === item.name}
            onPress={() => handleTabPress(item.route)}
          />
        ))}
      </View>
    </View>
  );
};

export default BottomBar;
