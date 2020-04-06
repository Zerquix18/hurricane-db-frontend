import React, { useState } from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import SettingsModal from './SettingsModal';

const Navbar: React.FC<RouteComponentProps> = ({ history }) => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const goTo = (route: string): void => {
    history.push(route);
  };
  const toggleSettings = () => {
    setSettingsModalOpen(! settingsModalOpen);
  }

  const { location: { pathname } } = history;

  const temporaryLogo = "https://www.freepnglogos.com/uploads/hurricane-png/overnight-livestream-hurricane-irma-coverage-open-discussion-the-last-refuge-7.png";
  const logoStyle = {
    width: 20,
    height: 'auto',
    marginRight: 5,
  };

  return (
    <Menu pointing secondary>
      <Container>
        <Menu.Item active={pathname === '/'} onClick={() => { goTo('/') }}>
          <Image src={temporaryLogo} style={logoStyle} />
          Home
        </Menu.Item>
        
        <Menu.Menu position="right">
          <Menu.Item icon="cog" content="Settings" onClick={toggleSettings} />
        </Menu.Menu>

        { settingsModalOpen && (
          <SettingsModal onClose={toggleSettings} />
        )}
      </Container>
    </Menu>
  );
};

export default withRouter(Navbar);
