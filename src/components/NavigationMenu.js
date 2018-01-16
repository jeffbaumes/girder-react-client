import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavigationMenu = ({ menuItems, activeItem, history, match, userId }) => (
  <Menu stackable attached borderless size='tiny'>
    <Container>
      {
        menuItems.map(it => {
          let link = `/${it.id}`;

          // Special case: link to logged-in user for My Data nav
          if (it.id === 'my-data') {
            link = `/user/${userId}`;
          } else if (match.params.query) {
            link += `/search/${match.params.query}`;
          }

          let active = history.location.pathname.startsWith(link);

          // Special case: Users nav should not be active if My Data is active
          if (active && it.id === 'user' && history.location.pathname.startsWith(`/user/${userId}`)) {
            active = false;
          }

          return <Menu.Item key={it.id} as={Link} to={link} name={it.id} active={active} content={it.name}/>;
        })
      }
    </Container>
  </Menu>
);

export default NavigationMenu;
