import { CSSProperties } from 'react';

interface MyToolTipProps {
  text: string;
  children?: React.ReactNode;
  cls?: string;
  styles?: CSSProperties;
}

const MyToolTip = ({ text, children, cls, styles }: MyToolTipProps) => (
  <div
    className={`absolute hidden group-hover:flex group-focus:flex w-max justify-center items-center inset-0 text-sm text-white bg-gray-800 select-none px-4 py-0.5 ${cls}`}
    style={{ borderRadius: '2px', ...styles }}
  >
    <span>{text}</span>
    {children}
  </div>
);

export default MyToolTip;
