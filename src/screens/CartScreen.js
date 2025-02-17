import React, { useState, useEffect } from 'react';
import { FaCar, FaHistory, FaPhone, FaInfoCircle, FaMapMarkerAlt, FaEnvelope, FaTrash, FaCalculator } from 'react-icons/fa';

// สำหรับเชื่อมต่อ API ในอนาคต
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';


const App = () => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [fare, setFare] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // โหลดประวัติจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedHistory = localStorage.getItem('taxiHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // บันทึกประวัติลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('taxiHistory', JSON.stringify(history));
  }, [history]);

  // ฟังก์ชันสำหรับเรียก API คำนวณค่าโดยสาร
  const calculateFareAPI = async (distance, time) => {
    try {
      setLoading(true);
      setError(null);

      // ในอนาคตสามารถเปลี่ยนเป็นเรียก API จริง
      // const response = await fetch(`${API_URL}/calculate-fare`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ distance, time })
      // });
      // const data = await response.json();
      // return data.fare;

      const baseFare = 35;
      let distanceFare = 0;
      const parsedDistance = parseFloat(distance);

      if (parsedDistance <= 1) {
        distanceFare = 0;
      } else if (parsedDistance <= 10) {
        distanceFare = (parsedDistance - 1) * 5.5;
      } else if (parsedDistance <= 20) {
        distanceFare = (9 * 5.5) + (parsedDistance - 10) * 6.5;
      } else if (parsedDistance <= 40) {
        distanceFare = (9 * 5.5) + (10 * 6.5) + (parsedDistance - 20) * 7.5;
      } else if (parsedDistance <= 60) {
        distanceFare = (9 * 5.5) + (10 * 6.5) + (20 * 7.5) + (parsedDistance - 40) * 8;
      } else if (parsedDistance <= 80) {
        distanceFare = (9 * 5.5) + (10 * 6.5) + (20 * 7.5) + (20 * 8) + (parsedDistance - 60) * 9;
      } else {
        distanceFare = (9 * 5.5) + (10 * 6.5) + (20 * 7.5) + (20 * 8) + (20 * 9) + (parsedDistance - 80) * 10.5;
      }

      const waitingFare = parseFloat(time) * 2;
      const totalFare = baseFare + distanceFare + waitingFare;
      return {
        totalFare: totalFare.toFixed(2),
        details: {
          baseFare,
          distanceFare: distanceFare.toFixed(2),
          waitingFare: waitingFare.toFixed(2)
        }
      };
    } catch (error) {
      throw new Error('ไม่สามารถคำนวณค่าโดยสารได้');
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    const parsedDistance = parseFloat(distance);
    const parsedTime = parseFloat(time);

    if (isNaN(parsedDistance) || isNaN(parsedTime) || parsedDistance < 0 || parsedTime < 0) {
      setError('กรุณากรอกข้อมูลให้ถูกต้อง');
      return;
    }

    try {
      const result = await calculateFareAPI(distance, time);
      setFare(result);
      
      setHistory(prev => [{
        distance: parsedDistance,
        time: parsedTime,
        fare: result.totalFare,
        details: result.details,
        date: new Date().toLocaleString('th-TH'),
        id: Date.now()
      }, ...prev]);

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteHistoryItem = (index) => {
    if (window.confirm('ต้องการลบรายการนี้ใช่หรือไม่?')) {
      setHistory(prev => prev.filter((_, i) => i !== index));
    }
  };

  const clearHistory = () => {
    if (window.confirm('ต้องการล้างประวัติทั้งหมดใช่หรือไม่?')) {
      setHistory([]);
      localStorage.removeItem('taxiHistory');
    }
  };

  const tabs = [
    { id: 'calculator', text: 'คำนวณ', icon: FaCalculator },
    { id: 'history', text: 'ประวัติ', icon: FaHistory },
    { id: 'contact', text: 'ติดต่อ', icon: FaPhone },
    { id: 'about', text: 'เกี่ยวกับ', icon: FaInfoCircle }
  ];

  const renderCalculator = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaCar className="text-3xl text-blue-600" />
        <h2 className="text-2xl font-bold text-center">คำนวณค่าโดยสารแท็กซี่</h2>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg space-y-2 text-sm mb-6">
        <div className="font-semibold mb-2 text-blue-800">อัตราค่าโดยสาร:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>• 0-1 กม. : 35 บาท (อัตราเริ่มต้น)</div>
          <div>• 1-10 กม. : +5.50 บาท/กม.</div>
          <div>• 11-20 กม. : +6.50 บาท/กม.</div>
          <div>• 21-40 กม. : +7.50 บาท/กม.</div>
          <div>• 41-60 กม. : +8.00 บาท/กม.</div>
          <div>• 61-80 กม. : +9.00 บาท/กม.</div>
          <div>• 80+ กม. : +10.50 บาท/กม.</div>
          <div>• ค่าเวลารถติด: 2 บาท/นาที</div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">ระยะทาง (กิโลเมตร)</label>
          <input
            type="number"
            placeholder="กรอกระยะทาง"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">เวลารถติด (นาที)</label>
          <input
            type="number"
            placeholder="กรอกเวลารถติด"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
        >
          <FaCalculator />
          {loading ? 'กำลังคำนวณ...' : 'คำนวณค่าโดยสาร'}
        </button>

        {fare && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-md space-y-2">
            <p className="text-xl font-bold text-center text-green-700">
              ค่าโดยสารทั้งหมด: {fare.totalFare} บาท
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>ค่าโดยสารเริ่มต้น: {fare.details.baseFare} บาท</p>
              <p>ค่าระยะทาง: {fare.details.distanceFare} บาท</p>
              <p>ค่าเวลารถติด: {fare.details.waitingFare} บาท</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaHistory className="text-2xl text-blue-600" />
          <h2 className="text-2xl font-bold">ประวัติการคำนวณ</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
          >
            <FaTrash />
            ล้างประวัติทั้งหมด
          </button>
        )}
      </div>

      <div className="max-h-[500px] overflow-y-auto pr-2">
        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-8">ยังไม่มีประวัติการคำนวณ</div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div 
                key={item.id || index}
                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 shadow-sm"
              >
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">ระยะทาง: {item.distance} กม.</div>
                    <div className="font-medium">เวลารถติด: {item.time} นาที</div>
                    <div className="text-lg font-bold text-blue-600">ค่าโดยสาร: {item.fare} บาท</div>
                    {item.details && (
                      <div className="text-sm text-gray-600 mt-1">
                        <div>ค่าโดยสารเริ่มต้น: {item.details.baseFare} บาท</div>
                        <div>ค่าระยะทาง: {item.details.distanceFare} บาท</div>
                        <div>ค่าเวลารถติด: {item.details.waitingFare} บาท</div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => deleteHistoryItem(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaInfoCircle className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-center">เกี่ยวกับเรา</h2>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed">
          แอปพลิเคชันนี้ช่วยคำนวณค่าโดยสารแท็กซี่ตามอัตราที่กำหนด พร้อมบันทึกประวัติการคำนวณ
          เพื่อให้คุณสามารถตรวจสอบย้อนหลังได้ ใช้งานง่าย สะดวก และแม่นยำ ด้วยการคำนวณที่รวดเร็ว
          และการจัดเก็บข้อมูลที่ปลอดภัย
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">คุณสมบัติเด่น:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>คำนวณค่าโดยสารตามระยะทางและเวลารถติด</li>
            <li>แสดงรายละเอียดค่าใช้จ่ายแบบแยกประเภท</li>
            <li>บันทึกประวัติการคำนวณอัตโนมัติ</li>
            <li>ใช้งานง่าย ไม่ซับซ้อน</li>
            <li>รองรับการทำงานบนทุกอุปกรณ์</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaCar className="text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold text-center text-gray-800">
            แอปคำนวณค่าแท็กซี่
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-4 gap-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2
                    ${activeTab === tab.id 
                      ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="text-lg" />
                  <span>{tab.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'calculator' && renderCalculator()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'contact' && renderContact()}
          {activeTab === 'about' && renderAbout()}
        </div>
      </div>
    </div>
  );
};


export default App;