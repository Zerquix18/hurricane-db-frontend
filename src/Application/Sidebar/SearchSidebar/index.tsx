import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { Tab } from 'semantic-ui-react';
import { AppModeSearch } from 'models';

interface SearchSidebarProps {
  searchMode: AppModeSearch;
};

const SearchSidebar: React.FC<SearchSidebarProps> = ({ searchMode }) => {
  const panes = [
    { menuItem: 'Search', render: () => <SearchForm searchMode={searchMode} /> },
    { menuItem: 'Results', render: () => <SearchResults searchMode={searchMode} /> },
  ];
  
  return <Tab panes={panes} />;
};

export default SearchSidebar;
