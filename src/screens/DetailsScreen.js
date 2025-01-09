import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <Text style={styles.title}>Details Screen</Text>
     <Button
       title="Go to Profile"
       onPress={() => navigation.navigate('Profile')}
       color="#841584"
     />
     <Button 
       title="Go back"
       onPress={() => navigation.goBack()}
       color="#841584"
     />
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 20,
 },
});

export default DetailsScreen;