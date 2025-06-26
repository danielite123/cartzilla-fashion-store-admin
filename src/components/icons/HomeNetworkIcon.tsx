import React from "react";

type HomeNetworkIconProps = {
  onClick?: () => void;
  className?: string;
};

const HomeNetworkIcon: React.FC<HomeNetworkIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 9.76562V19.1309L9.375 19.4434L1.25 15.3906V5.23438L9.375 1.17188L17.5 5.23438V12.5H16.25V6.64062L10 9.76562ZM9.375 2.57812L7.02148 3.75L13.0859 6.81641L15.4785 5.625L9.375 2.57812ZM8.75 17.7344V9.76562L2.5 6.64062V14.6094L8.75 17.7344ZM3.27148 5.625L9.375 8.67188L11.6992 7.51953L5.625 4.45312L3.27148 5.625ZM13.75 17.5V16.25H20V17.5H13.75ZM13.75 13.75H20V15H13.75V13.75ZM11.25 20V18.75H12.5V20H11.25ZM11.25 15V13.75H12.5V15H11.25ZM11.25 17.5V16.25H12.5V17.5H11.25ZM13.75 20V18.75H20V20H13.75Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default HomeNetworkIcon;
