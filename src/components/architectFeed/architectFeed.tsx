import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Center } from "../center";
import { Delete, Edit } from "@mui/icons-material";
import { Architect } from "../../models/architect";
import ArchitectFormDialog from "../dialogs/architectFormDialog";
import { useState } from "react";

interface ArchitectFeedProps {
    architects: Architect[] | null;
    deleteArchitect: (id: string) => void;
    updateArchitect: (architect: Architect) => void;
}

const ArchitectFeed = ({ architects, deleteArchitect, updateArchitect }: ArchitectFeedProps) => {
    const [open, setOpen] = useState(false);
	const [selectedArchitect, setSelectedArchitect] = useState<Architect | undefined>(undefined);
	const openUpdateForm = (architect: Architect) => {
		setOpen(true);
		setSelectedArchitect(architect);
	}

    return (
        <>
            <List className="relative top-16">
                {architects?.map((architect) => (
                    <Center key={architect._id} flexDirection="column">
                        <ListItem
                            className="justify-between"
                            sx={{
                                width: "300px",
                                background: "rgba(255, 255, 255, 0.7)",
                                boxShadow: "2px 3px 3px rgba(0, 0, 0, 0.1)",
                                marginBottom: "8px",
                            }}
                        >
                            <ListItemText primary={`${architect.firstName} ${architect.lastName}`} />

                            <div className="flex flex-row">
                                <ListItemButton sx={{ padding: 0 }} onClick={() => openUpdateForm(architect)}>
                                    {/* <ListItemIcon> */}
                                    <Edit></Edit>
                                    {/* </ListItemIcon> */}
                                </ListItemButton>
                                <ListItemButton sx={{ padding: 0 }} onClick={() => deleteArchitect(architect._id)}>
                                    {/* <ListItemIcon> */}
                                    <Delete color="error"></Delete>
                                    {/* </ListItemIcon> */}
                                </ListItemButton>
                            </div>
                        </ListItem>
                    </Center>
                ))}
            </List>
            <ArchitectFormDialog open={open} setOpen={setOpen} onSubmit={updateArchitect} architect={selectedArchitect} />
        </>
    );
};

export default ArchitectFeed;
