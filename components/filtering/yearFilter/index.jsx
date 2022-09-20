import React from 'react';
import Slider from '@mui/material/Slider';

import style from '../style.module.scss';

const YearFilter = props => {
    const [value, setValue] = React.useState([-200, 200]);
    const year = new Date().getFullYear();
    const minDistance = 400;
    const valuetext = value => {
        return `${value}°C`;
    };

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
    
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    return (
        <>
            <div className={style.filtering_year}>
                <span>Years&nbsp;</span>
                <span>{value[0] < 0 ? '( BC' : '( AD'}</span>
                <span>{Math.abs(value[0])}</span>
                <span>-</span>
                <span>{Math.abs(value[1])}</span>
                <span>{value[1] < 0 ? 'BC )' : 'AD )'}</span>
            </div>
            <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
                step={50}
                min={-2000}
                max={year}
                disableSwap
            />
        </>
    );
};

export default YearFilter;