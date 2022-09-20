import React from 'react'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import Button from '@mui/material/Button';

import Sidebar from '../components/sidebar';
import Table from '../components/table';
import RoundSelect from '../components/UI/roundSelect'
import YearFilter from '../components/filtering/yearFilter';

import homeStyle from '../styles/Home.module.scss';
import archStyle from '../styles/Architects.module.scss';

const selectData = [
	{ title: 'Architect', items: [{ id: 1, title: 'Álvaro Siza' }, { id: 2, title: 'Antoine Predock' }, { id: 3, title: 'Ben van Berkel' }]},
	{ title: 'Style', items: [{ id: 1, title: 'Dark Age Europe' }, { id: 2, title: 'Modern Europe' }, { id: 3, title: 'Post Modern Europe' }]},
	{ title: 'Purpose', items: [{ id: 1, title: 'Military' }, { id: 2, title: 'Presidential' }, { id: 3, title: 'Sport' }]},
]

const originalData = [
	{ city: 'Vienna', style: 'Dark Age Europe', purpose: 'sport'},
	{ city: 'Kopengahen', style:'Dark Age Europe', purpose:'sport'},
	{ city: 'London', style:'Dark Age Europe', purpose:'military'},
	{ city: 'Amsterdam', style:'Dark Age Europe', purpose:'sport'}
]


const Cities = () => {
	const [ data, setData ] = React.useState(originalData);
	const [ searchValues, setSearchValues ] = React.useState({ architect: '', style: '', purpose: ''});

	const handleSelectChange = (title, value) => {
		setSearchValues({ ...searchValues, [title]: value});
	}
	
	const renderSelectOptions = selectData.map(select => 
		<RoundSelect title={select.title} items={select.items} onChange={handleSelectChange}/>
	);

	const handleApply = () => {
		const newData = originalData.filter(item => {
			if ((searchValues.style.toLocaleLowerCase() === item.style.toLocaleLowerCase() || searchValues.style === '')
				&& (searchValues.purpose.toLocaleLowerCase() === item.purpose.toLocaleLowerCase() || searchValues.purpose === '')) {
					return item;
			}
		})
		setData(newData);
	}

    return (
        <>
            <div className={homeStyle.left}>
				<Sidebar/>
			</div>
			<div className={[homeStyle.right, archStyle.right].join(' ')}>
				<div className={archStyle.right_wrapper}>
					<FilterListRoundedIcon /> Filter items
				</div>
				<div className={archStyle.right_select}>
					{renderSelectOptions}
				</div>
				<div className={archStyle.right_filter}>
					<div className={archStyle.right_filter_year}>
						<YearFilter />
					</div>
					<Button variant="contained" sx={{ borderRadius: '50px' }} onClick={() => handleApply()}>
						Apply
					</Button>
				</div>
				<Table data={data} />
			</div>
        </>
    );
};

export default Cities;