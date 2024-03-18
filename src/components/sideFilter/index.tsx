import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import Filtering from '../filtering';
import style from './style.module.scss';

const SideFilter = () => {
    return (
        <div className={style.sideFilter}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemAvatar className={style.sideFilter_avatar}>
                        <Avatar alt="Remy Sharp" src="/assets/images/temp/tempUser.jpg" sx={{ width: 40, height: 40 }} />
                    </ListItemAvatar>
                    <ListItemText primary="Klara Vučković" />
                </ListItem>
                <Divider sx={{ margin: '5px 0 15px' }}>
                    Groups
                </Divider>
                <Filtering />
            </List>
        </div>
    );
}

export default SideFilter;