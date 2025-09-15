import { Lot, Event } from './types';

const demoLots: Lot[] = [
  {
    id: 'demo',
    createdAt: '2025-08-01T07:30:00Z',
    farmer: {
      name: 'สวนลำไยตัวอย่าง',
      province: 'เชียงใหม่'
    },
    events: [
      { 
        id: 'demo1',
        lotId: 'demo',
        type: 'HARVEST_CREATED',
        timestamp: '2025-08-01T07:30:00Z',
        actor: { role: 'FARMER', name: 'สวนลำไยตัวอย่าง' },
        data: { location: 'ฟาก' }
      },
      { 
        id: 'demo2',
        lotId: 'demo',
        type: 'TRANSPORTED',
        timestamp: '2025-08-01T14:10:00Z',
        actor: { role: 'TRANSPORT', name: 'ขนส่งตัวอย่าง' },
        data: { location: 'ฟาก → แม่แตง' }
      },
      { 
        id: 'demo3',
        lotId: 'demo',
        type: 'INSPECTED',
        timestamp: '2025-08-02T10:00:00Z',
        actor: { role: 'AUDITOR', name: 'ผู้ตรวจตัวอย่าง' },
        data: { location: 'โรงคัด' }
      },
      { 
        id: 'demo4',
        lotId: 'demo',
        type: 'ARRIVED_AT',
        timestamp: '2025-08-02T13:30:00Z',
        actor: { role: 'BUYER', name: 'ตลาดค้าส่งตัวอย่าง' },
        data: { location: 'ตลาดค้าส่ง' }
      },
      { 
        id: 'demo5',
        lotId: 'demo',
        type: 'SOLD',
        timestamp: '2025-08-02T15:45:00Z',
        actor: { role: 'BUYER', name: 'ร้านค้าตัวอย่าง' },
        data: {}
      }
    ]
  }
];

export function getDemoLots(): Lot[] {
  return demoLots;
}

export function getDemoLot(id: string): Lot | undefined {
  return demoLots.find(lot => lot.id === id);
}