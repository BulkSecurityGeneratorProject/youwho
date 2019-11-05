import './header.scss';
import React from 'react';
import { Image, List, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface ISideBarProps {
  toggleSidebar(): void;
}

export default (props: ISideBarProps) => (
  <List className="sidebar-list">
    <List.Item>
      <Menu text compact style={{ marginLeft: '20px', background: 'transparent', borderStyle: 'none' }}>
        <Menu.Item>
          <Image src="/content/images/instagram-white.svg" inline />
        </Menu.Item>
        <Menu.Item>
          <Image src="/content/images/facebook-white.svg" inline />
        </Menu.Item>
        <Menu.Item>
          <Image src="/content/images/twitter-white.svg" inline />
        </Menu.Item>
        <Menu.Item onClick={props.toggleSidebar}>
          <Image src="/content/images/close.svg" inline />
        </Menu.Item>
      </Menu>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/project">
      Το έργο
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/students">
      Μαθητές
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/college-students">
      Φοιτητές
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/young-adults">
      Νέοι 17-29
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/project-team">
      Ομάδα Έργου
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/news">
      Νέα
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/contact">
      Επικοινωνία
    </List.Item>
    <List.Item className="sidebar-collaboration">Μια συνεργασία των</List.Item>
    <List.Item>
      <Image src="/content/images/ekke white.png" style={{ marginLeft: '60px' }} />
      <Image src="/content/images/Athena_RC_Vertical.svg" />
    </List.Item>
  </List>
);
