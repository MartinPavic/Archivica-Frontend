import React from 'react';
import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import useAuth from '../../../contexts/useAuth';

const AccountMenu = (props: any) => {
    const [showMenu, setShowMenu] = React.useState(null);
	const { logout } = useAuth();

    const handleCloseMenu = () => {
        setShowMenu(null);
    };

    const handleMenu = (event: any) => {
        setShowMenu(event.currentTarget);
    };

    const handleLogout = (event: any) => {
        setShowMenu(null);
        logout();
    }

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
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
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
                <MenuItem onClick={handleCloseMenu}><Link href="/profile/abc">Profile</Link></MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;