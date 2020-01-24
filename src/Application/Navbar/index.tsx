import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const Navbar: React.FC<RouteComponentProps> = ({ history }) => {
  const goTo = (route: string): void => {
    history.push(route);
  };

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
      </Container>
    </Menu>
  );
};

export default withRouter(Navbar);
