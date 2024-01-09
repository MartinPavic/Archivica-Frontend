import {
    ListItemButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Model } from "../../models/model";
import { Edit, Delete } from "@mui/icons-material";

export type RenderInstanceUpdateForm<T> = (
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    onSubmit: (instance: T) => Promise<void>,
    instance: T
) => JSX.Element;

export interface ModelListProps<T extends Model> {
    instances: T[] | null;
    deleteInstance: (id: string) => Promise<void>;
    updateInstance: (instance: T) => Promise<void>;

    listItemTextTitle: (instance: T) => string;
    renderInstanceUpdateForm: RenderInstanceUpdateForm<T>;
    isAdminPage: boolean;
}

export const ModelList = <T extends Model>({
    instances,
    deleteInstance,
    updateInstance,
    listItemTextTitle,
    renderInstanceUpdateForm,
    isAdminPage,
}: ModelListProps<T>): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState<T | undefined>(undefined);
    const openUpdateForm = (instance: T) => {
        setSelectedInstance(instance);
        setOpen(true);
    };
    return (
        <>
            <TableContainer className="relative top-16" component={Paper}>
                <Table>
                    <TableBody>
                        {instances?.map((instance) => (
                            <TableRow key={instance._id}>
                                <TableCell>{listItemTextTitle(instance)}</TableCell>
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
