import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/app/components/header';
import { Ionicons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

// Interface untuk data user
interface UserProfile {
  name: string;
  username: string;
  bio: string;
  location: string;
  joinDate: string;
  following: number;
  followers: number;
  likes: string;
  profileImage: string;
}

// Interface untuk post
interface Post {
  id: string;
  title: string;
  image: string;
  likes: number;
  comments: number;
}

// Interface untuk achievement
interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}


const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Upacara Melasti di Pantai Sanur',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    likes: 1376,
    comments: 203
  },
  {
    id: '2',
    title: 'Membuat Lawar Tradisional Bali',
    image: 'https://images.unsplash.com/photo-1594736797933-d0301ba2fe65?w=400',
    likes: 923,
    comments: 107
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Top Contributor',
    description: 'Received at July 10, 2025',
    date: 'July 10, 2025',
    icon: '../../../assets/images/ribbon-star.png'
  },
  {
    id: '2',
    title: 'Heroic Explorer',
    description: 'Received at April 16, 2025',
    date: 'April 16, 2025',
    icon: '../../../assets/images/hiker.png'
  }
];

// Component untuk user yang belum login
const LoginPrompt: React.FC = () => {
  const handleLoginPress = () => {
    router.push('/login');
  };

  return (
    <View className="flex-1 bg-yellow-low">
      <StatusBar barStyle="light-content" />
      <Header title="Profile" />
      
      <View className="flex-1 justify-center items-center px-8">
        <View className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm">
          {/* Icon */}
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-amber-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="person-outline" size={40} color="#92400e" />
            </View>
            
            <Text 
              className="text-2xl font-bold text-gray-900 text-center mb-2"
              style={{ fontFamily: 'Poppins-Bold' }}
            >
              Welcome to JejakNusa!
            </Text>
            
            <Text 
              className="text-gray-600 text-center leading-5"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Please log in to your existing account to access your profile and explore Indonesia&apos;s rich cultural heritage.
            </Text>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            onPress={handleLoginPress}
            className="mb-4"
          >
            <LinearGradient
              colors={['#28110A', '#4E1F00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-4 rounded-lg flex-row items-center justify-center rounded-md"
            >
              <Text 
                className="text-white font-semibold text-base text-center py-2"
                style={{ fontFamily: 'Poppins-SemiBold' }}
              >
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row items-center justify-center">
            <Text 
              className="text-gray-600 text-sm"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Don&apos;t have an account? 
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/register')}
              className="ml-1"
            >
              <Text 
                className="text-amber-800 text-sm font-medium"
                style={{ fontFamily: 'Poppins-Medium' }}
              >
                Sign up here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileSection: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-lg p-6">
      <View className="items-center mb-4">
        <View className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 border-amber-100">
          <Image 
            source={require('../../../assets/images/default-profile.png')}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        
        <Text 
          className="text-xl font-semibold text-gray-900 mb-1 font-poppins"
        >
          {user.name}
        </Text>
        
        <Text 
          className="text-gray-600 mb-2 font-poppins"
        >
          {user.username}
        </Text>
        
        <View className="bg-amber-600 px-3 py-1 rounded-full mb-4">
          <Text 
            className="text-white text-sm font-medium font-poppins"
          >
            Contributor
          </Text>
        </View>
      </View>

      {/* Location & Join Date */}
      <View className="flex-row justify-center items-center mb-4 space-x-6">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text 
            className="text-gray-600 ml-1 mr-4 font-poppins"
          >
            {user.location}
          </Text>
        </View>
        
        <View className="flex-row items-center">
          <AntDesign name="clockcircleo" size={16} color="#666" />
          <Text 
            className="text-gray-600 ml-2 font-poppins"
          >
            Joined on {user.joinDate}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around mb-4 py-4 border-t border-b border-gray-100">
        <View className="items-center">
          <Text 
            className="text-2xl font-bold text-gray-900 font-poppins"
          >
            {user.following}
          </Text>
          <Text 
            className="text-gray-600 text-sm font-poppins"
          >
            Following
          </Text>
        </View>
        
        <View className="items-center">
          <Text 
            className="text-2xl font-bold text-gray-900 font-poppins"
          >
            {user.followers.toLocaleString()}
          </Text>
          <Text 
            className="text-gray-600 text-sm font-poppins"
          >
            Followers
          </Text>
        </View>
        
        <View className="items-center">
          <Text 
            className="text-2xl font-bold text-gray-900 font-poppins"
          >
            {user.likes}
          </Text>
          <Text 
            className="text-gray-600 text-sm font-poppins"
          >
            Likes
          </Text>
        </View>
      </View>

      {/* Bio */}
      <Text 
        className="text-gray-700 text-center mb-6 leading-5 font-poppins"
      >
        {user.bio}
      </Text>

      {/* Buttons */}
      <View className="flex-row space-x-3">
        <TouchableOpacity 
          className="flex-1 py-3 rounded-lg flex-row items-center justify-center"
          style={{ backgroundColor: '#28110A' }}
        >
          <FontAwesome5 name="edit" size={16} color="white" style={{ marginRight: 8 }} />
          <Text 
            className="text-white font-medium font-poppins"
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <View className='w-2'></View>
        
        <TouchableOpacity className="flex-1 bg-gray-100 py-3 rounded-lg flex-row items-center justify-center">
          <Feather name="share" size={16} color="#666" style={{ marginRight: 8 }} />
          <Text 
            className="text-gray-700 font-medium font-poppins"
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RecentPostsSection: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
      <View className="flex-row items-center mb-4">
        <FontAwesome5 name="camera" size={20} color="#666" style={{ marginRight: 8 }} />
        <Text 
          className="text-lg font-semibold text-gray-900"
          style={{ fontFamily: 'Poppins-SemiBold' }}
        >
          Most Recent Post
        </Text>
      </View>
      
      {posts.map((post) => (
        <View key={post.id} className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0">
          <Image 
            source={{ uri: post.image }}
            className="w-12 h-12 rounded-lg mr-3"
            resizeMode="cover"
          />
          
          <View className="flex-1">
            <Text 
              className="text-gray-900 font-medium mb-1 font-poppins"
            >
              {post.title}
            </Text>
            
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <AntDesign name="heart" size={14} color="#ff6b6b" />
                <Text 
                  className="text-gray-600 text-sm ml-1 font-poppins"
                >
                  {post.likes.toLocaleString()}
                </Text>
              </View>
              
              <View className="flex-row items-center ml-2">
                <FontAwesome5 name="comment" size={14} color="#666" />
                <Text 
                  className="text-gray-600 text-sm ml-1"
                  style={{ fontFamily: 'Poppins-Regular' }}
                >
                  {post.comments}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const AchievementsSection: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  return (
    <View className="bg-white mx-4 mt-4 mb-6 rounded-lg p-4 shadow-sm">
      <View className="flex-row items-center mb-4">
        <Image 
          source={require('../../../assets/images/medals.png')}
          className="w-8 h-8 mr-2"
          resizeMode="contain"
        />
        <Text 
          className="text-lg font-semibold text-gray-900 font-poppins"
        >
          Latest Achievement
        </Text>
      </View>
      
      {achievements.map((achievement) => (
        <View key={achievement.id} className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0">
          <Image 
            source={require('../../../assets/images/hiker.png')}
            className="w-10 h-10 mr-3"
            resizeMode="contain"
          />
          
          <View className="flex-1">
            <Text 
              className="text-gray-900 font-medium mb-1 font-poppins"
            >
              {achievement.title}
            </Text>
            <Text 
              className="text-gray-600 text-sm font-poppins"
            >
              {achievement.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const AuthenticatedProfile: React.FC = () => {
  const { user, logout } = useAuth();

  const userProfile: UserProfile = {
    name: user?.display_name || 'User',
    username: user?.email || 'user@example.com',
    bio: "Pecinta budaya Indonesia yang ingin membagikan kearifan lokal dengan dunia. Individu yang senang mendokumentasikan upacara adat dan kuliner tradisional.",
    location: "Indonesia",
    joinDate: "March 15, 2024", 
    following: 526,
    followers: 3794,
    likes: "110rb",
    profileImage: "../../assets/images/default-profile.png"
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View className="flex-1 bg-yellow-low">
      <StatusBar barStyle="light-content" />
      
      <Header title="Profile" />
      
      <ScrollView className="flex-1">
        <ProfileSection user={userProfile} />
        <RecentPostsSection posts={mockPosts} />
        <AchievementsSection achievements={mockAchievements} />
        
        {/* Logout Button */}
        <View className="mx-4 mb-8">
          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-500 py-4 rounded-lg flex-row items-center justify-center"
          >
            <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
            <Text 
              className="text-white font-semibold text-base"
              style={{ fontFamily: 'Poppins-SemiBold' }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const ProfilePage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Tampilkan loading jika masih checking auth
  if (isLoading) {
    return (
      <View className="flex-1 bg-yellow-low justify-center items-center">
        <StatusBar barStyle="light-content" />
        <Header title="Profile" />
        <View className="flex-1 justify-center items-center">
          <Text 
            className="text-gray-600"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return isAuthenticated ? <AuthenticatedProfile /> : <LoginPrompt />;
};

export default ProfilePage;