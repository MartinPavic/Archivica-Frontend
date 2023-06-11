import { useEffect, useState } from "react";
import useAuth from "../../contexts/useAuth";
import { useAuthenticatedRequest } from "../../hooks/useRequest";
import apiService from "../../services/api";
import { Box, CircularProgress, Stack } from "@mui/material";
import ArchitectPreview from "../postPreview";
import { SnackbarWrapper } from "../snackbarWrapper";
import { Filter } from "../../models/filterPageSort";
import { Center } from "../center";

const ArchitectFeed = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
	const [sort, setSort] = useState<"asc" | "desc">("asc");
	const [limit, setLimit] = useState<number>(10);

	const getArchitectsRequest = useAuthenticatedRequest({ request: apiService.getArchitects });

    const { authData } = useAuth();
    useEffect(() => {
        if (authData) getArchitectsRequest.call({ filters, page, sort, limit });
    }, [filters, page, sort, limit, authData]);
    return (
        <SnackbarWrapper show={!!getArchitectsRequest.error} success={false} message={getArchitectsRequest.error}>
            <Stack className="relative top-16" spacing={2}>
                {getArchitectsRequest.loading && <CircularProgress />}
                {getArchitectsRequest.data &&
                    getArchitectsRequest.data.map((architect) => (
                        <Center key={architect._id} flexDirection="column">
                            <div>{architect.firstName} {architect.lastName}</div>
                        </Center>
                    ))}
            </Stack>
        </SnackbarWrapper>
    );
};

export default ArchitectFeed;
