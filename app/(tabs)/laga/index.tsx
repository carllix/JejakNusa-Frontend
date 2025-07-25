import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Import icons
import { Ionicons , SimpleLineIcons,AntDesign,Octicons,MaterialIcons } from '@expo/vector-icons';

// Interfaces
interface WordOfDay {
  word: string;
  language: string;
  definition: string;
  pronunciation: string;
  example: string;
  meaning: string;
}

interface Quiz {
  questions: number;
  maxPoints: number;
  timeLimit: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  participants: number;
  endDate: string;
  rank: number;
  progress: number;
  reward: string;
  image?: string;
}

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  location: string;
  points: number;
  badges: number;
}

// Mock Data
const wordOfDay: WordOfDay = {
  word: "Culuk",
  language: "Lampung Language",
  definition: "Hand - a body part from the wrist to the fingertips used for activities",
  pronunciation: "cu - luk",
  example: "Sikam mengan ngegunako culuk",
  meaning: "Saya makan menggunakan tangan"
};

const cultureQuiz: Quiz = {
  questions: 5,
  maxPoints: 50,
  timeLimit: false
};

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Share a Traditional Dish from Your Region',
    description: 'Share a recipe and story about a traditional food from your hometown.',
    category: 'Culinary',
    difficulty: 'Easy',
    points: 150,
    participants: 89,
    endDate: 'January 22, 2025',
    rank: 8,
    progress: 40,
    reward: 'Culinary Badge + Rp 50,000 MSME Voucher',
    image: '../../assets/images/default-explore-1.png'
  },
  {
    id: '2',
    title: 'Nusantara Handicrafts',
    description: 'Document the process of making a traditional craft',
    category: 'Crafts',
    difficulty: 'Easy',
    points: 200,
    participants: 187,
    endDate: '01/05/2025',
    rank: 8,
    progress: 0,
    reward: 'Artist Badge + 30% MSMEs Discount'
  },
  {
    id: '3',
    title: 'Everyday Local Language',
    description: 'Learn 10 commonly used local words or phrases',
    category: 'Linguist',
    difficulty: 'Easy',
    points: 100,
    participants: 412,
    endDate: '01/10/2025',
    rank: 23,
    progress: 0,
    reward: 'Linguist Badge'
  }
];

const mockLeaderboard: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Levi Ackerman', location: 'Lampung', points: 1250, badges: 8 },
  { id: '2', rank: 2, name: 'Nerya Aurellia', location: 'Magelang', points: 1180, badges: 7 },
  { id: '3', rank: 3, name: 'Dinda Ackerman', location: 'Lampung', points: 1050, badges: 6 },
  { id: '4', rank: 4, name: 'Dinda Ackerman', location: 'Lampung', points: 1050, badges: 6 },
  { id: '5', rank: 5, name: 'Dinda Ackerman', location: 'Lampung', points: 1050, badges: 6 }
];

// Components
const Header: React.FC<{ title: string }> = ({ title }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <LinearGradient
      colors={['#28110A', '#4E1F00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        paddingTop: insets.top + 10,
        paddingHorizontal: 24,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text 
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '600',
          textAlign: 'center',
          fontFamily: 'Poppins-SemiBold'
        }}
      >
        {title}
      </Text>
    </LinearGradient>
  );
};

const WordOfDayCard: React.FC<{ word: WordOfDay }> = ({ word }) => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
      <View className="flex-row items-center mb-3">
        <Ionicons name="book-outline" size={20} color="#666" style={{ marginRight: 8 }} />
        <Text 
          className="text-gray-700 font-medium font-poppins"
   
        >
          Word of the Day
        </Text>
      </View>
      
      <Text 
        className="text-2xl font-bold text-center text-gray-900 mb-2 font-poppins"
      >
        {word.word}
      </Text>
      
      <View className="items-center mb-3">
        <View className="bg-amber-800 px-3 py-1 rounded-full">
          <Text 
            className="text-white text-xs font-medium font-poppins"
          >
            {word.language}
          </Text>
        </View>
      </View>
      
      <Text 
        className="text-center text-gray-600 mb-4"
        style={{ fontFamily: 'Poppins-Regular' }}
      >
        {word.definition}
      </Text>
      
      <View className="border-t border-gray-200 pt-4">
        <View className="flex-row items-center mb-2">
          <SimpleLineIcons name="volume-2" size={16} color="#666" />
          <Text 
            className="text-gray-700 font-medium ml-2 font-poppins"
          >
            Pronunciation
          </Text>
        </View>
        <Text 
          className="text-gray-600 mb-3 font-poppins"
        >
          {word.pronunciation}
        </Text>
        
        <Text 
          className="text-gray-700 font-medium mb-1 font-poppins"
        >
          Example:
        </Text>
        <Text 
          className="text-gray-600 mb-2 font-poppins"
        >
          &quot;{word.example}&quot;
        </Text>
        
        <Text 
          className="text-gray-700 font-medium mb-1 font-poppins"
        >
          Meaning:
        </Text>
        <Text 
          className="text-gray-600 font-poppins"
        >
          &quot;{word.meaning}&quot;
        </Text>
      </View>
    </View>
  );
};

