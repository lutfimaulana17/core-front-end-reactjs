import sidebarBgImage from './../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from './../../components/SourceLink';
import React from 'react';
import {
    MdChromeReaderMode,
    MdDashboard,
    MdExtension,
    MdGroupWork,
    MdInsertChart,
    MdKeyboardArrowDown,
    MdViewDay,
    MdWeb,
    MdWidgets
} from 'react-icons/md';
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavItem, NavLink as BSNavLink} from 'reactstrap';
import bn from './../../utils/bemnames';

const userDataId = window.localStorage.getItem('userData') ? JSON.parse(window.localStorage.getItem('userData')).data.id : '';

const sidebarBackground = {
    backgroundImage: `url("${sidebarBgImage}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
};

const navItems = [
    {
        to: '/',
        name: 'dashboard',
        exact: true,
        Icon: MdDashboard
    }, {
        to: '/category',
        name: 'category',
        exact: true,
        Icon: MdWeb
    }, {
        to: '/article',
        name: 'article',
        exact: true,
        Icon: MdInsertChart
    }, {
        to: '/news',
        name: 'news',
        exact: true,
        Icon: MdWidgets
    }, {
        to: '/company',
        name: 'company',
        exact: true,
        Icon: MdViewDay
    }
];

const navSettings = [
    {
        to: '/myprofile/'+userDataId,
        name: 'My Profile',
        exact: true,
        Icon: MdChromeReaderMode
    }, {
        to: '/users',
        name: 'users',
        exact: false,
        Icon: MdGroupWork
    }, 
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
    state = {
        isOpenComponents: false
    };

    handleClick = name => () => {
        this.setState(prevState => {
            const isOpen = prevState[`isOpen${name}`];

            return {
                [`isOpen${name}`]: !isOpen
            };
        });
    };

    render() {
        return (
            <aside className={bem.b()} data-image={sidebarBgImage}>
                <div className={bem.e('background')} style={sidebarBackground}/>
                <div className={bem.e('content')}>
                    <Navbar>
                        <SourceLink className="navbar-brand d-flex">
                            <span className="text-white">
                                CMS WEB APP
                            </span>
                        </SourceLink>
                    </Navbar>
                    <Nav vertical="vertical">
                        {
                            navItems.map(({
                                to,
                                name,
                                exact,
                                Icon
                            }, index) => (
                                <NavItem key={index} className={bem.e('nav-item')}>
                                    <BSNavLink
                                        id={`navItem-${name}-${index}`}
                                        className="text-uppercase"
                                        tag={NavLink}
                                        to={to}
                                        activeClassName="active"
                                        exact={exact}>
                                        <Icon className={bem.e('nav-item-icon')}/>
                                        <span className="">{name}</span>
                                    </BSNavLink>
                                </NavItem>
                            ))
                        }

                        <NavItem className={bem.e('nav-item')} onClick={this.handleClick('Components')}>
                            <BSNavLink className={bem.e('nav-item-collapse')}>
                                <div className="d-flex">
                                    <MdExtension className={bem.e('nav-item-icon')}/>
                                    <span className=" align-self-start">Setting</span>
                                </div>
                                <MdKeyboardArrowDown
                                    className={bem.e('nav-item-icon')}
                                    style={{
                                        padding: 0,
                                        transform: this.state.isOpenComponents
                                            ? 'rotate(0deg)'
                                            : 'rotate(-90deg)',
                                        transitionDuration: '0.3s',
                                        transitionProperty: 'transform'
                                    }}/>
                            </BSNavLink>
                        </NavItem>
                        <Collapse isOpen={this.state.isOpenComponents}>
                            {
                                navSettings.map(({
                                    to,
                                    name,
                                    exact,
                                    Icon
                                }, index) => (
                                    <NavItem key={index} className={bem.e('nav-item')}>
                                        <BSNavLink
                                            id={`navItem-${name}-${index}`}
                                            className="text-uppercase"
                                            tag={NavLink}
                                            to={to}
                                            activeClassName="active"
                                            exact={exact}>
                                            <Icon className={bem.e('nav-item-icon')}/>
                                            <span className="">{name}</span>
                                        </BSNavLink>
                                    </NavItem>
                                ))
                            }
                        </Collapse>
                    </Nav>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
