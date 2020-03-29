import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  size: number;
};

const SwitchVertical = ({ size, fill = 'currentColor', ...rest }: Props) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      height={size}
      width={size}
      focusable="false"
      role="img"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>SwitchVertical icon</title>
      <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zm10-4a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
    </svg>
  );
};

export default SwitchVertical;
