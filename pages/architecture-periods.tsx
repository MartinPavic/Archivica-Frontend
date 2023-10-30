import { Box, CircularProgress, Container, Fab } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { Close, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuthenticatedRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { Filter, Sort } from "../src/models/filterPageSort";
import { SnackbarWrapper } from "../src/components/snackbarWrapper";
import { ArchitecturePeriod } from "../src/models/architecturePeriod";
import { ModelList, RenderInstanceUpdateForm } from "../src/components/lists/modelList";
import ArchitecturePeriodFormDialog from "../src/components/dialogs/architecturePeriodFormDialog";

const ArchitecturePeriods: NextPage = () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<Sort>({ property: "name", operator: "asc" });
    const [limit, setLimit] = useState<number>(10);
    const [architecturePeriods, setArchitecturePeriods] = useState<ArchitecturePeriod[]>([]);
    const getArchitecturePeriodsRequest = useAuthenticatedRequest({ request: apiService.getArchitecturePeriods });
    const deleteArchitecturePeriodsRequest = useAuthenticatedRequest({ request: apiService.deleteArchitecturePeriods });
    const updateArchitecturePeriodsRequest = useAuthenticatedRequest({ request: apiService.putArchitecturePeriods });
    const createArchitecturePeriodsRequest = useAuthenticatedRequest({ request: apiService.postArchitecturePeriods });

    useEffect(() => {
        const getArchitecturePeriods = async () => {
            const response = await getArchitecturePeriodsRequest.call({ filters, sort, page, limit });
            setArchitecturePeriods(response ? response : []);
        };
        getArchitecturePeriods();
    }, [filters, page, sort, limit]);

    const createArchitecturePeriod = async (data: ArchitecturePeriod) => {
        const response = await createArchitecturePeriodsRequest.call(data);
        if (response) setArchitecturePeriods([...architecturePeriods, response]);
        setOpen(false);
    };
    const deleteArchitecturePeriod = async (id: string) => {
        const response = await deleteArchitecturePeriodsRequest.call({ id });
        if (!response) {
            return;
        }
        const index = architecturePeriods.findIndex((arch) => arch._id === id);
        setArchitecturePeriods([...architecturePeriods.slice(0, index), ...architecturePeriods.slice(index + 1)]);
    };
    const updateArchitecturePeriod = async (architecturePeriod: ArchitecturePeriod) => {
        const response = await updateArchitecturePeriodsRequest.call(architecturePeriod);
        if (!response) {
            return;
        }
        const index = architecturePeriods.findIndex((as) => as._id === architecturePeriod._id);
        setArchitecturePeriods([
            ...architecturePeriods.slice(0, index),
            response,
            ...architecturePeriods.slice(index + 1),
        ]);
    };
    const listItemTextTitle = (architecturePeriod: ArchitecturePeriod) => architecturePeriod.name;

    const renderArchitectUpdateForm: RenderInstanceUpdateForm<ArchitecturePeriod> = (
        open,
        setOpen,
        onSubmit,
        architecturePeriod
    ) => {
        return (
            <ArchitecturePeriodFormDialog
                open={open}
                setOpen={setOpen}
                onSubmit={onSubmit}
                architecturePeriod={architecturePeriod}
            />
        );
    };
    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative overflow-y-scroll">
                {getArchitecturePeriodsRequest.loading && <CircularProgress />}
                <SnackbarWrapper
                    show={
                        !!getArchitecturePeriodsRequest.error ||
                        !!deleteArchitecturePeriodsRequest.error ||
                        !!createArchitecturePeriodsRequest.error ||
                        !!updateArchitecturePeriodsRequest.error
                    }
                    success={false}
                    message={
                        getArchitecturePeriodsRequest.error ??
                        deleteArchitecturePeriodsRequest.error ??
                        createArchitecturePeriodsRequest.error ??
                        updateArchitecturePeriodsRequest.error
                    }
                >
                    <ModelList<ArchitecturePeriod>
                        instances={architecturePeriods}
                        updateInstance={updateArchitecturePeriod}
                        deleteInstance={deleteArchitecturePeriod}
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

            <ArchitecturePeriodFormDialog
                open={open}
                setOpen={setOpen}
                onSubmit={createArchitecturePeriod}
            ></ArchitecturePeriodFormDialog>
        </Box>
    );
};

export default ArchitecturePeriods;
