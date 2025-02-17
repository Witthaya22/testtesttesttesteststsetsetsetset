// screens/HistoryScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const API_URL = 'http://localhost:3000/api';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/history`);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถโหลดประวัติได้');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id) => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณต้องการลบรายการนี้ใช่หรือไม่?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await fetch(`${API_URL}/history/${id}`, {
                method: 'DELETE',
              });
              await fetchHistory();
            } catch (error) {
              Alert.alert('ข้อผิดพลาด', 'ไม่สามารถลบข้อมูลได้');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyHistory}>
          <Feather name="inbox" size={48} color="#666666" />
          <Text style={styles.emptyHistoryText}>ยังไม่มีประวัติการคำนวณ</Text>
        </View>
      ) : (
        history.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyContent}>
              <Text style={styles.historyDate}>
                {new Date(item.created_at).toLocaleString('th-TH')}
              </Text>
              <View style={styles.fareDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>ระยะทาง:</Text>
                  <Text style={styles.detailValue}>{item.distance} กม.</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>เวลารถติด:</Text>
                  <Text style={styles.detailValue}>{item.wait_time} นาที</Text>
                </View>
                <View style={[styles.detailRow, styles.totalFare]}>
                  <Text style={styles.totalLabel}>ค่าโดยสาร:</Text>
                  <Text style={styles.totalValue}>{item.total_fare} บาท</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteHistoryItem(item.id)}
            >
              <Feather name="trash-2" size={20} color="#ff5252" />
            </TouchableOpacity>
          </View>
        ))
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginTop: 20,
  },
  emptyHistoryText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyContent: {
    flex: 1,
    padding: 16,
  },
  historyDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  fareDetails: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 15,
    color: '#34495e',
  },
  detailValue: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '500',
  },
  totalFare: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
  },

});

export default HistoryScreen;