import React, { useState } from 'react';
import { Role, Event, TransportDetails, MarketplaceDetails, BuyerDetails } from '../../lib/types';
import { useLanguage } from '../../lib/useLanguage';
import TransportForm from './TransportForm';
import MarketplaceForm from './MarketplaceForm';

interface EventFormProps {
  role: Role;
  lotId: string;
  onSubmit: (event: Omit<Event, 'id'>) => void;
  actorName: string;
}

export default function EventForm({ role, lotId, onSubmit, actorName }: EventFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    notes: '',
    location: '',
  });
  const [marketplaceData, setMarketplaceData] = useState<MarketplaceDetails | null>(null);
  const [transportData, setTransportData] = useState<TransportDetails | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();
    let eventType = '';
    let eventData: any = {
      ...formData,
    };

    switch (role) {
      case 'FARMER':
        eventType = 'HARVEST_CREATED';
        break;
      case 'TRANSPORT':
        eventType = 'TRANSPORTED';
        if (transportData) {
          eventData = {
            ...eventData,
            transport: transportData,
          };
        }
        break;
      case 'PACKHOUSE':
        eventType = 'PROCESSED';
        break;
      case 'AUDITOR':
        eventType = 'INSPECTED';
        break;
      case 'BUYER':
        eventType = marketplaceData ? 'MARKETPLACE_LISTED' : 'RECEIVED';
        if (marketplaceData) {
          eventData = {
            ...eventData,
            buyer: {
              purchaseType: 'MARKETPLACE',
              marketplace: marketplaceData,
            } as BuyerDetails,
          };
        }
        break;
    }

    const event: Omit<Event, 'id'> = {
      lotId,
      type: eventType,
      timestamp,
      actor: {
        role,
        name: actorName,
      },
      data: eventData,
    };

    onSubmit(event);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.location')}
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      {role === 'TRANSPORT' && (
        <div>
          <h4 className="text-lg font-medium mb-4">{t('forms.transport.title')}</h4>
          <TransportForm
            onSubmit={(data) => setTransportData(data)}
            initialData={transportData || undefined}
          />
        </div>
      )}

      {role === 'BUYER' && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.buyer.saleType')}
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="saleType"
                  value="direct"
                  checked={!marketplaceData}
                  onChange={() => setMarketplaceData(null)}
                  className="form-radio"
                />
                <span className="ml-2">{t('forms.buyer.directSale')}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="saleType"
                  value="marketplace"
                  checked={!!marketplaceData}
                  onChange={() => setMarketplaceData({
                    platform: 'LAZADA',
                    orderId: '',
                  })}
                  className="form-radio"
                />
                <span className="ml-2">{t('forms.buyer.marketplaceSale')}</span>
              </label>
            </div>
          </div>

          {marketplaceData && (
            <div>
              <h4 className="text-lg font-medium mb-4">{t('forms.marketplace.title')}</h4>
              <MarketplaceForm
                onSubmit={(data) => setMarketplaceData(data)}
                initialData={marketplaceData}
              />
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.notes')}
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {t('forms.submit')}
        </button>
      </div>
    </form>
  );
}