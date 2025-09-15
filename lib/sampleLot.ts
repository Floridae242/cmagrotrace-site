import { Role, Event } from '../lib/types';

export const SAMPLE_LOT = {
  farmerName: 'สวนลำไยตัวอย่าง',
  province: 'เชียงใหม่',
  events: [
    {
      type: 'HARVEST',
      role: 'FARMER' as Role,
      data: {
        date: new Date().toISOString(),
        field: 'แปลง A',
        quantity: '100 kg',
        brix: '18'
      }
    },
    {
      type: 'PICKUP',
      role: 'TRANSPORT' as Role,
      data: {
        date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        location: 'สวนลำไยตัวอย่าง',
        vehicle: 'ชม-1234',
        temperature: '25°C'
      }
    },
    {
      type: 'GRADE',
      role: 'PACKHOUSE' as Role,
      data: {
        date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        grade: 'AA',
        quantity: '95 kg',
        brix: '18.5'
      }
    },
    {
      type: 'INSPECT',
      role: 'AUDITOR' as Role,
      data: {
        date: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        result: 'PASS',
        certificate: 'GAP-2025',
        notes: 'ผ่านมาตรฐานทุกด้าน'
      }
    },
    {
      type: 'PURCHASE',
      role: 'BUYER' as Role,
      data: {
        date: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        quantity: '90 kg',
        price: '45,000 THB',
        destination: 'ตลาดค้าส่งเชียงใหม่'
      }
    }
  ]
};