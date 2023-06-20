import { Box, Container, Fab } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { Close, Add } from "@mui/icons-material";
import PeriodFeed from "../src/components/architectFeed/architectFeed";
import { useState } from "react";
import AddPeriodFormDialog from "../src/components/dialogs/addPeriodFormDialog";

const Periods: NextPage = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative overflow-y-scroll">
                {/* <PeriodFeeds /> */}
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
			<AddPeriodFormDialog open={open} setOpen={setOpen}></AddPeriodFormDialog>
        </Box>
    );
};

export default Periods;
