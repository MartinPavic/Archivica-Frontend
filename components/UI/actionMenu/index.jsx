import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArticleIcon from '@mui/icons-material/Article';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddPost from '../../modal/addPost';

import style from './style.module.scss';

const actions = [
	{ icon: <ArticleIcon />, name: 'Add Blog' },
	{ icon: <BorderColorIcon />, name: 'Add Post' }
];

const ActionMenu = () => {
	const [showAddPOst, setShowAddPost] = React.useState(true);

	return (
		<>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				icon={<NotesRoundedIcon />}
				className={style.sidebar}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={() => setShowAddPost(!showAddPOst)}
						className={style.sidebar_actions}
					/>
				))}
			</SpeedDial>
			{/* <AddPost openModal={true}/> */}
		</>
	);
}

export default ActionMenu;