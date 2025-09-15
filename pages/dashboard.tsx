import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/firebase/auth';
import Container from '../components/Container';
import SEO from '../components/SEO';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?from=/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SEO title="Dashboard" description="Your CM‑AgroTrace Dashboard" />
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-lg">Welcome, {user.email}</p>
            {/* Add your dashboard content here */}
          </div>
        </div>
      </Container>
    </>
  );
}