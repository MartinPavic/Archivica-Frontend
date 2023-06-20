import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideFilter from "../src/components/sideFilter";
import PostPreview from "../src/components/postPreview";
import AddPost from "../src/components/modal/addPost";
import PostCreate from "../src/components/postCreate/postCreate";

import style from "../src/styles/Home.module.scss";
import { useAuthenticatedRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { Filter, Sort } from "../src/models/filterPageSort";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import AuthGuard from "../src/guards/authGuard";
import useAuth from "../src/contexts/useAuth";
import { NextPage } from "next";

const PostsPage: NextPage = (props: any) => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<Sort>({ property: "name", operator: "asc" });
    const [limit, setLimit] = useState<number>(10);
    const getPostsRequest = useAuthenticatedRequest({ request: apiService.getPosts });
	const { authData } = useAuth();
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
    };
	useEffect(() => {
		if (authData) getPostsRequest.call({ filters, page, sort, limit })
	}, [filters, page, authData]);
    return (
        
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
        
    );
};

export default PostsPage;
