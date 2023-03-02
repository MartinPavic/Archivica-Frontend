import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'


import style from './style.module.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PostAdd, VideoCall } from '@mui/icons-material';

const theme = createTheme({
    palette: {
      primary: {
        main: '##65676B',
        dark: '#053e85',
      }
    },
  });


const PostCreate = (props: any) => {

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