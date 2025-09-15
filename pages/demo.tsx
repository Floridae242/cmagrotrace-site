import { useState } from 'react';
import Link from 'next/link';
import { useDemoData } from '../lib/useDemoData';
import RoleSelector from '../components/RoleSelector';
import Section from '../components/Section';
import QRCode from '../components/QRCode';
import { TH_PROVINCES } from '../lib/constants';
import { SAMPLE_LOT } from '../lib/sampleLot';

import StepIndicator from '../components/StepIndicator';
import DemoNotice from '../components/DemoNotice';

export default function DemoPage() {
  const demo = useDemoData();
  const [currentStep, setCurrentStep] = useState(1);
  const [newLotData, setNewLotData] = useState({ farmerName: '', province: '' });
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const handleCreateLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLotData.farmerName && newLotData.province) {
      const lotId = demo.createLot(newLotData.farmerName, newLotData.province);
      setNewLotData({ farmerName: '', province: '' });
      setSelectedLot(lotId);
      setCurrentStep(2); // Move to Add Events step
    }
  };

  const handleAddEvent = (lotId: string, type: string, data: Record<string, any>) => {
    demo.addEvent(lotId, type, data);
  };

  return (
    <div className="py-8">
      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">Interactive Demo</h1>
            <p className="text-gray-600">
              Experience how CM-AgroTrace works by creating a sample lot and tracking its journey.
            </p>
          </div>

          <DemoNotice />
          <StepIndicator currentStep={currentStep} />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Your Role</h2>
            <RoleSelector value={demo.role} onChange={demo.setRole} />

          {demo.role === 'FARMER' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Create New Lot</h2>
              <form onSubmit={handleCreateLot} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium" htmlFor="farmerName">
                    Farmer Name
                  </label>
                  <input
                    id="farmerName"
                    type="text"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    value={newLotData.farmerName}
                    onChange={e => setNewLotData(prev => ({ ...prev, farmerName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium" htmlFor="province">
                    Province
                  </label>
                  <select
                    id="province"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    value={newLotData.province}
                    onChange={e => setNewLotData(prev => ({ ...prev, province: e.target.value }))}
                    required
                  >
                    <option value="">Select Province</option>
                    {TH_PROVINCES.map(province => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Create Lot
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Lots</h2>
              <button
                onClick={demo.reset}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg"
              >
                Reset Demo Data
              </button>
            </div>
            
            {demo.lots.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No lots created yet.</p>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      const lotId = demo.createLot(SAMPLE_LOT.farmerName, SAMPLE_LOT.province);
                      SAMPLE_LOT.events.forEach(event => {
                        demo.addEvent(lotId, event.type, event.data);
                        demo.setRole(event.role);
                      });
                      setSelectedLot(lotId);
                      setCurrentStep(3);
                    }}
                    className="btn btn-primary"
                  >
                    Create Sample Lot
                  </button>
                  <button
                    onClick={() => {
                      demo.setRole('FARMER');
                      setCurrentStep(1);
                    }}
                    className="btn btn-ghost"
                  >
                    Create Empty Lot
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {demo.lots.map(lot => (
                  <div
                    key={lot.id}
                    className={`p-4 rounded-lg border ${
                      selectedLot === lot.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Lot {lot.id}</h3>
                        <p className="text-sm text-gray-600">
                          Farmer: {lot.farmer.name} ({lot.farmer.province})
                        </p>
                        <p className="text-sm text-gray-600">
                          Created: {new Date(lot.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedLot(selectedLot === lot.id ? null : lot.id)}
                        className="text-blue-600"
                      >
                        {selectedLot === lot.id ? 'Close' : 'View/Edit'}
                      </button>
                    </div>
                    
                    {selectedLot === lot.id && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Events</h4>
                          {lot.events.length === 0 ? (
                            <p className="text-gray-500 italic">No events yet.</p>
                          ) : (
                            <div className="space-y-2">
                              {lot.events.map(event => (
                                <div
                                  key={event.id}
                                  className="text-sm bg-white p-2 rounded border"
                                >
                                  <div className="font-medium">
                                    {event.type} by {event.actor.role}
                                  </div>
                                  <div className="text-gray-600">
                                    {new Date(event.timestamp).toLocaleString()}
                                  </div>
                                  <pre className="mt-1 text-xs bg-gray-50 p-1 rounded">
                                    {JSON.stringify(event.data, null, 2)}
                                  </pre>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Add Event</h4>
                          <div className="space-y-2">
                            {demo.role === 'FARMER' && (
                              <>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'HARVEST', {
                                      date: new Date().toISOString(),
                                      field: 'แปลง A',
                                      quantity: '100 kg',
                                      brix: '18'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded"
                                >
                                  🌾 บันทึกการเก็บเกี่ยว
                                </button>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'WATER', {
                                      date: new Date().toISOString(),
                                      type: 'รดน้ำ',
                                      amount: '200L'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded"
                                >
                                  💧 บันทึกการให้น้ำ
                                </button>
                              </>
                            )}
                            
                            {demo.role === 'TRANSPORT' && (
                              <>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'PICKUP', {
                                      date: new Date().toISOString(),
                                      location: 'สวนลำไย',
                                      vehicle: 'ชม-1234',
                                      temperature: '25°C'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded"
                                >
                                  🚛 บันทึกการรับสินค้า
                                </button>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'DELIVERY', {
                                      date: new Date().toISOString(),
                                      location: 'โรงคัด A',
                                      temperature: '4°C'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded"
                                >
                                  📦 บันทึกการส่งมอบ
                                </button>
                              </>
                            )}

                            {demo.role === 'PACKHOUSE' && (
                              <>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'GRADE', {
                                      date: new Date().toISOString(),
                                      grade: 'AA',
                                      quantity: '95 kg',
                                      brix: '18.5'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-yellow-50 hover:bg-yellow-100 rounded"
                                >
                                  ⭐️ บันทึกการคัดเกรด
                                </button>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'PACK', {
                                      date: new Date().toISOString(),
                                      boxes: 10,
                                      type: 'Export Grade'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-yellow-50 hover:bg-yellow-100 rounded"
                                >
                                  📦 บันทึกการบรรจุ
                                </button>
                              </>
                            )}

                            {demo.role === 'AUDITOR' && (
                              <>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'INSPECT', {
                                      date: new Date().toISOString(),
                                      result: 'PASS',
                                      notes: 'ผ่านมาตรฐานทุกด้าน'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded"
                                >
                                  ✅ บันทึกการตรวจสอบ
                                </button>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'CERTIFY', {
                                      date: new Date().toISOString(),
                                      certificate: 'GAP-2025',
                                      validUntil: '2026-09-15'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded"
                                >
                                  📜 ออกใบรับรอง
                                </button>
                              </>
                            )}

                            {demo.role === 'BUYER' && (
                              <>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'PURCHASE', {
                                      date: new Date().toISOString(),
                                      quantity: '90 kg',
                                      price: '45,000 THB'
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-red-50 hover:bg-red-100 rounded"
                                >
                                  💰 บันทึกการซื้อ
                                </button>
                                <button
                                  onClick={() => {
                                    handleAddEvent(lot.id, 'RETAIL', {
                                      date: new Date().toISOString(),
                                      location: 'ตลาดค้าส่งเชียงใหม่',
                                      units: 180
                                    });
                                    setCurrentStep(3);
                                  }}
                                  className="block w-full text-left px-3 py-2 bg-red-50 hover:bg-red-100 rounded"
                                >
                                  🏪 บันทึกการส่งขาย
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-4">Scan QR Code or Share Public Link</h4>
                          <div className="bg-white p-4 rounded-lg border grid sm:grid-cols-2 gap-4 items-center">
                            <QRCode lotId={lot.id} />
                            <div>
                              <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code with your phone camera or share the public link to view the lot's timeline.
                              </p>
                              <Link 
                                href={`/scan/${lot.id}`}
                                className="btn btn-primary"
                                onClick={() => setCurrentStep(3)}
                              >
                                Open Public Page →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}