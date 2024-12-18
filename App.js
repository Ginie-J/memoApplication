import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import WriteScreen from './pages/WriteScreen';
import DetailScreen from './pages/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{title:'메모 목록'}} />
        <Stack.Screen name='Write' component={WriteScreen} options={{title:'메모 작성'}} />
        <Stack.Screen name='Detail' component={DetailScreen} options={{title:'상세보기'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}