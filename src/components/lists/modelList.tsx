import { ListItemButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Model } from "../../models/model";
import { Edit, Delete } from "@mui/icons-material";
import { useCountries } from "../../hooks/useCountries";

export type RenderInstanceUpdateForm<T> = (
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    onSubmit: (instance: T) => Promise<void>,
    instance: T
) => JSX.Element;

export interface Column {
    label: string;
    key: string | ((instance: any) => React.ReactNode);
}

export interface ModelListProps<T extends Model> {
    instances: T[] | null;
    deleteInstance: (id: string) => Promise<void>;
    updateInstance: (instance: T) => Promise<void>;

    listItemTextTitle: (instance: T) => string;
    renderInstanceUpdateForm: RenderInstanceUpdateForm<T>;
    isAdminPage: boolean;
    columns: Column[];
}

export const ModelList = <T extends Model>({
    instances,
    deleteInstance,
    updateInstance,
    listItemTextTitle,
    renderInstanceUpdateForm,
    isAdminPage,
    columns,
}: ModelListProps<T>): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState<T | undefined>(undefined);
    const openUpdateForm = (instance: T) => {
        setSelectedInstance(instance);
        setOpen(true);
    };
    const countries = useCountries();
    return (
        <>
            <TableContainer className="relative top-16" component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.label}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instances?.map((instance) => (
                            <TableRow key={instance._id}>
                                {columns.map((column) => (
                                    <TableCell key={column.label}>
                                        {typeof column.key === "function" ? column.key(instance) : instance[column.key]}
                                    </TableCell>
                                ))}
                                {isAdminPage && (
                                    <>
                                        <TableCell style={{ width: 40 }} align="right">
                                            <ListItemButton
                                                sx={{ padding: 0 }}
                                                onClick={() => openUpdateForm(instance)}
                                            >
                                                <Edit />
                                            </ListItemButton>
                                        </TableCell>
                                        <TableCell style={{ width: 40 }} align="right">
                                            <ListItemButton
                                                sx={{ padding: 0 }}
                                                onClick={() => deleteInstance(instance._id)}
                                            >
                                                <Delete color="error" />
                                            </ListItemButton>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {renderInstanceUpdateForm(open, setOpen, updateInstance, selectedInstance!)}
        </>
    );
};
