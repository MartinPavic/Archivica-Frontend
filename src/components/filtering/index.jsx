import React from 'react';

import Select from '../UI/select';
import YearFilter from './yearFilter';
import style from './style.module.scss';

const selectData = [
	{ title: 'Continent', items: [{ id: 1, title: 'Africa' }, { id: 2, title: 'Asia' }, { id: 3, title: 'Europe' }]},
	{ title: 'Country', items: [{ id: 1, title: 'England' }, { id: 2, title: 'Croatia' }, { id: 3, title: 'France' }]},
	{ title: 'City', items: [{ id: 1, title: 'Vienna' }, { id: 2, title: 'London' }, { id: 3, title: 'Amsterdam' }]},
	{ title: 'Style', items: [{ id: 1, title: 'Dark Age Europe' }, { id: 2, title: 'Modern Europe' }, { id: 3, title: 'Post Modern Europe' }]},
	{ title: 'Architect', items: [{ id: 1, title: 'Alvaro Siza' }, { id: 2, title: 'Ben Van Berkel' }, { id: 3, title: 'Antonie Predock' }]},
	{ title: 'Architecture Purpose', items: [{ id: 1, title: 'Military' }, { id: 2, title: 'Presidential' }, { id: 3, title: 'Sport' }]},
]

const Filtering = props => {

    const renderSelect = selectData.map(select => <Select key={select.title} title={select.title} items={select.items} />);

    return (
        <div className={style.filtering}>
            {renderSelect}
            {/* <YearFilter /> */}
        </div>
    );
};

export default Filtering;