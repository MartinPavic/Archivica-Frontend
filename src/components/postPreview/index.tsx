import React from 'react';
import Image from 'next/image'
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { GoComment } from 'react-icons/go';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import Button from '@mui/material/Button';
import PostDetails from '../postDetails';

import style from './style.module.scss';

const PostPreview = (props: any) => {
    const [ showCommentSection, setShowCommentSection ] = React.useState(false);
    const [ showPost, setShowPost ] = React.useState(false);

    return (
        <>
            {showPost && <PostDetails image='/assets/images/temp/tempPlace.jpg' onClose={() => setShowPost(!showPost)} />}
            <div className={style.postPreview}>
                <div className={style.postPreview_header}>
                    <div className={style.postPreview_header_user}>
                        <Avatar alt="Remy Sharp" src='/assets/images/temp/tempUser.jpg' sx={{ width: 46, height: 46 }} />
                        <div>
                            <h5>Klara Vučković</h5>
                            <span>Published 9 hours ago</span>
                        </div>
                    </div>
                    <IconButton
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                        onClick={() => console.log('helo')}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                {props.description && <p className={style.postPreview_description}>{props.description}</p>}
                {props.image && <div className={style.postPreview_content} onClick={() => setShowPost(!showPost)}>
                    <Image src={props.image} alt="" width={100} height={100}/>
                </div>}
                <div style={{ padding: '0 30px' }}>
                    <div className={style.postPreview_stats}>
                        <div className={style.postPreview_stats_likes}>
                            <Avatar sx={{ bgcolor: '#6fcf97', width: 28, height: 28 }}>
                                <AiFillLike fontSize={18} />
                            </Avatar>
                        </div>
                        <span>5</span>
                        <div className={style.postPreview_stats_comments}>
                            <span>4 Comments</span>
                        </div>
                    </div>
                    <Divider light />
                    <div className={style.postPreview_actions}>
                        <Button><AiOutlineLike color='#676767' fontSize={25} className={style.postPreview_actions_likeIcon} />Like</Button>
                        <Button onClick={() => setShowCommentSection(!showCommentSection)} ><GoComment color='#676767' fontSize={25} className={style.postPreview_actions_commentIcon} />Comment</Button>
                    </div>
                    {showCommentSection && <>
                        <Divider light />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                            <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}>
                                <Image src="/assets/images/temp/tempUser.jpg" alt="Friend" width={100} height={100} />
                            </Avatar>
                            <input placeholder="White a comment..." />
                        </Box>
                    </>}
                </div>
            </div>
        </>
    );
}

export default PostPreview;