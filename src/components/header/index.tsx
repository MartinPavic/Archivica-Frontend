import * as React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import style from './style.module.scss'

import AccountMenu from './accountMenu';
import LoginMenu from './loginMenu';
import Navigation from './navigation';
import MobileNavigation from './mobileNavigation';
import { Notifications } from '@mui/icons-material';
import useAuth from '../../contexts/useAuth';

const Header = (props: any) => {
    const router = useRouter()
    const [openSideCategories, setOpenSideCategories] = React.useState(false); 
    const { user } = useAuth();

    return (
        user ? 
            (
            <Box sx={{ position: 'fixed', width: '100%', zIndex: 100 }}>
                {/* <AppBar position="static"> */}
                    {/* <Toolbar className={style.header}> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
                        />
                        <div className={style.header}>
                            <div>
                                <Image src="/assets/images/logo.png" width={100} height={60} onClick={() => router.push('/')} alt={''}/>
                            </div>
                            <div>
                                <Navigation/>
                            </div>
                            <div className={style.searchWrapper}>
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
                                <IconButton
                                    size="large"
                                >
                                    <Notifications/>
                                </IconButton>
                                {user ? <AccountMenu /> : <LoginMenu />}
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2, marginRight: '12px' }}
                                    className={[style.icon, style.icon_action].join(' ')}
                                    onClick={() => setOpenSideCategories(!openSideCategories)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                        </div>
                    {/* </Toolbar> */}
                {/* </AppBar> */}
                <MobileNavigation open={openSideCategories} onClick={() => setOpenSideCategories(!openSideCategories)}/>
            </Box>) 
        : 
        <div/>
    );
}

export default Header;