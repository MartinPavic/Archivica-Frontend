import { useEffect, useState } from "react";
import useAuth from "../../contexts/useAuth";
import { useAuthenticatedRequest } from "../../hooks/useRequest";
import apiService from "../../services/api";
import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import ArchitectPreview from "../postPreview";
import { SnackbarWrapper } from "../snackbarWrapper";
import { Filter, Sort } from "../../models/filterPageSort";
import { Center } from "../center";
import { Delete, Edit } from "@mui/icons-material";
const ArchitectFeed = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<Sort>({ property: "name", operator: "asc" });
    const [limit, setLimit] = useState<number>(10);

    const getArchitectsRequest = useAuthenticatedRequest({ request: apiService.getArchitects });

    const { authData } = useAuth();
    useEffect(() => {
        if (authData) getArchitectsRequest.call({ filters, page, sort, limit });
    }, [filters, page, sort, limit, authData]);
    return (
        <SnackbarWrapper show={!!getArchitectsRequest.error} success={false} message={getArchitectsRequest.error}>
            <List className="relative top-16">
                {getArchitectsRequest.loading && <CircularProgress />}
                {getArchitectsRequest.data &&
                    getArchitectsRequest.data.map((architect) => (
                        <Center key={architect._id} flexDirection="column">
                            <ListItem
                                className="justify-between"
                                sx={{
                                    width: "300px",
                                    background: "rgba(255, 255, 255, 0.7)",
                                    boxShadow: "2px 3px 3px rgba(0, 0, 0, 0.1)",
									marginBottom: "8px"
                                }}
                            >
                                <ListItemText primary={`${architect.firstName} ${architect.lastName}`} />

                                <div className="flex flex-row">
                                    <ListItemButton sx={{ padding: 0 }}>
                                        {/* <ListItemIcon> */}
                                        <Edit></Edit>
                                        {/* </ListItemIcon> */}
                                    </ListItemButton>
                                    <ListItemButton sx={{ padding: 0 }}>
                                        {/* <ListItemIcon> */}
                                        <Delete color="error"></Delete>
                                        {/* </ListItemIcon> */}
                                    </ListItemButton>
                                </div>
                            </ListItem>
                        </Center>
                    ))}
            </List>
        </SnackbarWrapper>
    );
};

export default ArchitectFeed;
