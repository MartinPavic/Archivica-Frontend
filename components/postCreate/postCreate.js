import React from 'react';
import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { GoComment } from 'react-icons/go';
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import user from '../../assets/images/temp/tempUser.jpg'
import place from '../../assets/images/temp/tempPlace.jpg'
import PostDetails from '../postDetails';

import style from './style.module.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PostAdd, VideoCall } from '@mui/icons-material';

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '##65676B',
        darker: '#053e85',
      }
    },
  });


const PostCreate = props => {

    return (
        <div className={style.postAdd}>
            <div className={style.postAdd_header}>
                <div className={style.postAdd_header_user}>
                    <Avatar alt="Remy Sharp" src='../../assets/images/temp/tempUser.jpg'/>
                    <input style={{marginLeft: 10}} placeholder="Start a post" disabled />
                </div>
            </div>
            <div style={{ padding: '0 30px' }}>
                <div className={style.postAdd_stats}>
                    <ThemeProvider theme={theme}>
                        <Button color='primary' startIcon={<PostAdd/>}> Post </Button>
                        <Button color='primary' startIcon={<VideoCall/>}> Video </Button>
                        <Button color='primary' startIcon={<PostAdd/>}> Article </Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default PostCreate;