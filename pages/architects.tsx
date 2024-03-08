import { Box, CircularProgress, Container, Fab } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { Close, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuthenticatedRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { Filter, Sort } from "../src/models/filterPageSort";
import { Architect } from "../src/models/architect";
import ArchitectFormDialog from "../src/components/dialogs/architectFormDialog";
import { Column, ModelList, RenderInstanceUpdateForm } from "../src/components/lists/modelList";
import { useCountries } from "../src/hooks/useCountries";
import { Country } from "../src/models/country";

interface ArchitectsProps {
    isAdminPage: boolean;
}

const Architects: NextPage<ArchitectsProps> = ({ isAdminPage }) => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<Sort>({ property: "name", operator: "asc" });
    const [limit, setLimit] = useState<number>(10);
    const [architects, setArchitects] = useState<Architect[]>([]);
    const columns: Column[] = [
        { label: "Name", key: (instance) => listItemTextTitle(instance) },
        { label: "Country", key: (instance) => findCountry(instance)?.name },
        { label: "Year Born", key: "yearBorn" },
        { label: "Year Died", key: "yearDied" },
    ];
    const getArchitectsRequest = useAuthenticatedRequest({ request: apiService.getArchitects });
    const deleteArchitectRequest = useAuthenticatedRequest({ request: apiService.deleteArchitect });
    const updateArchitectRequest = useAuthenticatedRequest({ request: apiService.putArchitect });
    const createArchitectRequest = useAuthenticatedRequest({ request: apiService.postArchitect });
    const countries: Country[] = useCountries();
    const findCountry = (instance: Architect) =>
        countries?.find((country) => country.id.toString() === instance.countryId);

    useEffect(() => {
        const getArchitects = async () => {
            const response = await getArchitectsRequest.call({ filters, sort, page, limit });
            setArchitects(response ?? []);
        };
        getArchitects();
    }, [filters, page, sort, limit]);

    const createArchitect = async (data: Architect) => {
        const response = await createArchitectRequest.call(data);
        if (response) setArchitects([...architects, response]);
        setOpen(false);
    };
    const deleteArchitect = async (id: string) => {
        const response = await deleteArchitectRequest.call({ id });
        if (!response) {
            return;
        }
        const index = architects.findIndex((arch) => arch._id === id);
        setArchitects([...architects.slice(0, index), ...architects.slice(index + 1)]);
    };
    const updateArchitect = async (architect: Architect) => {
        const response = await updateArchitectRequest.call(architect);
        if (!response) {
            return;
        }
        const index = architects.findIndex((arch) => arch._id === architect._id);
        setArchitects([...architects.slice(0, index), response, ...architects.slice(index + 1)]);
    };

    const listItemTextTitle = (architect: Architect) => `${architect.firstName} ${architect.lastName}`;

    const renderArchitectUpdateForm: RenderInstanceUpdateForm<Architect> = (open, setOpen, onSubmit, architect) => {
        return <ArchitectFormDialog open={open} setOpen={setOpen} onSubmit={onSubmit} architect={architect} />;
    };

    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={
                isAdminPage
                    ? {}
                    : { backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }
            }
        >
            <Container className="no-scrollbar relative overflow-y-scroll">
                {getArchitectsRequest.loading && <CircularProgress />}
                <ModelList<Architect>
                    instances={architects}
                    updateInstance={updateArchitect}
                    deleteInstance={deleteArchitect}
                    listItemTextTitle={listItemTextTitle}
                    renderInstanceUpdateForm={renderArchitectUpdateForm}
                    isAdminPage={isAdminPage}
                    columns={columns}
                />
            </Container>
            {isAdminPage && (
                <Fab
                    className="fixed z-90 bottom-10 right-8 bg-blue-600 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl"
                    color="primary"
                    aria-label="add"
                    sx={{ position: "fixed" }}
                    onClick={() => setOpen(!open)}
                >
                    {isAdminPage && (open ? <Close /> : <Add />)}
                </Fab>
            )}
            <ArchitectFormDialog open={open} setOpen={setOpen} onSubmit={createArchitect}></ArchitectFormDialog>
        </Box>
    );
};

export default Architects;
