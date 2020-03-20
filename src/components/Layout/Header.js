import Avatar from './../../components/Avatar';
import { UserCard } from './../../components/Card';
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MdClearAll,
  MdExitToApp,
  MdPersonPin,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from './../../utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpenUserCardPopover: false,
      userData: JSON.parse(window.localStorage.getItem('userData'))
    }
  }
  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };
  processLogout = () => {
    window.localStorage.removeItem('userData')
    this.props.history.push('/login')
  };
  myprofile = () => {
    this.props.history.push('/myprofile/'+this.state.userData.data.id)
  };
  render() {
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.userData ? this.state.userData.data.name : ''}
                  subtitle={this.state.userData ? this.state.userData.data.email : ''}
                  text="Administrator"
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" onClick={this.myprofile} action className="border-light">
                      <MdPersonPin /> Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={this.processLogout}  action className="border-light">
                      <MdExitToApp /> Logout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter (Header);
