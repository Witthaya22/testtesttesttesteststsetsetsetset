import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const ShopScreen = ({ navigation }) => {
  const products = [
    {
      id: '1',
      name: 'ชุดเดรสฤดูร้อนสุดเท่',
      price: '฿1499',
      image: { uri: 'https://images.pexels.com/photos/291738/pexels-photo-291738.jpeg?auto=compress&cs=tinysrgb&w=600' },
    },
    {
      id: '2',
      name: 'รองเท้าผ้าใบลำลอง',
      price: '฿2499',
      image: { uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' },
    },
    // เพิ่มสินค้าอื่นๆ
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>สินค้าที่แนะนำ</Text>
      </View>

      <View style={styles.productsGrid}>
        {products.map((product) => (
          <TouchableOpacity 
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product })}
          >
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  productCard: {
    width: '45%',
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 15,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#FF4B5C',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default ShopScreen;