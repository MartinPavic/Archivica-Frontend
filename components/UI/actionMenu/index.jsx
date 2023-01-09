import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArticleIcon from '@mui/icons-material/Article';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddPost from '../../modal/addPost';

import style from './style.module.scss';
import { useEffect } from 'react';

const actions = [
	{ icon: <ArticleIcon />, name: 'Add Blog' },
	{ icon: <BorderColorIcon />, name: 'Add Post' }
];

const ActionMenu = () => {
	const [showAddPOst, setShowAddPost] = React.useState(true);
	const [isDesktop, setDesktop] = React.useState(window.innerWidth > 768);

	const updateMedia = () => {
		setDesktop(window.innderWidth > 768);
	}
	
	useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

	return (
		<div>
			{ !isDesktop ? 
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
			: 
				<></>
			}


		</div>
	);
}

export default ActionMenu;