import React from "react";

type DocumentIconProps = {
  onClick?: () => void;
  className?: string;
};

const DocumentIcon: React.FC<DocumentIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M6.28125 17.0625V12.8438C6.28125 12.326 6.70098 11.9062 7.21875 11.9062H13.7812C14.299 11.9062 14.7188 12.326 14.7188 12.8438V17.5312M12.8438 6.75L7.21875 6.75C6.70098 6.75 6.28125 6.33027 6.28125 5.8125L6.28125 3M17.5293 6.27927L14.7207 3.47073C14.4193 3.16933 14.0105 3 13.5843 3H4.60714C3.71953 3 3 3.71953 3 4.60714V16.3929C3 17.2805 3.71953 18 4.60714 18H16.3929C17.2805 18 18 17.2805 18 16.3929V7.41569C18 6.98945 17.8307 6.58067 17.5293 6.27927Z" />
      </svg>
    </button>
  );
};

export default DocumentIcon;
