import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import StyleCard from '../styleCard';
import style from './style.module.scss';

const data = [
	{ title: 'Neolithic', year: '10 000 - 3000 BC', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Antique', year: '3001 BC - 500 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Dark Age', year: '501 - 1000 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
	{ title: 'Early Modern', year: '3001 BC - 500 AD', subcategories: [{ title: 'Croatian Gothic', year: '500 AD - 600 AD' }, { title: 'Hungarian Gothic', year: '500 AD - 600 AD' }] },
]

const ArchivicaTimeline = () => {
	const [ category, setCategory ] = React.useState('')

	const renderSubItems = items => items.map(item =>
		<div>
			<Typography variant="h6" component="span">
				{item.title}
			</Typography>
			<Typography>{item.year}</Typography>
		</div>
	);

	const renderItems = () => {
		return data.map(item =>
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent className={style.timeline_title} onClick={() => setCategory(item.title)}>
					<Typography variant="h5" component="span">
						{item.title}
					</Typography>
					<Typography className={category === item.title ? style.active : ''}>{item.year}</Typography>
					{category === item.title && renderSubItems(item.subcategories) }
				</TimelineContent>
			</TimelineItem>
		);
	}

	return (
		<Timeline position="alternate" className={style.timeline} >
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot>
						<Avatar sx={{ width: 90, height: 90, textAlign: 'center' }}>
							10 000 BC
						</Avatar>
					</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent />
			</TimelineItem>
			{renderItems()}
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot>
						<Avatar sx={{ width: 90, height: 90 }}>
							2022 AD
						</Avatar>
					</TimelineDot>
				</TimelineSeparator>
				<TimelineContent />
			</TimelineItem>
		</Timeline>
	);
};

export default ArchivicaTimeline;