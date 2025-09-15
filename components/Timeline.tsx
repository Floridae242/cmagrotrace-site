import { Event, MarketplaceDetails, TransportDetails } from '../lib/types';
import { useLanguage } from '../lib/useLanguage';

function formatDateTime(timestamp: string) {
  return new Date(timestamp).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function EventDetails({ data }: { data: Event['data'] }) {
  const { t } = useLanguage();

  const renderTransportDetails = (details: TransportDetails) => (
    <div className="mt-2 text-sm text-gray-600">
      <div>{t('timeline.carrier')}: {details.carrier === 'OTHER' ? details.customCarrierName : details.carrier}</div>
      <div>{t('timeline.tracking')}: {details.trackingNumber}</div>
      <div>{t('timeline.route')}: {details.origin} → {details.destination}</div>
      {details.estimatedDelivery && (
        <div>{t('timeline.eta')}: {formatDateTime(details.estimatedDelivery)}</div>
      )}
      {(details.temperature || details.humidity) && (
        <div className="mt-1">
          {details.temperature && `${t('timeline.temp')}: ${details.temperature}°C `}
          {details.humidity && `${t('timeline.humidity')}: ${details.humidity}%`}
        </div>
      )}
    </div>
  );

  const renderMarketplaceDetails = (details: MarketplaceDetails) => (
    <div className="mt-2 text-sm text-gray-600">
      <div>{t('timeline.platform')}: {details.platform === 'OTHER' ? details.customPlatformName : details.platform}</div>
      <div>{t('timeline.orderId')}: {details.orderId}</div>
      {details.orderUrl && (
        <a href={details.orderUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
          {t('timeline.viewListing')}
        </a>
      )}
    </div>
  );

  return (
    <div>
      {data.location && <div className="text-gray-600">{data.location}</div>}
      {data.transport && renderTransportDetails(data.transport)}
      {data.buyer?.marketplace && renderMarketplaceDetails(data.buyer.marketplace)}
      {data.notes && <div className="mt-2 text-sm italic text-gray-500">{data.notes}</div>}
    </div>
  );
}

export default function Timeline({ events }: { events: Event[] }) {
  const { t } = useLanguage();

  return (
    <ol className="relative border-s border-neutral-200 pl-6 space-y-6">
      {events.map((event, idx) => (
        <li key={event.id} className="relative">
          <div className="absolute w-3 h-3 bg-emerald-600 rounded-full -start-[1.6rem] mt-1.5"></div>
          <time className="text-sm text-gray-500">{formatDateTime(event.timestamp)}</time>
          <div className="mt-1">
            <h4 className="font-medium flex items-center gap-2">
              {t(`events.${event.type}`)}
              <span className="text-sm font-normal text-gray-500">
                {event.actor.name}
              </span>
            </h4>
            <EventDetails data={event.data} />
          </div>
        </li>
      ))}
    </ol>
  );
}
