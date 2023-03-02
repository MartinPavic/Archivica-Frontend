import React from 'react';
import { useRouter } from 'next/router'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BusinessIcon from '@mui/icons-material/Business';
import DateRangeIcon from '@mui/icons-material/DateRange';

import style from './style.module.scss';
import { Home } from '@mui/icons-material';

const Navigation = () => {
    const router = useRouter();
    const [value, setValue] = React.useState(router.asPath.replace(/\//g, "") || null);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      router.push(`/${newValue}`);
    };

    return (
        
        <div className={style.navigation_wrapper}>
            <BottomNavigation value={value} showLabels onChange={handleChange} className={style.navigation} sx={{
                '& .Mui-selected': {
                    color: '#012B3D !important',
                    borderBottom: '2px solid #012B3D'
                },
                '& .MuiBottomNavigationAction-label.Mui-selected': {
                    borderBottom: 'none'
                },
                width: 500,
                
            }}>
                <BottomNavigationAction label="Home" value="" icon={<Home sx={{ fontSize: 30}}/>}/>
                <BottomNavigationAction label="Architects" value="architects" icon={<ArchitectureIcon sx={{ fontSize: 30}} />} />
                <BottomNavigationAction label="Styles" value="architectural_styles" icon={<SquareFootIcon sx={{ fontSize: 30}} />} />
                <BottomNavigationAction label="Places" value="places" icon={<BusinessIcon sx={{ fontSize: 30}}/>} />
                <BottomNavigationAction label="Blogs" value="blogs" icon={<DateRangeIcon sx={{ fontSize: 30}}/>} />
            </BottomNavigation>
        </div>
    );
}

export default Navigation;