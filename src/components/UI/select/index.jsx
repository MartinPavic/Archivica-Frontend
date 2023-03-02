import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import style from './style.module.scss';

const FilterSelect = props => {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const renderMenuItems = props.items.map(menuItem => <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.title}</MenuItem>);

    return (
        <FormControl className={style.select}>
            <InputLabel id="demo-simple-select-required-label">{props.title}</InputLabel>
            <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={value}
                label={props.title}
                onChange={handleChange}
                sx={{'.MuiSelect-select': { padding: '13.5px 14px' }}}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {renderMenuItems}
            </Select>
      </FormControl>
    );
};

export default FilterSelect;