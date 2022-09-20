import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import style from './style.module.scss';

const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemAvatar className={style.sidebar_avatar}>
                        <Avatar alt="Remy Sharp" src='../../assets/images/temp/tempUser.jpg' sx={{ width: 40, height: 40 }} />
                    </ListItemAvatar>
                    <ListItemText primary="Klara Vučković" />
                </ListItem>
                <Divider sx={{ margin: '5px 0' }}>
                    <Chip label="SHORTCUT" />
                </Divider>
                <ListItem>
                    <ListItemAvatar className={style.sidebar_avatar}>
                        <HomeIcon sx={{ width: 30, height: 30 }}/>
                    </ListItemAvatar>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar className={style.sidebar_avatar}>
                        <PostAddIcon sx={{ width: 30, height: 30 }}/>
                    </ListItemAvatar>
                    <ListItemText primary="Latest Blogs" />
                </ListItem>
            </List>
        </div>
    );
}

export default Sidebar;