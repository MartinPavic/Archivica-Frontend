import React from 'react'
import Sidebar from '../components/sidebar';
import StyleCard from '../components/styleCard';
import ArchivicaTimeline from '../components/timeline';
// import styleImage  from 'assets/images/temp/africa_temp.png';

import homeStyle from '../styles/Home.module.scss';
import archStyle from '../styles/ArchitectStyle.module.scss';

const Architects = () => {
    return (
        <>
            <div className={homeStyle.left} style={{ alignItems:'center' }}>
				<Sidebar />
			</div>
			<div className={[homeStyle.right, archStyle.right].join(' ')}>
				<ArchivicaTimeline />
			</div>
        </>
    );
};

export default Architects;