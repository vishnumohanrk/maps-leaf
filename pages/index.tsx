import dynamic from 'next/dynamic';
import NextHead from 'next/head';

const MyMap = dynamic(() => import('../components/MyMap'), { ssr: false });

const AppHome = () => (
  <>
    <NextHead>
      <title>Maps</title>
      <meta name="description" content="chumma" />
    </NextHead>
    <MyMap />
  </>
);

export default AppHome;
