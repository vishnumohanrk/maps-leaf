import Head from 'next/head';
import React from 'react';

const MetaHead: React.FC = () => (
  <Head>
    <title>Maps</title>
    <meta name="description" content="Maps Next" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossOrigin=""
    />
  </Head>
);

export default MetaHead;
