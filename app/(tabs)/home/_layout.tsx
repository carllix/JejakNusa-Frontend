import { Stack, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/HomeHeader";

export default function HomeStackLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,

          header: ({ navigation, route, options }) => (
            <CustomHeader
              button1Text="explore"
              onButton1Press={() => router.push("/home/daerah")}
              button2Text="maps"
              onButton2Press={() => router.push("/home")}
              button3Text="indonesia"
              onButton3Press={() => router.push("/home/indonesia")}
              backgroundColor="rgba(244, 81, 30, 0)"
              heightOffset={40}
            />
          ),
        }}
      />

      {/* Screen for app/(tabs)/home/daerah/index.tsx (Peta Provinsi) */}
      <Stack.Screen
        name="daerah/index"
        options={{
          headerShown: true,

          header: ({ navigation, route, options }) => (
            <CustomHeader
              button1Text="explore"
              onButton1Press={() => router.push("/home/daerah")}
              button2Text="maps"
              onButton2Press={() => router.push("/home")}
              button3Text="indonesia"
              onButton3Press={() => router.push("/home/indonesia")}
              backgroundColor="rgba(244, 81, 30, 0)"
              heightOffset={40}
            />
          ),
        }}
      />
      <Stack.Screen
        name="indonesia/index"
        options={{
          headerShown: true,

          header: ({ navigation, route, options }) => (
            <CustomHeader
              button1Text="explore"
              onButton1Press={() => router.push("/home/daerah")}
              button2Text="maps"
              onButton2Press={() => router.push("/home")}
              button3Text="indonesia"
              onButton3Press={() => router.push("/home/indonesia")}
              backgroundColor="rgba(244, 81, 30, 0)"
              heightOffset={40}
            />
          ),
        }}
      />
    </Stack>
  );
}
