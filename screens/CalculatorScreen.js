// screens/CalculatorScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const API_URL = 'http://localhost:3000/api';

const CalculatorScreen = ({ navigation }) => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [fareDetails, setFareDetails] = useState(null);
  const [showFareGuide, setShowFareGuide] = useState(false);

  const calculateFare = async () => {
    const parsedDistance = parseFloat(distance);
    const parsedTime = parseFloat(time);

    if (isNaN(parsedDistance) || isNaN(parsedTime) || parsedDistance < 0 || parsedTime < 0) {
      alert('กรุณากรอกระยะทางและเวลาที่ถูกต้อง');
      return;
    }

    const baseFare = 35;
    let distanceFare = 0;

    if (parsedDistance > 0 && parsedDistance <= 1) {
      distanceFare = 0;
    } else if (parsedDistance <= 10) {
      distanceFare = (parsedDistance - 1) * 5.5;
    } else if (parsedDistance <= 20) {
      distanceFare = (10 - 1) * 5.5 + (parsedDistance - 10) * 6.5;
    } else if (parsedDistance <= 40) {
      distanceFare = (10 - 1) * 5.5 + (20 - 10) * 6.5 + (parsedDistance - 20) * 7.5;
    } else if (parsedDistance <= 60) {
      distanceFare = (10 - 1) * 5.5 + (20 - 10) * 6.5 + (40 - 20) * 7.5 + (parsedDistance - 40) * 8;
    } else {
      distanceFare = (10 - 1) * 5.5 + (20 - 10) * 6.5 + (40 - 20) * 7.5 + (60 - 40) * 8 + (parsedDistance - 60) * 9;
    }

    const waitingFare = parsedTime * 2;
    const totalFare = baseFare + distanceFare + waitingFare;

    try {
      setLoading(true);
      await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          distance: parsedDistance,
          waitTime: parsedTime,
          totalFare: totalFare.toFixed(2),
          baseFare,
          distanceFare,
          waitingFare
        }),
      });

      setFareDetails({
        totalFare: totalFare.toFixed(2),
        baseFare,
        distanceFare: distanceFare.toFixed(2),
        waitingFare: waitingFare.toFixed(2)
      });

    } catch (error) {
      alert('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.fareGuideButton}
        onPress={() => setShowFareGuide(!showFareGuide)}
      >
        <Text style={styles.fareGuideButtonText}>
          {showFareGuide ? 'ซ่อนอัตราค่าโดยสาร' : 'ดูอัตราค่าโดยสาร'}
        </Text>
        <Feather 
          name={showFareGuide ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#ffffff" 
        />
      </TouchableOpacity>

      {showFareGuide && (
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
          <View style={styles.waitingFare}>
            <Text style={styles.fareText}>ค่าเวลารถติด</Text>
            <Text style={styles.fareValue}>2 บาท/นาที</Text>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ระยะทาง (กิโลเมตร)</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกระยะทาง"
          keyboardType="numeric"
          value={distance}
          onChangeText={setDistance}
        />

        <Text style={styles.inputLabel}>เวลารถติด (นาที)</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกเวลารถติด"
          keyboardType="numeric"
          value={time}
          onChangeText={setTime}
        />

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateFare}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>คำนวณค่าโดยสาร</Text>
          )}
        </TouchableOpacity>
      </View>

      {fareDetails && (
        <View style={styles.fareBreakdown}>
          <Text style={styles.breakdownTitle}>รายละเอียดค่าโดยสาร</Text>
          <Text style={styles.breakdownText}>ค่าโดยสารเริ่มต้น: {fareDetails.baseFare} บาท</Text>
          <Text style={styles.breakdownText}>ค่าระยะทาง: {fareDetails.distanceFare} บาท</Text>
          <Text style={styles.breakdownText}>ค่าเวลารถติด: {fareDetails.waitingFare} บาท</Text>
          <Text style={styles.breakdownTotal}>รวมทั้งสิ้น: {fareDetails.totalFare} บาท</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  fareGuideButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fareGuideButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
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
    fontSize: 18,
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
    fontSize: 15,
    color: '#34495e',
  },
  fareValue: {
    fontSize: 15,
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
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  fareBreakdown: {
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  breakdownText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
  },
  breakdownTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#4CAF50',
    paddingTop: 8,
  },
});

export default CalculatorScreen;