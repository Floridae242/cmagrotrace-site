import { NextPage } from 'next';
import SEO from '../components/SEO';
import Container from '../components/Container';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <SEO 
        title="Error"
        description={statusCode 
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'
        }
      />
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              {statusCode === 404 ? 'Page Not Found' : 'Something went wrong'}
            </h1>
            <p className="text-gray-600 mb-8">
              {statusCode === 404
                ? "We couldn't find the page you're looking for."
                : "We're sorry, but something went wrong. Please try again later."}
            </p>
            <a
              href="/"
              className="btn btn-primary inline-block"
            >
              Go back home
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;