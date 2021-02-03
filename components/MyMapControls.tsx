import { ChangeEvent, useEffect, useState } from 'react';

import { iconBtnClass } from '../utils';
import IcoLocation from './icons/IcoLocation';
import IcoMinus from './icons/IcoMinus';
import IcoPlus from './icons/IcoPlus';
import MyToolTip from './MyToolTip';

interface MyMapControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomLevel: number;
  mapZoom: (n: number) => void;
}

const MyMapControls = ({ zoomIn, zoomOut, zoomLevel, mapZoom }: MyMapControlsProps) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(zoomLevel);

  const toggle = () => setShow(!show);

  const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.currentTarget.value);
    setValue(newVal);
    mapZoom(newVal);
  };

  useEffect(() => {
    if (zoomLevel !== value) {
      setValue(zoomLevel);
    }
  }, [zoomLevel]);

  return (
    <div
      className="flex flex-col absolute top-2 left-2 md:top-auto md:left-auto md:bottom-7 md:right-4"
      style={{ zIndex: 999 }}
    >
      <button aria-label="your location" className={`${iconBtnClass} rounded-md mb-2 relative group`}>
        <IcoLocation />
        <MyToolTip text="Your Location" cls="left-10 md:-left-7.3rem" />
      </button>

      <div className="flex flex-col group zoomBtnGroup overflow-hidden">
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
          cls={`flex-col h-14 zoomBtnGroupTT left-10 md:-left-6.45rem ${
            show ? 'top-14 md:top-11.5rem lg:top-44' : 'top-14 lg:top-12'
          }`}
          styles={{ alignItems: 'flex-start' }}
        >
          <button className="underline text-blue-500" onClick={toggle}>
            Show slider
          </button>
        </MyToolTip>

        <div className={`flex w-8 transform translate-y-12 -rotate-90 ${show ? 'h-32' : 'h-0'}`}>
          <input
            type="range"
            min={0}
            max={18}
            step={1}
            value={value}
            onChange={handleSlider}
            className={show ? 'block mt-2 lg:mt-0' : 'hidden'}
          />
        </div>

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
