import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Model } from "../../models/model";
import { Center } from "../center";
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
}

export const ModelList = <T extends Model>({
    instances,
    deleteInstance,
    updateInstance,
    listItemTextTitle,
    renderInstanceUpdateForm,
}: ModelListProps<T>): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState<T | undefined>(undefined);
    const openUpdateForm = (instance: T) => {
        setSelectedInstance(instance);
		setOpen(true);
    };
    return (
        <>
            <List className="relative top-16">
                {instances?.map((instance) => (
                    <Center key={instance._id} flexDirection="column">
                        <ListItem
                            className="justify-between"
                            sx={{
                                width: "300px",
                                background: "rgba(255, 255, 255, 0.7)",
                                boxShadow: "2px 3px 3px rgba(0, 0, 0, 0.1)",
                                marginBottom: "8px",
                            }}
                        >
                            <ListItemText primary={listItemTextTitle(instance)}></ListItemText>

                            <div className="flex flex-row">
                                <ListItemButton sx={{ padding: 0 }} onClick={() => openUpdateForm(instance)}>
                                    {/* <ListItemIcon> */}
                                    <Edit></Edit>
                                    {/* </ListItemIcon> */}
                                </ListItemButton>
                                <ListItemButton sx={{ padding: 0 }} onClick={() => deleteInstance(instance._id)}>
                                    {/* <ListItemIcon> */}
                                    <Delete color="error"></Delete>
                                    {/* </ListItemIcon> */}
                                </ListItemButton>
                            </div>
                        </ListItem>
                    </Center>
                ))}
            </List>
            {renderInstanceUpdateForm(open, setOpen, updateInstance, selectedInstance!)}
        </>
    );
};
