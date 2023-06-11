import { Box, Container, Fab } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { Close, Add } from "@mui/icons-material";
import AddPost from "../src/components/modal/addPost";
import ArchitectFeed from "../src/components/architectFeed/architectFeed";
import { useState } from "react";
import AddArchitectFormDialog from "../src/components/addArchitectFormDialog";

const Architects: NextPage = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative overflow-y-scroll">
                <ArchitectFeed />
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
			<AddArchitectFormDialog open={open} setOpen={setOpen}></AddArchitectFormDialog>
        </Box>
    );
};

export default Architects;
