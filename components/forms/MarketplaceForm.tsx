import React, { useState } from 'react';
import { MarketplacePlatform, MarketplaceDetails } from '../../lib/types';
import { useLanguage } from '../../lib/useLanguage';

interface MarketplaceFormProps {
  onSubmit: (data: MarketplaceDetails) => void;
  initialData?: Partial<MarketplaceDetails>;
}

export default function MarketplaceForm({ onSubmit, initialData }: MarketplaceFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<MarketplaceDetails>({
    platform: initialData?.platform || 'LAZADA',
    orderId: initialData?.orderId || '',
    orderUrl: initialData?.orderUrl || '',
    customPlatformName: initialData?.customPlatformName || '',
  });

  const platforms: { value: MarketplacePlatform; label: string }[] = [
    { value: 'LAZADA', label: 'Lazada' },
    { value: 'SHOPEE', label: 'Shopee' },
    { value: 'AMAZON', label: 'Amazon' },
    { value: 'OTHER', label: t('forms.marketplace.otherPlatform') },
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
          {t('forms.marketplace.platform')}
        </label>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {platforms.map(platform => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </div>

      {formData.platform === 'OTHER' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('forms.marketplace.customPlatformName')}
          </label>
          <input
            type="text"
            name="customPlatformName"
            value={formData.customPlatformName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.marketplace.orderId')}
        </label>
        <input
          type="text"
          name="orderId"
          value={formData.orderId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
          placeholder={t('forms.marketplace.orderIdPlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('forms.marketplace.orderUrl')}
        </label>
        <input
          type="url"
          name="orderUrl"
          value={formData.orderUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder={t('forms.marketplace.orderUrlPlaceholder')}
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