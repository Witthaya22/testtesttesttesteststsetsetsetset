import React, { Component } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, ActivityIndicator, Animated
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';

const API_URL = 'http://localhost:3000/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: 'คำนวณ',
      distance: '',
      time: '',
      fare: null,
      baseFare: null,
      distanceFare: null,
      waitingFare: null,
      history: [],
      loading: false,
      fadeAnim: new Animated.Value(0),
      scaleAnim: new Animated.Value(0.9),
      selectedDate: null // เพิ่ม state สำหรับ date filter
    };
  }

  componentDidMount() {
    this.fetchHistory();
    Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(this.state.scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true
      })
    ]).start();
  }

  fetchHistory = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch(`${API_URL}/history`);
      const result = await response.json();
      // เพิ่มการตรวจสอบว่าข้อมูลอยู่ใน result.data
      this.setState({ history: result.data || [] });
    } catch (error) {
      alert('ไม่สามารถโหลดประวัติได้');
      this.setState({ history: [] }); // กำหนดค่าเริ่มต้นเป็นอาร์เรย์ว่าง
    } finally {
      this.setState({ loading: false });
    }
  };

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.gradientHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.appName}>คำนวณค่าโดยสารแท็กซี่</Text>
            <Text style={styles.appSubtitle}>คำนวณค่าโดยสารอย่างแม่นยำ</Text>
          </View>
        </View>
      </View>
    );
  }

  renderNavigation() {
    const screens = ['คำนวณ', 'ประวัติ', 'เกี่ยวกับ', 'ติดต่อ'];
    return (
      <View style={styles.navigationWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.navigationScroll}
        >
          <View style={styles.navigationContainer}>
            {screens.map((screen) => (
              <TouchableOpacity
                key={screen}
                style={[
                  styles.navButton,
                  this.state.currentScreen === screen && styles.navButtonActive
                ]}
                onPress={() => this.setState({ currentScreen: screen })}
              >
                <View style={styles.navButtonInner}>
                  {/* Add icons based on screen */}
                  <Text style={[
                    styles.navButtonText,
                    this.state.currentScreen === screen && styles.navButtonTextActive
                  ]}>
                    {screen}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderAbout() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.aboutContainer}>
          <View style={styles.aboutHeader}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <Text style={styles.aboutTitle}>Taxi Meter</Text>
            <Text style={styles.appVersion}>เวอร์ชัน 1.0.0</Text>
          </View>
          
          <View style={styles.aboutContent}>
            <Text style={styles.aboutDescription}>
              แอพพลิเคชันคำนวณค่าโดยสารแท็กซี่อย่างแม่นยำ ตามมาตรฐานกรมการขนส่งทางบก 
              ช่วยให้คุณประเมินค่าใช้จ่ายได้ล่วงหน้าและบันทึกประวัติการเดินทาง
            </Text>
            
            <View style={styles.featureList}>
              <Text style={styles.featureTitle}>คุณสมบัติเด่น</Text>
              {[
                'คำนวณค่าโดยสารตามระยะทางและเวลาอย่างแม่นยำ',
                'แสดงรายละเอียดค่าใช้จ่ายแบบครบถ้วน',
                'บันทึกและดูประวัติการเดินทาง',
                'ใช้งานง่าย สะดวก รวดเร็ว'
              ].map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderContact() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>ติดต่อเรา</Text>
          
          {[
            {
              icon: '✉️',
              label: 'อีเมล',
              value: 'support@taximeter.com',
              color: '#4CAF50',
              action: 'mailto:support@taximeter.com'
            },
            {
              icon: '📞',
              label: 'เบอร์โทรศัพท์',
              value: '012-345-6789',
              color: '#2196F3',
              action: 'tel:+66123456789'
            },
            {
              icon: '💬',
              label: 'Line Official',
              value: '@taximeter',
              color: '#00B900',
              action: 'https://line.me/ti/p/@taximeter'
            }
          ].map((contact, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.contactCard}
              onPress={() => Linking.openURL(contact.action)}
            >
              <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                <Text style={styles.contactIconText}>{contact.icon}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{contact.label}</Text>
                <Text style={styles.contactValue}>{contact.value}</Text>
              </View>
            </TouchableOpacity>
          ))}
  
          <View style={styles.officeContainer}>
            <Text style={styles.officeTitle}>ที่ตั้งสำนักงาน</Text>
            <Text style={styles.officeAddress}>
              อาคารทดสอบ ชั้น 1{'\n'}
              ถนนพระราม 9 แขวงห้วยขวาง{'\n'}
              เขตห้วยขวาง กรุงเทพฯ 10310
            </Text>
            <View style={styles.officeHoursContainer}>
              <View style={styles.officeHoursIcon}>
                <Text>🕒</Text>
              </View>
              <View style={styles.officeHoursContent}>
                <Text style={styles.officeHoursTitle}>เวลาทำการ</Text>
                <Text style={styles.officeHoursText}>จันทร์ - ศุกร์: 9:00 - 18:00 น.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderCalculator() {
    const { distance, time, fare, loading } = this.state;
    return (
      <View style={styles.screenContainer}>
        {/* แสดงอัตราค่าโดยสารในการ์ดเดียว */}
        <View style={styles.fareGuideCard}>
          <Text style={styles.fareGuideTitle}>อัตราค่าโดยสาร</Text>
          
          <View style={styles.fareSection}>
            <Text style={styles.fareSectionTitle}>ค่าโดยสารเริ่มต้น</Text>
            <View style={styles.fareRow}>
              <Text style={styles.fareText}>0 - 1 กม.</Text>
              <Text style={styles.fareValue}>35 บาท</Text>
            </View>
          </View>
  
          <View style={styles.fareSection}>
            <Text style={styles.fareSectionTitle}>ค่าโดยสารตามระยะทาง</Text>
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
              <Text style={styles.fareText}> 80 กม.</Text>
              <Text style={styles.fareValue}>+10.50 บาท/กม.</Text>
            </View>
          </View>
  
          <View style={styles.fareSection}>
            <Text style={styles.fareSectionTitle}>ค่าเวลารถติด</Text>
            <View style={styles.fareRow}>
              <Text style={styles.fareText}>ทุกนาที</Text>
              <Text style={styles.fareValue}>2 บาท/นาที</Text>
            </View>
          </View>
        </View>
  
        {/* ส่วนการคำนวณ */}
        <View style={styles.calculatorCard}>
          <Text style={styles.calculatorTitle}>คำนวณค่าโดยสาร</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ระยะทาง (กิโลเมตร)</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกระยะทาง"
              keyboardType="numeric"
              value={distance}
              onChangeText={(text) => this.setState({ distance: text })}
            />
          </View>
  
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>เวลารถติด (นาที)</Text>
            <TextInput
              style={styles.input}
              placeholder="กรอกเวลารถติด"
              keyboardType="numeric"
              value={time}
              onChangeText={(text) => this.setState({ time: text })}
            />
          </View>
  
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={this.calculateFare}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>คำนวณค่าโดยสาร</Text>
            )}
          </TouchableOpacity>
        </View>
  
        {fare && (
  <View style={styles.resultCard}>
    <Text style={styles.resultTitle}>รายละเอียดค่าโดยสาร</Text>
    {this.state.fareBreakdown.map((item, index) => (
      <View key={index} style={styles.resultRow}>
        <Text style={styles.resultLabel}>
          {item.range} 
          {item.distance && ` (${item.distance.toFixed(1)} กม. × ${item.rate} บาท)`}:
        </Text>
        <Text style={styles.resultValue}>{item.fare.toFixed(2)} บาท</Text>
      </View>
    ))}
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>ค่าเวลารถติด ({time} นาที × 2 บาท):</Text>
      <Text style={styles.resultValue}>{this.state.waitingFare.toFixed(2)} บาท</Text>
    </View>
    <View style={[styles.resultRow, styles.resultTotal]}>
      <Text style={styles.totalLabel}>รวมทั้งสิ้น:</Text>
      <Text style={styles.totalValue}>{fare} บาท</Text>
    </View>
  </View>
)}
      </View>
    );
  }

  renderFareGuide() {
    return (
      <View style={styles.screenContainer}>
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
            <Text style={styles.fareText}> 80 กม.</Text>
            <Text style={styles.fareValue}>+10.50 บาท/กม.</Text>
          </View>
          <View style={styles.waitingFare}>
            <Text style={styles.fareText}>ค่าเวลารถติด</Text>
            <Text style={styles.fareValue}>2 บาท/นาที</Text>
          </View>
        </View>
      </View>
    );
  }
  renderHistory() {
    const { history, loading, selectedDate } = this.state;
    const historyArray = Array.isArray(history) ? history : [];
  
    const filteredHistory = selectedDate
      ? historyArray.filter(item => {
          const itemDate = new Date(item.created_at).toLocaleDateString('th-TH');
          const filterDate = new Date(selectedDate).toLocaleDateString('th-TH');
          return itemDate === filterDate;
        })
      : historyArray;
  
    const formatDate = (date) => {
      return new Date(date).toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <View style={styles.screenContainer}>
        <View style={styles.historySection}>
          {/* Date Filter Section */}
          <View style={[styles.dateFilterContainer, { backgroundColor: '#ffffff' }]}>
            <Text style={[styles.dateFilterLabel, { color: '#1a237e', fontSize: 18 }]}>
              ประวัติการคำนวณ
            </Text>
            <View style={styles.dateInputContainer}>
              <input
                type="date"
                style={{
                  flex: 1,
                  height: 45,
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: '8px 16px',
                  backgroundColor: '#f8f9fa',
                  fontSize: 16,
                  color: '#1a237e',
                  cursor: 'pointer',
                  border: '2px solid #e3f2fd',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    borderColor: '#2196f3',
                    boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                  }
                }}
                value={selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  this.setState({ selectedDate: date });
                }}
              />
              {selectedDate && (
                <TouchableOpacity 
                  style={[styles.clearDateButton, {
                    backgroundColor: '#ef5350',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2
                  }]}
                  onPress={() => this.setState({ selectedDate: null })}
                >
                  <Text style={[styles.clearDateButtonText, { fontWeight: '600' }]}>
                    ล้างการกรอง
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
  
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2196f3" />
              <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
            </View>
          ) : (
            <ScrollView style={styles.historyContainer}>
              {filteredHistory.length === 0 ? (
                <View style={[styles.emptyHistory, {
                  backgroundColor: '#fff',
                  padding: 32,
                  alignItems: 'center',
                  borderRadius: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2
                }]}>
                  <Text style={[styles.emptyHistoryText, { 
                    fontSize: 18,
                    color: '#455a64',
                    textAlign: 'center',
                    lineHeight: 24
                  }]}>
                    {selectedDate ? 'ไม่พบประวัติการคำนวณในวันที่เลือก' : 'ยังไม่มีประวัติการคำนวณ'}
                  </Text>
                </View>
              ) : (
                <View style={{ paddingBottom: 20 }}>
                  {filteredHistory.map((item) => (
                    <Animated.View
                      key={item.id}
                      style={[
                        styles.historyItem,
                        {
                          opacity: this.state.fadeAnim,
                          transform: [{ scale: this.state.scaleAnim }],
                          backgroundColor: '#ffffff',
                          borderRadius: 16,
                          marginBottom: 16,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                          elevation: 2,
                          overflow: 'hidden'
                        }
                      ]}
                    >
                      <View style={[styles.historyContent, { padding: 20 }]}>
                        <View style={styles.historyHeader}>
                          <Text style={[styles.historyDate, { 
                            fontSize: 15,
                            color: '#1a237e',
                            fontWeight: '600',
                            marginBottom: 12
                          }]}>
                            {formatDate(item.created_at)}
                          </Text>
                        </View>
  
                        <View style={[styles.fareBreakdown, {
                          backgroundColor: '#f5f5f5',
                          borderRadius: 12,
                          padding: 16,
                          marginBottom: 16
                        }]}>
                          <Text style={[styles.breakdownTitle, {
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: '#1a237e',
                            marginBottom: 12,
                            textAlign: 'center'
                          }]}>
                            รายละเอียดการคำนวณ
                          </Text>
  
                          <View style={styles.breakdownGrid}>
                            <View style={styles.breakdownItem}>
                              <Text style={styles.breakdownLabel}>ระยะทาง</Text>
                              <Text style={styles.breakdownValue}>{item.distance} กม.</Text>
                            </View>
                            <View style={styles.breakdownItem}>
                              <Text style={styles.breakdownLabel}>เวลารถติด</Text>
                              <Text style={styles.breakdownValue}>{item.wait_time} นาที</Text>
                            </View>
                            <View style={styles.breakdownItem}>
                              <Text style={styles.breakdownLabel}>ค่าแรกขึ้น</Text>
                              <Text style={styles.breakdownValue}>{item.base_fare} บาท</Text>
                            </View>
                            <View style={styles.breakdownItem}>
                              <Text style={styles.breakdownLabel}>ค่าระยะทาง</Text>
                              <Text style={styles.breakdownValue}>{item.distance_fare} บาท</Text>
                            </View>
                          </View>
  
                          <View style={[styles.breakdownTotal, {
                            marginTop: 16,
                            paddingTop: 16,
                            borderTopWidth: 1,
                            borderTopColor: '#e0e0e0',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }]}>
                            <Text style={{
                              fontSize: 18,
                              color: '#1a237e',
                              fontWeight: 'bold'
                            }}>รวมทั้งหมด</Text>
                            <Text style={{
                              fontSize: 24,
                              color: '#2196f3',
                              fontWeight: 'bold'
                            }}>{item.total_fare} บาท</Text>
                          </View>
                        </View>
                      </View>
  
                      <TouchableOpacity
  style={styles.deleteButton}
  onPress={() => this.deleteHistoryItem(item.id)}
  disabled={loading}
>
  <Text style={styles.deleteButtonText}>ลบรายการนี้</Text>
</TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }


  calculateFare = async () => {
    const { distance, time } = this.state;
    const Distance = parseFloat(distance);
    const parsedTime = parseFloat(time);

    if (isNaN(Distance) || isNaN(parsedTime) || Distance < 0 || parsedTime < 0) {
      alert('กรุณากรอกระยะทางและเวลาที่ถูกต้อง');
      return;
    }

    let breakdown = [];
    const baseFare = 35;
    let distanceFare = 0;
    let remainingDistance = Math.max(0, Distance - 1);

    // เก็บรายละเอียดค่าแรกขึ้น
    breakdown.push({
      range: '0-1 กม.',
      fare: baseFare,
      note: 'ค่าแรกขึ้น'
    });

    // 1-10 กม.
    if (remainingDistance > 0) {
      const dist = Math.min(remainingDistance, 9);
      const fare = dist * 5.5;
      distanceFare += fare;
      breakdown.push({
        range: '1-10 กม.',
        distance: dist,
        rate: 5.5,
        fare: fare
      });
      remainingDistance -= dist;
    }

    // 10-20 กม.
    if (remainingDistance > 0) {
      const dist = Math.min(remainingDistance, 10);
      const fare = dist * 6.5;
      distanceFare += fare;
      breakdown.push({
        range: '10-20 กม.',
        distance: dist,
        rate: 6.5,
        fare: fare
      });
      remainingDistance -= dist;
    }

    // 20-40 กม.
    if (remainingDistance > 0) {
      const dist = Math.min(remainingDistance, 20);
      const fare = dist * 7.5;
      distanceFare += fare;
      breakdown.push({
        range: '20-40 กม.',
        distance: dist,
        rate: 7.5,
        fare: fare
      });
      remainingDistance -= dist;
    }

    // 40-60 กม.
    if (remainingDistance > 0) {
      const dist = Math.min(remainingDistance, 20);
      const fare = dist * 8;
      distanceFare += fare;
      breakdown.push({
        range: '40-60 กม.',
        distance: dist,
        rate: 8,
        fare: fare
      });
      remainingDistance -= dist;
    }

    // 60-80 กม.
    if (remainingDistance > 0) {
      const dist = Math.min(remainingDistance, 20);
      const fare = dist * 9;
      distanceFare += fare;
      breakdown.push({
        range: '60-80 กม.',
        distance: dist,
        rate: 9,
        fare: fare
      });
      remainingDistance -= dist;
    }

    // มากกว่า 80 กม.
    if (remainingDistance > 0) {
      const fare = remainingDistance * 10.5;
      distanceFare += fare;
      breakdown.push({
        range: 'มากกว่า 80 กม.',
        distance: remainingDistance,
        rate: 10.5,
        fare: fare
      });
    }

    const waitingFare = parsedTime * 2;
    const totalFare = baseFare + distanceFare + waitingFare;
    const totalFareFixed = totalFare.toFixed(2);

    try {
      this.setState({ loading: true });
      await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          distance: Distance,
          waitTime: parsedTime,
          totalFare: totalFareFixed,
          baseFare: baseFare,
          distanceFare: distanceFare,
          waitingFare: waitingFare,
          breakdown: breakdown // เพิ่ม breakdown เข้าไปใน request
        }),
      });

      // อัพเดท state ด้วยข้อมูลการคำนวณทั้งหมด
      this.setState({
        fare: totalFareFixed,
        baseFare: baseFare,
        distanceFare: distanceFare,
        waitingFare: waitingFare,
        fareBreakdown: breakdown, // เพิ่ม breakdown เข้าไปใน state
        distance: '',
        time: ''
      });

      await this.fetchHistory();

    } catch (error) {
      alert('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      this.setState({ loading: false });
    }
};
deleteHistoryItem = async (id) => {
  // เพิ่ม Alert ยืนยันการลบ
  if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
    try {
      this.setState({ loading: true });
      await fetch(`${API_URL}/history/${id}`, {
        method: 'DELETE'
      });
      alert('ลบรายการเรียบร้อยแล้ว');
      await this.fetchHistory();
    } catch (error) {
      alert('ไม่สามารถลบข้อมูลได้');
    } finally {
      this.setState({ loading: false });
    }
  }
};

  renderScreen() {
    const { currentScreen } = this.state;
    return (
      <ScrollView style={styles.mainScrollView}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: this.state.fadeAnim,
              transform: [{ scale: this.state.scaleAnim }]
            }
          ]}
        >
      <View style={[styles.gradientHeader, { backgroundColor: '#4CAF50' }]}>
  <View style={{ alignItems: 'center', width: '100%', maxWidth: 400 }}>
    <img 
      src="./taxi.png" 
      style={styles.imagedw} 
      alt="Taxi icon"
    />
    <Text style={styles.appName}>คำนวณค่าโดยสาร</Text>
    <Text style={styles.appSubtitle}>คำนวณค่าโดยสารอย่างแม่นยำ</Text>
  </View>
</View>

          {this.renderNavigation()}

          {currentScreen === 'คำนวณ' && this.renderCalculator()}
          {currentScreen === 'อัตราค่าโดยสาร' && this.renderFareGuide()}
          {currentScreen === 'ประวัติ' && this.renderHistory()}
          {currentScreen === 'เกี่ยวกับ' && this.renderAbout()}
          {currentScreen === 'ติดต่อ' && this.renderContact()}
        </Animated.View>
      </ScrollView>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
        {this.renderScreen()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30, // เพิ่ม padding ด้านล่าง
  },
  historyList: {
    marginTop: 10,
  },
  fareBreakdown: {
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
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
  historyHeader: {
    marginBottom: 16,
  },
  
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#455a64',
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  breakdownItem: {
    width: '50%',
    padding: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#455a64',
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
  dateFilterContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  fareBreakdown: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  // อัพเดท styles ที่มีอยู่
  historySection: {
    flex: 1,
  },
  historyContainer: {
    flex: 1,
  },
  emptyHistory: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyHistoryText: {
    fontSize: 18,
    color: '#455a64',
    textAlign: 'center',
    lineHeight: 24,
  },
  imagedw: {
    width: 90,  // เพิ่มขนาดรูป
    height: 120,
    marginBottom: 15,
    objectFit: 'contain', // ให้รูปคงสัดส่วน
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

  dateFilterContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dateFilterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#f8f9fa',
  },
  clearDateButton: {
    backgroundColor: '#ff5252',
    borderRadius: 10,
    padding: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  clearDateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  fareText: {
    fontSize: 15,
    color: '#34495e',
  },
  fareValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  waitingFare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 2,
    borderTopColor: '#4CAF50',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  gradientHeader: {
    padding: 25,
    paddingTop: 30,
    paddingBottom: 35,
    width: '100%', // ให้กินพื้นที่เต็ม
    alignItems: 'center',
    maxWidth: 600, // จำกัดความกว้างสูงสุด
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#E8F5E9',
    textAlign: 'center',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    // padding: 16,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
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

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  resultLabel: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  dateFilterContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dateFilterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  datePickerButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
  clearDateButton: {
    backgroundColor: '#ff5252',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  clearDateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  historySection: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  historyContainer: {
    marginTop: 10,
  },
  emptyHistory: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  emptyHistoryText: {
    fontSize: 16,
    color: '#666666',
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  historyContent: {
    padding: 16,
  },
  historyDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  historyText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 4,
  },
  historyFare: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  



  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#455a64',
    textAlign: 'center', // เพิ่ม textAlign center
    whiteSpace: 'nowrap', // เพิ่ม whiteSpace nowrap เพื่อป้องกันการขึ้นบรรทัดใหม่
  },
  navButtonTextActive: {
    color: '#fff',
  },
  screenContainer: {
    padding: 16,
  },
  navigationScroll: {
    flexGrow: 0,
  },
  aboutContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  aboutHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 16,
    color: '#666',
  },
  aboutContent: {
    paddingHorizontal: 8,
  },
  aboutDescription: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  featureList: {
    marginTop: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#34495e',
  },
  contactContainer: {
    padding: 16,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
    textAlign: 'center',
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactIconText: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  officeContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  officeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  officeAddress: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 16,
  },
  officeHours: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  fareRatesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  fareRateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    minWidth: 200,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fareRateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  fareGuide: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  fareGuideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  fareGuideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  fareSection: {
    marginBottom: 20,
  },
  fareSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  calculatorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #F1F8E9 100%)',
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  resultValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  resultTotal: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    backgroundImage: 'radial-gradient(#43A047 20%, transparent 20%), radial-gradient(#43A047 20%, transparent 20%)',
    backgroundSize: '10px 10px',
    backgroundPosition: '0 0, 5px 5px',
  },
  mainScrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    backgroundImage: 'linear-gradient(45deg, #E8F5E9 25%, transparent 25%, transparent 75%, #E8F5E9 75%, #E8F5E9), linear-gradient(45deg, #E8F5E9 25%, transparent 25%, transparent 75%, #E8F5E9 75%, #E8F5E9)',
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 30px 30px',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  fareBreakdown: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  breakdownTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#4CAF50',
    fontWeight: 'bold',
  },
  summaryRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#2E7D32',
    backgroundImage: 'linear-gradient(135deg, #2E7D32 0%, #43A047 100%)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center', // จัดให้อยู่ตรงกลาง
  },

  headerContent: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
  },

  // Navigation Styles
  navigationWrapper: {
    position: 'relative',
    zIndex: 2,
    marginTop: -25,
  },
  navigationContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    justifyContent: 'space-between', // เปลี่ยนเป็น space-between
    width: '100%', // เพิ่ม width 100%
    maxWidth: 500, // จำกัดความกว้างสูงสุด
    alignSelf: 'center', // จัดให้อยู่กลาง
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80, // เพิ่ม minWidth เพื่อให้ปุ่มมีขนาดเท่ากัน
  },
  navButtonActive: {
    backgroundColor: '#43A047',
    backgroundImage: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
  },
  
  navButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navButtonTextActive: {
    color: '#ffffff',
  },

  // Calculator Styles
  calculatorContainer: {
    padding: 16,
  },
  fareGuideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  fareSection: {
    marginBottom: 24,
  },
  fareSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e3f2fd',
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  fareText: {
    fontSize: 16,
    color: '#455a64',
  },

  // Input Section Styles
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#455a64',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#81C784',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#2E7D32',
    marginBottom: 20,
  },
  // // calculateButton: {
  // //   ...calculateButton,
  // //   ':hover': {
  // //     transform: 'translateY(-2px)',
  // //     boxShadow: '0 4px 8px rgba(27, 94, 32, 0.3)',
  // //   },
  // // },
  // // input: {
  // //   ...input,
  // //   ':focus': {
  // //     borderColor: '#43A047',
  // //     boxShadow: '0 0 0 3px rgba(67, 160, 71, 0.2)',
  // //   },
  // // },
  
  // // navButton: {
  // //   ...navButton,
  // //   ':hover': {
  // //     backgroundColor: '#E8F5E9',
  // //   },
  // // },
  // cardHoverEffect: {
  //   transition: 'all 0.3s ease',
  //   ':hover': {
  //     transform: 'translateY(-2px)',
  //     boxShadow: '0 8px 16px rgba(27, 94, 32, 0.1)',
  //   },
  // },
  calculateButton: {
    backgroundColor: '#43A047',
    backgroundImage: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Result Card Styles
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    backgroundImage: 'linear-gradient(to bottom, #ffffff 0%, #F1F8E9 100%)',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  resultLabel: {
    fontSize: 16,
    color: '#455a64',
    flex: 1,
    paddingRight: 16,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
  },
  totalRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e3f2fd',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },

});

export default App;