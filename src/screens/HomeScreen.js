import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <Text style={styles.title}>Home Screen</Text>
     <Button
       title="Go to Details"
       onPress={() => navigation.navigate('Details')}
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
   backgroundColor: '#f5fcff',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold', 
   marginBottom: 20,
 },
});

export default HomeScreen;