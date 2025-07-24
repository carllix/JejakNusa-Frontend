import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs

        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          animation: 'none', 
          lazy: false,
        }}
      >

        <Tabs.Screen
          name="explore"
          options={{
            title: 'explore',
          }}
        />
        
        <Tabs.Screen
          name="umkm"
          options={{
            title: 'umkm',
          }}
        />
        
        <Tabs.Screen
          name="profile"
          options={{
            title: 'profile',
          }}
        />
        
      
      </Tabs>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});