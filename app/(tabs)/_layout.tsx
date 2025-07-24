import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import BottomBar from '../components/bottombar';


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
          name="umkm"
          options={{
            title: 'umkm',
          }}
        />
        
        <Tabs.Screen
          name="profile"
          options={{
            title: '',
          }}
        />
        <Tabs.Screen
            name="upload"
            options={{
              title: 'upload',
            }}
          />
            <Tabs.Screen
            name="home"
            options={{
              title: 'home',
            }}
          />


            <Tabs.Screen
              name="explore"
              options={{
                title: 'explore',
              }}
          />
        
          
      </Tabs>
      <BottomBar></BottomBar>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});