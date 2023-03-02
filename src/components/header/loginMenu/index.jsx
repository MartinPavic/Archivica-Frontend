import React from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const LoginMenu = () => {
    const [showDetails, setShowDetails] = React.useState(null);

    const handleDetails = (event) => {
        setShowDetails(event.currentTarget);
    };

    const handleCloseDetails = () => {
        setShowDetails(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleDetails}
                style={{ color: '#002d3d', fontWeight: 600}}
            >
                <MoreIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={showDetails}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(showDetails)}
                onClose={handleCloseDetails}
            >
                <MenuItem onClick={handleCloseDetails}>
                    <Link href="/login">Login</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseDetails}>
                    <Link href="/register">Register</Link>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default LoginMenu;