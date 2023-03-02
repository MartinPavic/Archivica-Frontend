import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

import style from './style.module.scss';

const ProfileHeader = () => {
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 40,
        height: 40,
    }));

    return (
        <div className={style.profileHeader}>
            <div className={style.profileHeader_start}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <SmallAvatar alt="Remy Sharp">
                            <PhotoCameraIcon sx={{ color: '#000000' }} />
                        </SmallAvatar>
                        
                    }
                >
                    <Avatar
                        alt="Remy Sharp"
                        src="/assets/images/temp/tempUser.jpg"
                        sx={{ width: 150, height: 150 }}
                    />
                </Badge>
                <h2>Klara Vučković</h2>
            </div>
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ alignSelf:'flex-end' }}>
                Edit Profile
            </Button>
        </div>
    );
};

export default ProfileHeader;