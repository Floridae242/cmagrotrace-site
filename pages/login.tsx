import { NextPage } from 'next';
import LoginForm from '../components/LoginForm';
import SEO from '../components/SEO';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO title="Sign In" description="Sign in to your CM‑AgroTrace account" />
      <LoginForm />
    </>
  );
};

export default LoginPage;