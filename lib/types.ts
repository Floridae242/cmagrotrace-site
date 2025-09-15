export type Role = 'FARMER' | 'TRANSPORT' | 'PACKHOUSE' | 'AUDITOR' | 'BUYER';

// Shipping carrier types
export type ShippingCarrier = 'FLASH' | 'POST_OFFICE' | 'KERRY' | 'DHL' | 'OTHER';

// E-commerce platform types
export type MarketplacePlatform = 'LAZADA' | 'SHOPEE' | 'AMAZON' | 'OTHER';

// Shipping details interface
export interface ShippingDetails {
  carrier: ShippingCarrier;
  trackingNumber: string;
  origin: string;
  destination: string;
  estimatedDelivery?: string;
  customCarrierName?: string; // For 'OTHER' carrier
}

// Marketplace order details
export interface MarketplaceDetails {
  platform: MarketplacePlatform;
  orderId: string;
  orderUrl?: string;
  customPlatformName?: string; // For 'OTHER' platform
}

// Farmer specific details
export interface FarmerDetails {
  province: string;
  district: string;
  cultivationType: string;
  certifications?: string[];
}

// Transport specific details
export interface TransportDetails extends ShippingDetails {
  vehicleType: string;
  temperature?: number;
  humidity?: number;
}

// Packhouse specific details
export interface PackhouseDetails {
  gradeClass: string;
  packagingType: string;
  quantity: number;
  unit: string;
  temperature?: number;
  humidity?: number;
}

// Auditor specific details
export interface AuditorDetails {
  certificationType: string;
  certificationId?: string;
  validUntil?: string;
  inspectionResults: Record<string, any>;
}

// Buyer specific details
export interface BuyerDetails {
  purchaseType: 'DIRECT' | 'MARKETPLACE';
  quantity: number;
  unit: string;
  marketplace?: MarketplaceDetails;
}

export interface Event {
  id: string;
  lotId: string;
  type: string;
  timestamp: string;
  actor: {
    role: Role;
    name: string;
  };
  data: {
    location?: string;
    notes?: string;
    farmer?: FarmerDetails;
    transport?: TransportDetails;
    packhouse?: PackhouseDetails;
    auditor?: AuditorDetails;
    buyer?: BuyerDetails;
    [key: string]: any;
  };
}

export interface Lot {
  id: string;
  createdAt: string;
  farmer: {
    name: string;
    province: string;
  };
  events: Event[];
}

export interface DemoState {
  currentRole: Role;
  lots: Lot[];
}

// Form state interfaces
export interface ShippingFormState {
  carrier: ShippingCarrier;
  trackingNumber: string;
  origin: string;
  destination: string;
  estimatedDelivery?: string;
  customCarrierName?: string;
}

export interface MarketplaceFormState {
  platform: MarketplacePlatform;
  orderId: string;
  orderUrl?: string;
  customPlatformName?: string;
}