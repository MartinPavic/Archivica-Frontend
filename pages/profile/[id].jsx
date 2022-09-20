import React from 'react';
import Divider from '@mui/material/Divider';

import ProfileHeader from '../../components/profile/header';
import Sidebar from '../../components/sidebar';
import PostPreview from '../../components/postPreview';
import BlogPreview from '../../components/blogPreview';

import style from '../../styles/Profile.module.scss';

const Profile = () => {
    return (
        <div className={style.profile}>
            <ProfileHeader />
            <Divider sx={{ margin: '20px 0'}}/>
            <div className={style.profile_content}>
                <Sidebar/>
                <div className={style.profile_content_right}>
                    <PostPreview image="/assets/images/temp/tempPlace.jpg" description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores.' />
                    <PostPreview description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores.'/>
                    <BlogPreview />
                    <PostPreview image="/assets/images/temp/tempPlace.jpg"/>
                    <PostPreview image="/assets/images/temp/tempPlace.jpg"/>
                </div>
            </div>
        </div>
    );
};

export default Profile;