import { useEffect, useState } from "react";
import useAuth from "../../contexts/useAuth";
import { useAuthenticatedRequest } from "../../hooks/useRequest";
import apiService from "../../services/api";
import { Box, CircularProgress, Stack } from "@mui/material";
import PostPreview from "../postPreview";
import { SnackbarWrapper } from "../snackbarWrapper";
import { Filter, Sort } from "../../models/filterPageSort";
import { Center } from "../center";

const PostFeed = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
	const [sort, setSort] = useState<Sort>({ property: "date", operator: "asc" });
	const [limit, setLimit] = useState<number>(10);
    const getPostsRequest = useAuthenticatedRequest({ request: apiService.getPosts });
    const { authData } = useAuth();
    useEffect(() => {
        if (authData) getPostsRequest.call({ filters, page, sort, limit });
    }, [filters, page, authData]);
    return (
        <SnackbarWrapper show={!!getPostsRequest.error} success={false} message={getPostsRequest.error}>
            <Stack spacing={2}>
                {getPostsRequest.loading && <CircularProgress />}
                {getPostsRequest.data &&
                    getPostsRequest.data.map((post) => (
                        <Center key={post._id} flexDirection="column">
                            <PostPreview image={post.photoPath} description={post.description} />
                        </Center>
                    ))}
            </Stack>
        </SnackbarWrapper>
    );
};

export default PostFeed;
