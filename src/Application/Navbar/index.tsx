import React, { useState } from 'react';
import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import SettingsModal from './SettingsModal';
import SeasonModal from './SeasonModal';
import RankingModal from './RankingsModal';

interface NavbarProps extends RouteComponentProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ history, mobileSidebarOpen, setMobileSidebarOpen }) => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [seasonModalOpen, setSeasonModalOpen] = useState(false);
  const [rankingModalOpen, setRankingModalOpen] = useState(false);

  const goTo = (route: string): void => {
    history.push(route);
  };
  const toggleSettings = () => {
    setSettingsModalOpen(! settingsModalOpen);
  };
  const toggleSeasons = () => {
    setSeasonModalOpen(! seasonModalOpen);
  };
  const toggleRankings = () => {
    setRankingModalOpen(! rankingModalOpen);
  };
  const setModeSearch = () => {
    history.push('/search');
  };

  const { location: { pathname } } = history;

  const temporaryLogo = "https://www.freepnglogos.com/uploads/hurricane-png/overnight-livestream-hurricane-irma-coverage-open-discussion-the-last-refuge-7.png";
  const logoStyle = {
    width: 20,
    height: 'auto',
    marginRight: 5,
  };

  const toggleSidebar = () => {
    setMobileSidebarOpen(! mobileSidebarOpen);
  }

  return (
    <Menu pointing secondary>
      <Container>
        <Menu.Item className="mobile-only" onClick={toggleSidebar}>
          <Icon name="bars" />
        </Menu.Item>
        <Menu.Item active={pathname === '/'} onClick={() => { goTo('/') }}>
          <Image src={temporaryLogo} style={logoStyle} />
          Home
        </Menu.Item>
        <Menu.Item onClick={toggleSeasons}>
          Seasons
        </Menu.Item>
        <Menu.Item onClick={toggleRankings}>
          Rankings
        </Menu.Item>
        <Menu.Item onClick={setModeSearch}>
          Search
        </Menu.Item>
        
        <Menu.Menu position="right">
          <Menu.Item icon="cog" content="Settings" onClick={toggleSettings} />
        </Menu.Menu>

        { settingsModalOpen && (
          <SettingsModal onClose={toggleSettings} />
        )}
        { seasonModalOpen && (
          <SeasonModal onClose={toggleSeasons} />
        )}
        { rankingModalOpen && (
          <RankingModal onClose={toggleRankings} />
        )}
      </Container>
    </Menu>
  );
};

export default withRouter(Navbar);
