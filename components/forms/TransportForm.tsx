import React, { useState } from 'react';
import { ShippingCarrier, ShippingFormState, TransportDetails } from '../../lib/types';
import { useLanguage } from '../../lib/useLanguage';

interface TransportFormProps {
  onSubmit: (data: TransportDetails) => void;
  initialData?: Partial<TransportDetails>;
}

export default function TransportForm({ onSubmit, initialData }: TransportFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<TransportDetails>({
    carrier: initialData?.carrier || 'FLASH',
    trackingNumber: initialData?.trackingNumber || '',
    origin: initialData?.origin || '',
    destination: initialData?.destination || '',
    estimatedDelivery: initialData?.estimatedDelivery || '',
    customCarrierName: initialData?.customCarrierName || '',
    vehicleType: initialData?.vehicleType || '',
    temperature: initialData?.temperature,
    humidity: initialData?.humidity,
  });

  const carriers: { value: ShippingCarrier; label: string }[] = [
    { value: 'FLASH', label: 'Flash Express' },
    { value: 'POST_OFFICE', label: 'Thailand Post' },
    { value: 'KERRY', label: 'Kerry Express' },
    { value: 'DHL', label: 'DHL' },
    { value: 'OTHER', label: t('forms.transport.otherCarrier') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          {t('forms.transport.carrier')}
        </label>
        <select
          name="carrier"
          value={formData.carrier}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {carriers.map(carrier => (
            <option key={carrier.value} value={carrier.value}>
              {carrier.label}
            </option>
          ))}
        </select>
      </div>

      {formData.carrier === 'OTHER' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('forms.transport.customCarrierName')}
          </label>
          <input
            type="text"
            name="customCarrierName"
            value={formData.customCarrierName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.transport.trackingNumber')}
        </label>
        <input
          type="text"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('forms.transport.origin')}
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('forms.transport.destination')}
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.transport.estimatedDelivery')}
        </label>
        <input
          type="datetime-local"
          name="estimatedDelivery"
          value={formData.estimatedDelivery}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.transport.vehicleType')}
        </label>
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
          placeholder={t('forms.transport.vehicleTypePlaceholder')}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('forms.transport.temperature')} (°C)
          </label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature || ''}
            onChange={handleChange}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('forms.transport.humidity')} (%)
          </label>
          <input
            type="number"
            name="humidity"
            value={formData.humidity || ''}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
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