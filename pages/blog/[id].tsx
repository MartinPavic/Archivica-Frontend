import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import place from '../../assets/images/temp/tempPlace.jpg';
import user from '../../assets/images/temp/tempUser.jpg'

import style from '../../src/styles/Blog.module.scss';

const Blog = () => {
    return (
        <div className={style.blog}>
            <h1>Why Every Developer Should Have A Blog</h1>
            <Link href='/'></Link>
            <span className={style.blog_details}>Published 2 days ago ● 5 mins read ● 5 comments</span>
            <Image src={place} alt={''} width={100} height={100}/>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
            <h2>Code Block Example</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eius natus qui magni quisquam veritatis placeat officia iste repellendus, mollitia exercitationem quos ipsa provident, aspernatur laboriosam, hic eos quaerat et?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates eius natus qui magni quisquam veritatis placeat officia iste repellendus, mollitia exercitationem quos ipsa provident, aspernatur laboriosam, hic eos quaerat et?</p>
            <Image src={place} alt={''}/>
            <div>
                <Divider sx={{ margin: '50px 0' }}>
                    <Chip label="COMMENTS" />
                </Divider>
            </div>
            <div className={style.blog_comments}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}>
                        <Image src={user} alt="Friend" />
                    </Avatar>
                    <div className={style.blog_comments_data}>
                        <span>Klara Vučković</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit labore porro tempora eius facere, nulla quidem sit ipsum necessitatibus beatae? Maiores rerum ullam cupiditate tempora quidem sit vitae debitis tenetur.</p>
                    </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}>
                        <Image src={user} alt="Friend" />
                    </Avatar>
                    <div className={style.blog_comments_data}>
                        <span>Klara Vučković</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit labore porro tempora eius facere, nulla quidem sit ipsum necessitatibus beatae? Maiores rerum ullam cupiditate tempora quidem sit vitae debitis tenetur.</p>
                    </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}>
                        <Image src={user} alt="Friend" />
                    </Avatar>
                    <div className={style.blog_comments_data}>
                        <span>Klara Vučković</span>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Blog;