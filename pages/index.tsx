import { NextPage } from "next";
import useAuth from "../src/contexts/useAuth";
import { Box, Container, Fab } from "@mui/material";
import background from "../assets/images/buildings.jpg";
import PostFeed from "../src/components/postFeed/postFeed";
import { Center } from "../src/components/center";
import { Add, Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import AddPost from "../src/components/modal/addPost";
import { useState } from "react";

const HomePage: NextPage = () => {
	const router = useRouter();
    const { user } = useAuth();
	const [open, setOpen] = useState(false);
    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative top-16 overflow-y-scroll">

                <PostFeed />
            </Container>
            <Fab
                className="fixed z-90 bottom-10 right-8 bg-blue-600 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl"
                color="primary"
                aria-label="add"
				onClick={() => setOpen(!open)}
            >
                {open ? <Close /> : <Add />}
            </Fab>
			<AddPost openModal={open}/>
            {/* <SectionMenu /> */}
        </Box>
    );
};

export default HomePage;
