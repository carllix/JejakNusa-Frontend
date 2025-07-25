import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomHeaderProps {
  // ... (unchanged props)
  button1Text: string;
  onButton1Press: () => void;
  button2Text: string;
  onButton2Press: () => void;
  button3Text: string;
  onButton3Press: () => void;
  button1IconName?: keyof typeof Ionicons.glyphMap;
  button2IconName?: keyof typeof Ionicons.glyphMap;
  button3IconName?: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string; // This should ideally be an RGBA string now
  // opacity?: number; // << REMOVE THIS PROP, as it's now part of backgroundColor
  heightOffset?: number;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  // ... (unchanged destructuring)
  button1Text,
  onButton1Press,
  button2Text,
  onButton2Press,
  button3Text,
  onButton3Press,
  button1IconName,
  button2IconName,
  button3IconName,
  backgroundColor = "rgba(244, 81, 30, 0.7)", // Make sure this is always RGBA
  // opacity = 0.7, // << REMOVE DEFAULT VALUE
  heightOffset = 0,
}) => {
  const insets = useSafeAreaInsets();

  const dynamicTop =
    Platform.OS === "android"
      ? (StatusBar.currentHeight || 0) + heightOffset
      : insets.top + heightOffset;

  return (
    <View
      className="absolute top-0 left-0 right-0 flex-row justify-between items-center mx-10 pb-2 z-10"
      style={{
        paddingTop: dynamicTop,
        // --- KEY CHANGE: Use RGBA for background, remove 'opacity' prop ---
        backgroundColor: backgroundColor, // This 'backgroundColor' prop should already be an RGBA string
      }}
    >
      {/* Button Group */}
      {/* Remove the opacity on this inner View to ensure it's fully opaque */}
      <View className="flex-row justify-between w-full px-4 bg-[#74502D]/60 h-10 py-1 rounded-xl">
        <TouchableOpacity
          className="flex-col font-poppins items-center py-1 px-2 ml-2 rounded-md"
          onPress={onButton1Press}
        >
          {button1IconName && (
            <Ionicons name={button1IconName} size={20} color="white" />
          )}
          <Text className="text-white text-xl font-bold ml-1">
            {button1Text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-col items-center py-1 px-2 ml-2 rounded-md"
          onPress={onButton2Press}
        >
          {button2IconName && (
            <Ionicons name={button2IconName} size={20} color="white" />
          )}
          <Text className="text-white text-xl font-bold ml-1">
            {button2Text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-col items-center py-1 px-2 ml-2  rounded-md"
          onPress={onButton3Press}
        >
          {button3IconName && (
            <Ionicons name={button3IconName} size={20} color="white" />
          )}
          <Text className="text-white text-xl font-bold ml-1">
            {button3Text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
