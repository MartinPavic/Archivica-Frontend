import React, { useState } from "react";
import Head from "next/head";
import SideFilter from "../src/components/sideFilter";
import PostPreview from "../src/components/postPreview";
import AddPost from "../src/components/modal/addPost";
import PostCreate from "../src/components/postCreate/postCreate";

import style from "../src/styles/Home.module.scss";
import { useAuthenticatedRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { Filter } from "../src/models/filter";
import { Alert, LinearProgress, Snackbar } from "@mui/material";

const Homepage = (props: any) => {
    const [filters, setFilters] = useState<Filter[]>([]);
	const [page, setPage] = useState<number>(1);
    const getPostsRequest = useAuthenticatedRequest({ request: apiService.getPosts });
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
            {/* <div className={style.left}>
                <SideFilter />
            </div> */}
            <div className={style.right}>
				<PostCreate />
				{getPostsRequest.loading && <LinearProgress />}
				{getPostsRequest.data && getPostsRequest.data.map((post) => (
					<PostPreview
						key={post._id}
						image="/assets/images/temp/tempPlace.jpg"
						description={post.description}
            		/>
				))}
				<Snackbar open={!!getPostsRequest.error} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
						{getPostsRequest.error}
					</Alert>
				</Snackbar>
                <AddPost openModal={false} />
            </div>
        </>
    );
};

export default Homepage;
