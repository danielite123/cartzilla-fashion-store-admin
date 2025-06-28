import React from "react";

type ChatIconProps = {
  onClick?: () => void;
  className?: string;
};

const ChatIcon: React.FC<ChatIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.3em"
        height="1.3em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.44444 7.30626H13.5556M6.44444 10.8618H11.7778M15.3333 2.86182C16.0406 2.86182 16.7189 3.14277 17.219 3.64287C17.719 4.14296 18 4.82124 18 5.52848V12.6396C18 13.3468 17.719 14.0251 17.219 14.5252C16.7189 15.0253 16.0406 15.3063 15.3333 15.3063H10.8889L6.44444 17.9729V15.3063H4.66667C3.95942 15.3063 3.28115 15.0253 2.78105 14.5252C2.28095 14.0251 2 13.3468 2 12.6396V5.52848C2 4.82124 2.28095 4.14296 2.78105 3.64287C3.28115 3.14277 3.95942 2.86182 4.66667 2.86182H15.3333Z" />
      </svg>
    </button>
  );
};

export default ChatIcon;
