import { Content, Footer, Header, Sidebar } from './';
import React from 'react';
import {
  MdImportantDevices,
} from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from './../../utils/constants';
import {toast} from 'react-toastify';
import { withRouter } from 'react-router-dom';


class MainLayout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        userData : window.localStorage.getItem('userData') ? JSON.parse(window.localStorage.getItem('userData')) : ''
    }
    
  }
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
    if(!this.state.userData){
        this.props.history.push('/login')
    }  
    toast.success('Welome to CMS Web App!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
    });
  }

  // close sidebar when
  handleContentClick = event => {
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <div className="fluid" onClick={this.handleContentClick}>
          <Header />
          {children}
          <Footer />
          </div>
        </Content>
        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

export default withRouter (MainLayout);
