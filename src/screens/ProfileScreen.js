import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
 return (
   <View style={styles.container}>
     <Text style={styles.title}>Profile Screen</Text>
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
   backgroundColor: '#f5fcff',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 20,
 },
});

export default ProfileScreen;