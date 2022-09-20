import * as React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import style from './style.module.scss'
import Logo from '../../assets/images/logo.png';

import AccountMenu from './accountMenu';
import LoginMenu from './loginMenu';
import Navigation from './navigation';
import MobileNavigation from './mobileNavigation';

const Header = () => {
    const router = useRouter()
    const [auth, setAuth] = React.useState(false);   
    const [openSideCategories, setOpenSideCategories] = React.useState(false);

    return (
        <Box sx={{ position: 'fixed', width: '100%', zIndex: 100 }}>
            <AppBar position="static">
                <Toolbar className={style.header}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
                    >
                        <Image src={Logo} width={80} height={66} onClick={() => router.push('/')}/>
                    </Typography>
                    <div className={style.search}>
                        <div className={style.searchIconWrapper}>
                            <SearchIcon className={style.icon} sx={{ width: 20, height: 20 }}/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            className={style.inputBase}
                        />
                    </div>
                    {!auth ? <AccountMenu /> : <LoginMenu />}
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, marginRight: '-12px' }}
                        className={[style.icon, style.icon_action].join(' ')}
                        onClick={() => setOpenSideCategories(!openSideCategories)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Navigation />
            <MobileNavigation open={openSideCategories} onClick={() => setOpenSideCategories(!openSideCategories)}/>
        </Box>
    );
}

export default Header;