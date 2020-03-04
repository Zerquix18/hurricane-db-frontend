import React from 'react';
import { useMode } from 'hooks';
import HurricaneSidebar from './HurricaneSidebar';

const Sidebar: React.FC = () => {
  const mode = useMode();

  switch (mode.mode.mode) { // sorry bout this
    case 'hurricane':
      return <HurricaneSidebar hurricaneMode={mode.mode} />;

    default:
      return <div>Unsupported mode</div>
  }
};

export default Sidebar;
