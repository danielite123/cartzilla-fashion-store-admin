import React from "react";

type MailIconProps = {
  onClick?: () => void;
  className?: string;
};

const MailIcon: React.FC<MailIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 5.5L8.94202 7.23943C10.6572 8.25352 11.3428 8.25352 13.058 7.23943L16 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.01577 10.4756C1.08114 13.5412 1.11383 15.0739 2.24496 16.2094C3.37608 17.3448 4.95033 17.3843 8.09883 17.4634C10.0393 17.5122 11.9607 17.5122 13.9012 17.4634C17.0497 17.3843 18.6239 17.3448 19.7551 16.2094C20.8862 15.0739 20.9189 13.5412 20.9842 10.4756C21.0053 9.48994 21.0053 8.51008 20.9842 7.52439C20.9189 4.45886 20.8862 2.92609 19.7551 1.79066C18.6239 0.655231 17.0497 0.615677 13.9012 0.536569C11.9607 0.487813 10.0393 0.48781 8.09882 0.536562C4.95033 0.615664 3.37608 0.655215 2.24495 1.79065C1.11382 2.92608 1.08114 4.45885 1.01576 7.52438C0.994745 8.51007 0.994745 9.48994 1.01577 10.4756Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default MailIcon;
