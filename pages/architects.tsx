import { Box, CircularProgress, Container, Fab } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { Close, Add } from "@mui/icons-material";
import AddPost from "../src/components/modal/addPost";
import ArchitectFeed from "../src/components/architectFeed/architectFeed";
import { useEffect, useState } from "react";
import AddArchitectFormDialog from "../src/components/addArchitectFormDialog";
import { useAuthenticatedRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import useAuth from "../src/contexts/useAuth";
import { Filter, Sort } from "../src/models/filterPageSort";
import { SnackbarWrapper } from "../src/components/snackbarWrapper";
import { Architect } from "../src/models/architect";

const Architects: NextPage = () => {
    const [open, setOpen] = useState(false);
	const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<Sort>({ property: "name", operator: "asc" });
    const [limit, setLimit] = useState<number>(10);
	const [architects, setArchitects] = useState<Architect[]>([]);
	const getArchitectsRequest = useAuthenticatedRequest({ request: apiService.getArchitects });
    useEffect(() => {
        const getArchitects = async () => {
			const response = await getArchitectsRequest.call({ filters, sort, page, limit });
			setArchitects(response ? response : []);
		}
		getArchitects();
    }, [filters, page, sort, limit]);

	const deleteArchitect = () => {};
	const updateArchitect = () => {};

    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative overflow-y-scroll">
				{getArchitectsRequest.loading && <CircularProgress />}
                <SnackbarWrapper show={!!getArchitectsRequest.error} success={false} message={getArchitectsRequest.error}>
					<ArchitectFeed architects={architects} deleteArchitect={deleteArchitect} updateArchitect={updateArchitect}/>
				</SnackbarWrapper>
            </Container>
            <Fab
                className="fixed z-90 bottom-10 right-8 bg-blue-600 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl"
                color="primary"
                aria-label="add"
                sx={{ position: "fixed" }}
                onClick={() => setOpen(!open)}
            >
                {open ? <Close /> : <Add />}
            </Fab>
			<AddArchitectFormDialog open={open} setOpen={setOpen} architects={architects} setArchitects={setArchitects}></AddArchitectFormDialog>
        </Box>
    );
};

export default Architects;