const CultureQuizCard: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-lg p-6 shadow-sm">
      <Text 
        className="text-xl font-bold text-center text-gray-900 mb-6  font-poppins"
      >
        Start Culture Quiz
      </Text>
      
      <View className="items-center mb-6">
        <Text 
          className="text-4xl font-bold text-orange-400 mb-1  font-poppins"
        >
          {quiz.questions}
        </Text>
        <Text 
          className="text-gray-600 mb-4  font-poppins"
        >
          Questions
        </Text>
        
        <Text 
          className="text-3xl font-bold text-green-low  mb-1 font-poppins"
        >
          {quiz.maxPoints}
        </Text>
        <Text 
          className="text-gray-600 mb-4 font-poppins"
        >
          Maximum Points
        </Text>
        
        <View className="flex-row items-center mb-6">
          <AntDesign name="clockcircleo" size={16} color="#666" />
          <Text 
            className="text-gray-600 ml-2 font-poppins"
          >
            No Time Limit
          </Text>
        </View>
      </View>
      
      <TouchableOpacity>
        <LinearGradient
          colors={['#28110A', '#4E1F00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 12,
            borderRadius: 8,
            overflow: 'hidden'
          }}
        >
          <Text 
            className="text-white text-center font-semibold font-poppins"
          >
            Start Quiz
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const TabNavigation: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = [
    { id: 'active', label: 'Active Challenge' },
    { id: 'finished', label: 'Finished' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  return (
    <View className="flex-row mx-4 mt-4 bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-3 rounded-md ${
            activeTab === tab.id ? '' : 'bg-transparent'
          }`}
          style={activeTab === tab.id ? { backgroundColor: '#28110A' } : {}}
        >
          <Text 
            className={`text-center text-sm font-medium ${
              activeTab === tab.id ? 'text-white' : 'text-gray-600'
            }`}
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'culinary': return '#8B5CF6';
      case 'crafts': return '#06B6D4';
      case 'linguist': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <View className="bg-white mx-4 mt-4 rounded-lg shadow-sm overflow-hidden">
      {challenge.image && (
        <View className="relative">
          <Image 
            source={require('../../../assets/images/default-laga-1.png')}
            className="w-full h-32"
            resizeMode="cover"
          />
          <View className="absolute top-3 left-3 flex-row space-x-2 items-">
            <View 
              className="px-2 py-1 rounded"
              style={{ backgroundColor: getCategoryColor(challenge.category) }}
            >
              <Text 
                className="text-white text-xs font-medium font-poppins"
              >
                {challenge.category}
              </Text>
            </View>
            <View className='w-2'></View>
            <View 
              className="px-2 py-1 rounded"
              style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
            >
              <Text 
                className="text-white text-xs font-medium font-poppins"
              >
                {challenge.difficulty}
              </Text>
            </View>
          </View>
          
          <View className="absolute bottom-3 left-3 flex-row items-center bg-black bg-opacity-60 px-2 py-1 rounded">
            <MaterialIcons name="emoji-events" size={16} color="#FFD700" />
            <Text 
              className="text-white text-sm font-bold ml-1 font-poppins"
            >
              {challenge.points} Points
            </Text>
          </View>
        </View>
      )}
      
      <View className="p-4">
        <Text 
          className="text-lg font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'Poppins-Bold' }}
        >
          {challenge.title}
        </Text>
        
        <Text 
          className="text-gray-600 text-sm mb-4"
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          {challenge.description}
        </Text>
        
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Octicons name="people" size={16} color="#666" />
            <Text 
              className="text-gray-600 text-sm ml-1"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              {challenge.participants} participants
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <AntDesign name="clockcircleo" size={16} color="#666" />
            <Text 
              className="text-gray-600 text-sm ml-1"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              {challenge.endDate}
            </Text>
          </View>
        </View>
        
        {challenge.progress > 0 && (
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text 
                className="text-gray-700 font-medium font-poppins"
              >
                Progress
              </Text>
              <Text 
                className="text-gray-600 font-poppins"
              >
                {challenge.progress}%
              </Text>
            </View>
            <View className="w-full bg-gray-200 rounded-full h-2">
              <View 
                className="bg-brown-hard h-2 rounded-full"
                style={{ width: `${challenge.progress}%` }}
              />
            </View>
          </View>
        )}
        
        <View className="bg-green-low    p-3 rounded-lg mb-4">
          <View className="flex-row items-center">
            <Image 
              source={require('../../../assets/images/linguist-badge.png')}
              className="w-5 h-5 mr-2"
              resizeMode="contain"
            />
            <Text 
              className="text-black font-poppins text-sm font-bold "
            >
              Gifts:
            </Text>
          </View>
          <Text 
            className="text-brown-hard text-sm mt-1 font-poppins"
        
          >
            {challenge.reward}
          </Text>
        </View>
        
        <TouchableOpacity>
          <LinearGradient
            colors={['#28110A', '#4E1F00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              borderRadius: 8,
              overflow: 'hidden'
            }}
          >
            <Text 
              className="text-white text-center font-semibold font-poppins"
            >
              Join the Challenge
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LeaderboardCard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < mockLeaderboard.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentUsers = mockLeaderboard.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <View className="bg-white mx-4 mt-4 mb-20 rounded-lg p-4 shadow-sm">
      <Text 
        className="text-xl font-bold text-center text-gray-900 mb-6 font-poppins"
      >
        Leaderboard
      </Text>
      
      {currentUsers.map((user) => (
        <View 
          key={user.id}
          className="flex-row items-center p-3 mb-2 border border-gray-200 rounded-lg"
        >
          <View 
            className="w-8 h-8 rounded-full items-center justify-center mr-3"
            style={{ 
              backgroundColor: user.rank <= 3 ? '#FFD700' : '#EBE8E1'
            }}
          >
            <Text 
              className="font-bold text-sm font-poppins"
              style={{ 
                color: user.rank <= 3 ? '#8B5A00' : '#6B7280'
              }}
            >
              #{user.rank}
            </Text>
          </View>
          
          <View className="flex-1">
            <Text 
              className="text-gray-900 font-semibold"
              style={{ fontFamily: 'Poppins-SemiBold' }}
            >
              {user.name}
            </Text>
            <View className="flex-row items-center">
              <MaterialIcons name="location-on" size={12} color="#666" />
              <Text 
                className="text-gray-600 text-xs ml-1 font-poppins"
              >
                {user.location}
              </Text>
            </View>
          </View>
          
          <View className="items-end">
            <View className="flex-row items-center">
              <MaterialIcons name="emoji-events" size={16} color="#FFD700" />
              <Text 
                className="text-green-hard font-bold ml-1 font-poppins"
              >
                {user.points} Points
              </Text>
            </View>
            <Text 
              className="text-gray-500 text-xs font-poppins"
            >
              {user.badges} badges
            </Text>
          </View>
        </View>
      ))}
      
      <View className="flex-row items-center justify-center mt-4 ">
        <TouchableOpacity 
          onPress={handlePrevious}
          disabled={currentPage === 0}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: currentPage === 0 ? '#E5E7EB' : '#28110A' }}
        >
          <MaterialIcons 
            name="keyboard-arrow-left" 
            size={24} 
            color={currentPage === 0 ? '#9CA3AF' : 'white'} 
          />
        </TouchableOpacity>
        <View className='w-2'/>
        <TouchableOpacity 
          onPress={handleNext}
          disabled={(currentPage + 1) * itemsPerPage >= mockLeaderboard.length}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: (currentPage + 1) * itemsPerPage >= mockLeaderboard.length ? '#E5E7EB' : '#28110A' }}
        >
          <MaterialIcons 
            name="keyboard-arrow-right" 
            size={24} 
            color={(currentPage + 1) * itemsPerPage >= mockLeaderboard.length ? '#9CA3AF' : 'white'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LagaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    switch (activeTab) {
      case 'active':
        return (
          <>
            {mockChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </>
        );
      case 'finished':
        return (
          <View className="bg-white mx-4 mt-4 mb-20 rounded-lg p-8 shadow-sm">
            <Text 
              className="text-center text-gray-500 font-poppins"
            >
              No finished challenges yet
            </Text>
          </View>
        );
      case 'leaderboard':
        return <LeaderboardCard />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-yellow-low">
      <StatusBar barStyle="light-content" />
      
      <Header title="Laga" />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <WordOfDayCard word={wordOfDay} />
        <CultureQuizCard quiz={cultureQuiz} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default LagaPage;