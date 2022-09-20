import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import style from './style.module.scss';

import place from '../../assets/images/temp/tempPlace.jpg';

const BlogPreview = () => {

    return (
        <div className={style.blogPreview}>
            <div className={style.blogPreview_image}>
                <Image src={place} layout='intrinsic' />
            </div>
            <div className={style.blogPreview_content}>
                <h3>Why every developer should have a blog</h3>
                <span>Published 2 days ago ● 5 mins read ● 5 comments</span>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, quod? Soluta accusamus repudiandae deserunt obcaecati quidem, iste placeat voluptatum aut perspiciatis quasi quas quia, sunt a tenetur ut saepe modi.</p>
                <Link href="/blog/abc"><a className={style.blogPreview_readMore}>read more →</a></Link>
            </div>
        </div>
    );
}

export default BlogPreview;