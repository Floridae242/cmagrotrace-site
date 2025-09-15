import SEO from '../components/SEO';
import Container from '../components/Container';

export default function Custom404() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for couldn't be found."
      />
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. 
              Please check the URL or go back to the homepage.
            </p>
            <a
              href="/"
              className="btn btn-primary inline-block"
            >
              Return Home
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}