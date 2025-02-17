import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const orderHistory = [
    {
      id: '1',
      date: '2024-01-05',
      items: 3,
      total: '฿4497',
      status: 'จัดส่งแล้ว'
    },
    // Add more orders
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://khonthamngan.doe.go.th/khonthamngan/web/images/profile.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>จอห์น โด</Text>
        <Text style={styles.email}>john.doe@email.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ประวัติการสั่งซื้อ</Text>
        {orderHistory.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>{order.date}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text>จำนวนสินค้า: {order.items}</Text>
              <Text style={styles.orderTotal}>ยอดรวม: {order.total}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#FF4B5C',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderStatus: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTotal: {
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF4B5C',
    margin: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;