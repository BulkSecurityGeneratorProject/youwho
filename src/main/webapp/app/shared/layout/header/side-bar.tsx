import './header.scss';
import React from 'react';
import { Grid, Image, List, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface ISideBarProps {
  toggleSidebar(): void;
}

export default (props: ISideBarProps) => (
  <div style={{ height: '100%' }}>
    <Menu text compact className="sidebar-menu">
      <Menu.Item className="youtube" as="a" href="https://www.youtube.com/channel/UCEfMZfe5xokl-CIPGucqBfg" target="_blank">
        <Image src="content/images/youtube-white.png" inline />
      </Menu.Item>
      <Menu.Item className="insta" as="a" href="https://www.instagram.com/youwho.gr/" target="_blank">
        <Image src="content/images/instagram-white.svg" inline />
      </Menu.Item>
      <Menu.Item className="facebook" as="a" href="https://www.facebook.com/YouWho.gr/" target="_blank">
        <Image src="content/images/facebook-white.svg" inline />
      </Menu.Item>
      <Menu.Item onClick={props.toggleSidebar}>
        <Image src="content/images/close.svg" inline />
      </Menu.Item>
    </Menu>
    <List className="sidebar-list">
      <List.Item className="sidebar-item" as={NavLink} to="/menus/project">
        <span>Το έργο</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/students">
        <span>Μαθητές</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/college-students">
        <span>Φοιτητές</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/young-adults">
        <span>Νέοι 17-29</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/results">
        <span>Αποτελέσματα</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/project-team">
        <span>Ομάδα Έργου</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/news">
        <span>Νέα</span>
      </List.Item>
      <List.Item className="sidebar-item" as={NavLink} to="/menus/contact">
        <span>Επικοινωνία</span>
      </List.Item>
    </List>
    <Grid className="sidebar-collaboration-menu" centered>
      <Grid.Row className="sidebar-collaboration" columns={1}>
        Μια συνεργασία των
      </Grid.Row>
      <Grid.Row columns={2} style={{ paddingTop: 0 }}>
        <Grid.Column>
          <Image className="ekke" src="content/images/ekke white.png" style={{ marginLeft: '25%' }} as="a" href="https://www.ekke.gr" />
        </Grid.Column>
        <Grid.Column>
          <Image className="athena" src="content/images/Athena_RC_Vertical.svg" as="a" href="https://www.athena-innovation.gr" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);
