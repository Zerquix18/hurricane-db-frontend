import React from 'react';

// home come semantic doesn't have this

interface ButtonLinkProps {
  children: React.ReactNode;
  onClick: () => void;
}

// so i gotta make awful hacks like this
const ButtonLink: React.FC<ButtonLinkProps> = ({ children, onClick }) => {
  return (
    <span
      role="button"
      style={{ color: '#4183c4', cursor: 'pointer '}}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default ButtonLink;
