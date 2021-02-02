import { useState } from 'react';

import { iconBtnClass } from '../utils';
import IcoLocation from './icons/IcoLocation';
import IcoMinus from './icons/IcoMinus';
import IcoPlus from './icons/IcoPlus';
import MyToolTip from './MyToolTip';

interface MyMapControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomLevel: number;
}

const MyMapControls = ({ zoomIn, zoomOut, zoomLevel }: MyMapControlsProps) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <div
      className="flex flex-col absolute top-2 left-2 md:top-auto md:left-auto md:bottom-7 md:right-4"
      style={{ zIndex: 999 }}
    >
      <button aria-label="your location" className={`${iconBtnClass} rounded-md mb-2 relative group`}>
        <IcoLocation />
        <MyToolTip text="Your Location" cls="left-10 md:-left-7.3rem" />
      </button>

      <div className="flex flex-col group zoomBtnGroup">
        <button
          onClick={zoomIn}
          aria-label="zoom in"
          disabled={zoomLevel === 18}
          className={`${iconBtnClass} rounded-t-md border-b-2 border-gray-300`}
        >
          <IcoPlus />
        </button>

        <MyToolTip
          text="Zoom"
          cls={`flex-col h-14 zoomBtnGroupTT transition-top duration-700 ease-linear left-10 md:-left-6.45rem ${
            show ? 'top-14 md:top-12.5rem lg:top-48' : 'top-14 lg:top-12'
          }`}
          styles={{ alignItems: 'flex-start' }}
        >
          <button className="underline text-blue-500" onClick={toggle}>
            Show slider
          </button>
        </MyToolTip>

        <div className={`transition-height duration-700 ease-linear ${show ? 'h-36' : 'h-0'}`} />

        <button
          onClick={zoomOut}
          aria-label="zoom out"
          disabled={zoomLevel === 0}
          className={`${iconBtnClass} rounded-b-md`}
        >
          <IcoMinus />
        </button>
      </div>
    </div>
  );
};

export default MyMapControls;
