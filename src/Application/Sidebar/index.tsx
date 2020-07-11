import React from 'react';
import { useMode } from 'hooks';
import HurricaneSidebar from './HurricaneSidebar';
import SeasonSidebar from './SeasonSidebar';
import SearchSidebar from './SearchSidebar';

const Sidebar: React.FC = () => {
  const mode = useMode();

  let result: React.ReactNode;

  switch (mode.mode.mode) { // sorry bout this
    case 'hurricane':
      result = <HurricaneSidebar hurricaneMode={mode.mode} />;
      break;

    case 'season':
      result = <SeasonSidebar seasonMode={mode.mode} />;
      break;

    case 'search':
      result = <SearchSidebar searchMode={mode.mode} />;
      break; 
    
    default:
      result = <div>Unsupported mode</div>
  }

  return (
    <div style={{ maxHeight: '90vh', overflowY: 'scroll', overflowX: 'hidden', paddingRight: 5 }}>
      { result }
    </div>
  )
};

export default Sidebar;
