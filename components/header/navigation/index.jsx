import React from 'react';
import { useRouter } from 'next/router'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';

import style from './style.module.scss';

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
                width: 500
            }}>
                <BottomNavigationAction label="Architects" value="architects" icon={<ArchitectureIcon />} />
                <BottomNavigationAction label="Styles" value="architectural_styles" icon={<SquareFootIcon />} />
                <BottomNavigationAction label="Cities" value="cities" icon={<BusinessIcon />} />
                <BottomNavigationAction label="Countries" value="countries" icon={<PublicIcon />} />
                <BottomNavigationAction label="Periods" value="periods" icon={<DateRangeIcon />} />
                {/* <BottomNavigationAction label="Unsorted" value="unsorted" icon={<CategoryIcon />} /> */}
            </BottomNavigation>
        </div>
    );
}

export default Navigation;