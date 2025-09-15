import { GetStaticProps, GetStaticPaths } from 'next';
import { getDemoLot, getDemoLots } from '../../lib/demoData';
import Section from '../../components/Section';
import Timeline from '../../components/Timeline';
import { Lot } from '../../lib/types';

interface ScanPageProps {
  lot: Lot | null;
}

export default function ScanPage({ lot }: ScanPageProps) {

  if (!lot) {
    return (
      <Section>
        <div className="max-w-4xl mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Lot Not Found</h1>
          <p className="text-gray-600">
            The lot you're looking for could not be found. This might be because:
          </p>
          <ul className="mt-4 text-gray-600">
            <li>The lot ID is incorrect</li>
            <li>The lot has been deleted</li>
            <li>You're using a different browser than where the lot was created</li>
          </ul>
        </div>
      </Section>
    );
  }

  return (
    <div className="py-8">
      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Lot {lot.id}
            </h1>
            <div className="bg-white p-6 rounded-lg border space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Origin</h2>
                <p className="text-gray-600">
                  Farmer: {lot.farmer.name}
                </p>
                <p className="text-gray-600">
                  Province: {lot.farmer.province}
                </p>
                <p className="text-gray-600">
                  Created: {new Date(lot.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Timeline</h2>
                <div className="mt-4">
                  <Timeline events={lot.events} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const lots = getDemoLots();
  
  const paths = lots.map((lot) => ({
    params: { lotId: lot.id }
  }));

  return {
    paths,
    fallback: false // Return 404 for any lotId not in the static paths
  };
};

export const getStaticProps: GetStaticProps<ScanPageProps> = async ({ params }) => {
  const lotId = params?.lotId as string;
  const lot = getDemoLot(lotId);

  return {
    props: {
      lot: lot || null
    }
  };
}