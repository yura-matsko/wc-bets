import React from 'react';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Stars from '@material-ui/icons/Stars';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Avatar from '@material-ui/core/Avatar';
import Dima from '../../images/dima.jpg';
import Sasha from '../../images/sasha.jpg';
import Yura from '../../images/yura.jpg';

import './styles.css';

export const mailFolderListItems = (
  <div>
    <NavLink to='/score' activeClassName="selected">
      <ListItem button>
          <ListItemIcon>
            <Stars />
          </ListItemIcon>
          <ListItemText primary="Scores" />
      </ListItem>
    </NavLink>
    <NavLink to='/dima' activeClassName="selected">
      <ListItem button>
        <Avatar className='avatar' src={Dima} alt="Dima" />
        <ListItemText primary="Dima" />
      </ListItem>
    </NavLink>
    <NavLink to='/sasha' activeClassName="selected">
      <ListItem button>
        <Avatar className='avatar' src={Sasha} alt="Sasha" />
        <ListItemText primary="Sasha" />
      </ListItem>
    </NavLink>
    <NavLink to='/yura' activeClassName="selected">
      <ListItem button>
        <Avatar className='avatar' src={Yura} alt="Yura" />
        <ListItemText primary="Yura" />
      </ListItem>
    </NavLink>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <NavLink to='/total' activeClassName="selected">
      <ListItem className='list-item' button>
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
        <ListItemText primary="Total" />
      </ListItem>
    </NavLink>
  </div>
);