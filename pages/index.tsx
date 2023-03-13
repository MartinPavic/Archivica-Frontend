import React, { memo, useState } from "react";
import Head from "next/head";
import SideFilter from "../src/components/sideFilter";
import PostPreview from "../src/components/postPreview";
import BlogPreview from "../src/components/blogPreview";
import AddPost from "../src/components/modal/addPost";
import PostCreate from "../src/components/postCreate/postCreate";

import style from "../src/styles/Home.module.scss";
import useAuthenticatedRequest from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { Filter } from "../src/models/filter";
import { Alert, LinearProgress, Snackbar } from "@mui/material";

const Homepage = (props: any) => {
    const [filters, setFilters] = useState<Filter[]>([]);
	const [page, setPage] = useState<number>(1);
    const [_, posts, isLoading, error] = useAuthenticatedRequest({
        request: apiService.getPosts,
        requestData: { filters, page },
        callImmediately: true
    });
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
    };
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
				{isLoading && <LinearProgress />}
                <PostCreate />
				{posts && posts.map((post) => (
					<PostPreview
						key={post._id}
						image="/assets/images/temp/tempPlace.jpg"
						description={post.description}
            		/>
				))}
				<Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
						{error}
					</Alert>
				</Snackbar>
                {/* <PostPreview
                    image="/assets/images/temp/tempPlace.jpg"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores."
                />
                <PostPreview description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores." />
                <BlogPreview />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" />
                <PostPreview image="/assets/images/temp/tempPlace.jpg" /> */}
                {/* // TODO AddPost modal still in progress by Klara V. */}
                <AddPost openModal={false} />
            </div>
        </>
    );
};

export default Homepage;
