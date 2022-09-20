import React from 'react';
import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

const AccountMenu = () => {
    const [showMenu, setShowMenu] = React.useState(null);

    const handleCloseMenu = () => {
        setShowMenu(null);
    };

    const handleMenu = (event) => {
        setShowMenu(event.currentTarget);
    };

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ color: '#002d3d', fontWeight: 600}}
                // className={style.icon}
            >
                <Avatar alt="Remy Sharp" src='../../../assets/images/temp/tempUser.jpg' sx={{ width: 40, height: 40 }} />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={showMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(showMenu)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu}><Link href="/profile/abc"><a>Profile</a></Link></MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;