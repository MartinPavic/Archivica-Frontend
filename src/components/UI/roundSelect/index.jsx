import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import style from './style.module.scss';

const RoundSelect = props => {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        props.onChange(props.title.toLowerCase(), event.target.value);
    };

    const renderMenuItems = props.items.map(menuItem => <MenuItem key={menuItem.title} value={menuItem.title}>{menuItem.title}</MenuItem>);

    return (
        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
            <InputLabel id="demo-select-small">{props.title}</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={value}
                label={props.title}
                onChange={handleChange}
                sx={{ borderRadius: '50px', width: '100%' }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {renderMenuItems}
            </Select>
        </FormControl>
    );
};

export default RoundSelect;