import { Box, CircularProgress, Container, Fab } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { Close, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuthenticatedRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { Filter, Sort } from "../src/models/filterPageSort";
import { SnackbarWrapper } from "../src/components/snackbarWrapper";
import { ArchitectureStyle } from "../src/models/architectureStyle";
import { ModelList, RenderInstanceUpdateForm } from "../src/components/lists/modelList";
import ArchitectureStyleFormDialog from "../src/components/dialogs/architectureStyleFormDialog";

const ArchitectureStyles: NextPage = () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<Sort>({ property: "name", operator: "asc" });
    const [limit, setLimit] = useState<number>(10);
    const [architectureStyles, setArchitectureStyles] = useState<ArchitectureStyle[]>([]);
    const getArchitectureStylesRequest = useAuthenticatedRequest({ request: apiService.getArchitectureStyles });
    const deleteArchitectureStylesRequest = useAuthenticatedRequest({ request: apiService.deleteArchitectureStyles });
    const updateArchitectureStylesRequest = useAuthenticatedRequest({ request: apiService.putArchitectureStyles });
    const createArchitectureStylesRequest = useAuthenticatedRequest({ request: apiService.postArchitectureStyles });

    useEffect(() => {
        const getArchitectureStyles = async () => {
            const response = await getArchitectureStylesRequest.call({ filters, sort, page, limit });
            setArchitectureStyles(response ? response : []);
        };
        getArchitectureStyles();
    }, [filters, page, sort, limit]);

    const createArchitectureStyle = async (data: ArchitectureStyle) => {
        const response = await createArchitectureStylesRequest.call(data);
        if (response) setArchitectureStyles([...architectureStyles, response]);
        setOpen(false);
    };
    const deleteArchitectureStyle = async (id: string) => {
        const response = await deleteArchitectureStylesRequest.call({ id });
        if (!response) {
            return;
        }
        const index = architectureStyles.findIndex((arch) => arch._id === id);
        setArchitectureStyles([...architectureStyles.slice(0, index), ...architectureStyles.slice(index + 1)]);
    };
    const updateArchitectureStyle = async (architectureStyle: ArchitectureStyle) => {
        const response = await updateArchitectureStylesRequest.call(architectureStyle);
        if (!response) {
            return;
        }
        const index = architectureStyles.findIndex((as) => as._id === architectureStyle._id);
        setArchitectureStyles([
            ...architectureStyles.slice(0, index),
            response,
            ...architectureStyles.slice(index + 1),
        ]);
    };
    const listItemTextTitle = (architectureStyle: ArchitectureStyle) => architectureStyle.name;

    const renderArchitectUpdateForm: RenderInstanceUpdateForm<ArchitectureStyle> = (
        open,
        setOpen,
        onSubmit,
        architectureStyle
    ) => {
        return (
            <ArchitectureStyleFormDialog
                open={open}
                setOpen={setOpen}
                onSubmit={onSubmit}
                architectureStyle={architectureStyle}
            />
        );
    };
    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative overflow-y-scroll">
                {getArchitectureStylesRequest.loading && <CircularProgress />}
                <SnackbarWrapper
                    show={
                        !!getArchitectureStylesRequest.error ||
                        !!deleteArchitectureStylesRequest.error ||
                        !!createArchitectureStylesRequest.error ||
                        !!updateArchitectureStylesRequest.error
                    }
                    success={false}
                    message={
                        getArchitectureStylesRequest.error ??
                        deleteArchitectureStylesRequest.error ??
                        createArchitectureStylesRequest.error ??
                        updateArchitectureStylesRequest.error
                    }
                >
                    <ModelList<ArchitectureStyle>
                        instances={architectureStyles}
                        updateInstance={updateArchitectureStyle}
                        deleteInstance={deleteArchitectureStyle}
                        listItemTextTitle={listItemTextTitle}
                        renderInstanceUpdateForm={renderArchitectUpdateForm}
                    />
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

            <ArchitectureStyleFormDialog
                open={open}
                setOpen={setOpen}
                onSubmit={createArchitectureStyle}
            ></ArchitectureStyleFormDialog>
        </Box>
    );
};

export default ArchitectureStyles;
