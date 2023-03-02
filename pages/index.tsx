import React from "react";
import Head from "next/head";
import SideFilter from "../src/components/sideFilter";
import PostPreview from "../src/components/postPreview";
import BlogPreview from "../src/components/blogPreview";
import AddPost from "../src/components/modal/addPost";
import PostCreate from "../src/components/postCreate/postCreate";

import style from "../src/styles/Home.module.scss";

const Homepage = (props: any) => {
    return (
        <>
            <Head>
                <title>Arhivica</title>
                <meta name="description" content="Archivica project" />
                <link rel="icon" href="/favicon.ico" /> 
            </Head>
            <div className={style.left}>
                <SideFilter />
            </div>
            <div className={style.right}>
                <PostCreate />
                <PostPreview
                    image="/assets/images/temp/tempPlace.jpg"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores."
                />
                <PostPreview description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores." />
                <BlogPreview />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                {/* // TODO AddPost modal still in progress by Klara V. */}
                <AddPost openModal={false} />
            </div>
        </>
    );
};

export default Homepage