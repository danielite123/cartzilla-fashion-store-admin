import React from "react";

type UserAvatarIconProps = {
  className?: string;
  onClick?: () => void;
};

const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M4.5 16C4.88431 15.5696 6.3608 13.1825 9.99716 13.1825C13.6335 13.1825 15.1133 15.2307 15.5 15.8095M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12.8657 7.2733C12.8657 5.74704 11.5773 4.5 10.0002 4.5C8.42326 4.5 7.13478 5.74704 7.13478 7.2733C7.13478 8.79956 8.42326 10.0466 10.0002 10.0466C11.5772 10.0466 12.8657 8.79956 12.8657 7.2733Z"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default UserAvatarIcon;
