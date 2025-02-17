// screens/FareGuideScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FareGuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fareGuide}>
        <Text style={styles.fareGuideTitle}>อัตราค่าโดยสาร</Text>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>0 - 1 กม.</Text>
          <Text style={styles.fareValue}>35 บาท</Text>
        </View>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>1 - 10 กม.</Text>
          <Text style={styles.fareValue}>+5.50 บาท/กม.</Text>
        </View>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>11 - 20 กม.</Text>
          <Text style={styles.fareValue}>+6.50 บาท/กม.</Text>
        </View>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>21 - 40 กม.</Text>
          <Text style={styles.fareValue}>+7.50 บาท/กม.</Text>
        </View>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>41 - 60 กม.</Text>
          <Text style={styles.fareValue}>+8.00 บาท/กม.</Text>
        </View>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>61 - 80 กม.</Text>
          <Text style={styles.fareValue}>+9.00 บาท/กม.</Text>
        </View>
        
        <View style={styles.fareRow}>
          <Text style={styles.fareText}>มากกว่า 80 กม.</Text>
          <Text style={styles.fareValue}>+10.50 บาท/กม.</Text>
        </View>

        <View style={styles.waitingFare}>
          <Text style={styles.fareText}>ค่าเวลารถติด</Text>
          <Text style={styles.fareValue}>2 บาท/นาที</Text>
        </View>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.additionalInfoTitle}>ข้อมูลเพิ่มเติม</Text>
        <Text style={styles.additionalInfoText}>• ค่าโดยสารเริ่มต้น 35 บาท</Text>
        <Text style={styles.additionalInfoText}>• ค่าโดยสารขั้นต่ำ 35 บาท</Text>
        <Text style={styles.additionalInfoText}>• ค่าบริการพิเศษจากสนามบิน 50 บาท</Text>
        <Text style={styles.additionalInfoText}>• ค่าจอดรอ 2 บาทต่อนาที</Text>
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
  fareGuide: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fareGuideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fareText: {
    fontSize: 16,
    color: '#34495e',
  },
  fareValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  waitingFare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 2,
    borderTopColor: '#4CAF50',
  },
  additionalInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  additionalInfoText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    paddingLeft: 8,
  },
});

export default FareGuideScreen;