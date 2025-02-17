import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const CategoriesScreen = ({ navigation }) => {
  const categories = [
    {
      id: '1',
      name: 'แฟชั่นผู้หญิง',
      image: { uri: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600' },
      items: '1.2k รายการ'
    },
    {
      id: '2',
      name: 'แฟชั่นผู้ชาย',
      image: { uri: 'https://images.pexels.com/photos/30133696/pexels-photo-30133696.jpeg?auto=compress&cs=tinysrgb&w=600' },
      items: '900 รายการ'
    },
    // Add more categories
  ];

  return (
    <FlatList
      style={styles.container}
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={() => navigation.navigate('Shop')}
        >
          <Image source={item.image} style={styles.categoryImage} />
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.itemCount}>{item.items}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryInfo: {
    padding: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemCount: {
    color: '#666',
    fontSize: 14,
  },
});

export default CategoriesScreen;