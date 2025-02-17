// screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AboutScreen = () => {
  const handleContactPress = (type) => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:0812345678');
        break;
      case 'email':
        Linking.openURL('mailto:contact@taximeter.com');
        break;
      case 'line':
        Linking.openURL('https://line.me/ti/p/~taximeter');
        break;
      case 'facebook':
        Linking.openURL('https://facebook.com/taximeter');
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.aboutSection}>
        <Text style={styles.title}>เกี่ยวกับแอพ</Text>
        <Text style={styles.description}>
          แอพคำนวณค่าโดยสารแท็กซี่ช่วยให้คุณสามารถคำนวณค่าโดยสารได้อย่างแม่นยำ 
          ตามอัตราที่กำหนดโดยกรมการขนส่งทางบก
        </Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.title}>ติดต่อเรา</Text>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => handleContactPress('phone')}
        >
          <Feather name="phone" size={24} color="#4CAF50" />
          <Text style={styles.contactText}>081-234-5678</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => handleContactPress('email')}
        >
          <Feather name="mail" size={24} color="#4CAF50" />
          <Text style={styles.contactText}>contact@taximeter.com</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => handleContactPress('line')}
        >
          <Feather name="message-circle" size={24} color="#4CAF50" />
          <Text style={styles.contactText}>Line: @taximeter</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => handleContactPress('facebook')}
        >
          <Feather name="facebook" size={24} color="#4CAF50" />
          <Text style={styles.contactText}>Facebook: Taxi Meter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.developerSection}>
        <Text style={styles.title}>ผู้พัฒนา</Text>
        <Text style={styles.developerText}>พัฒนาโดย: Your Name</Text>
        <Text style={styles.developerText}>เวอร์ชัน: 1.0.0</Text>
        <Text style={styles.developerText}>© 2024 Taxi Meter. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  aboutSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contactSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  developerSection: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactText: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 15,
  },
  developerText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
});

export default AboutScreen;