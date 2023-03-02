import React from 'react'
import Sidebar from '../src/components/sidebar';
import ArchivicaTimeline from '../src/components/timeline';
// import styleImage  from 'assets/images/temp/africa_temp.png';

import homeStyle from '../src/styles/Home.module.scss';
import archStyle from '../src/styles/ArchitectStyle.module.scss';

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