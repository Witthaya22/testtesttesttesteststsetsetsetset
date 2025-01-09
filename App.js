import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen'; 
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen
         name="Home"
         component={HomeScreen}
         options={{
           title: 'Home',
           headerStyle: {
             backgroundColor: '#841584',
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
             fontWeight: 'bold',
           },
         }}
       />
       <Stack.Screen
         name="Details"
         component={DetailsScreen}
         options={{
           title: 'Details',
           headerStyle: {
             backgroundColor: '#841584',
           },
           headerTintColor: '#fff', 
           headerTitleStyle: {
             fontWeight: 'bold',
           },
         }}
       />
       <Stack.Screen
         name="Profile"
         component={ProfileScreen}
         options={{
           title: 'Profile',
           headerStyle: {
             backgroundColor: '#841584',
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
             fontWeight: 'bold',
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
};

export default App;