import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { GoComment } from 'react-icons/go';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import Button from '@mui/material/Button';
import style from './style.module.scss';
import Image from 'next/image';

const PostDetails = (props: any) => {
    const [ showCommentSection, setShowCommentSection ] = React.useState(false);
    const [ showDetails, setShowDetails ] = React.useState(true);

    return (
        <div className={style.postDetails}>
            <i onClick={props.onClose} />
            <Image className={style.postDetails_image} src={props.image} alt="" onClick={() => setShowDetails(!showDetails)} />
            <div className={[style.postDetails_content, showDetails ? style.active : ''].join(' ')}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quia natus aut, odit esse hic rem. Illo ducimus animi, quos beatae reiciendis at, rerum velit voluptate aperiam, nihil repellat sunt?</p>
                <div>
                    <div className={style.postDetails_stats}>
                        <div className={style.postDetails_stats_likes}>
                            <Avatar sx={{ bgcolor: '#6fcf97', width: 28, height: 28 }}>
                                <AiFillLike fontSize={18} />
                            </Avatar>
                        </div>
                        <span>5</span>
                    </div>
                    <Divider style={{ borderColor: 'rgb(255 255 255 / 24%)' }} />
                    <div className={style.postDetails_actions}>
                        <Button><AiOutlineLike color='#676767' fontSize={25} className={style.postDetails_actions_likeIcon} />Like</Button>
                        <Button onClick={() => setShowCommentSection(!showCommentSection)} ><GoComment color='#676767' fontSize={25} className={style.postDetails_actions_commentIcon} />Comment</Button>
                    </div>
                    {showCommentSection && <>
                        <Divider light />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                            <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}>
                                <Image src={props.image} alt="" width={100} height={100} />
                            </Avatar>
                            <input placeholder="White a comment..." />
                        </Box>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;