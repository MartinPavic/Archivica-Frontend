import { PostAdd, TextFields, Recommend, Search } from "@mui/icons-material";
import { Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

const SectionMenu = () => {
    return (
        <Container fixed sx={{ height: "100%" }}>
            <Grid container spacing={1} height="80%">
                <Grid item xs={12} m={6} margin={0}>
                    {/* <motion.button whileTap={{ scale: 0.8 }}>
                        <span className="font-bold text-3xl">Posts</span>
                    </motion.button> */}
                    <Button
                        variant="outlined"
                        startIcon={<PostAdd />}
                        className="w-full h-full text-center p-3 glass"
                        sx={{ color: "black", border: "none" }}
                    >
                        <span className="font-bold text-3xl">Posts</span>
                    </Button>
                </Grid>
                <Grid item xs={12} m={6} margin={0}>
                    <Button
                        variant="outlined"
                        startIcon={<TextFields />}
                        className="w-full h-full text-center p-3 glass"
                        sx={{ color: "black", border: "none" }}
                    >
                        <span className="font-bold text-3xl">Blogs</span>
                    </Button>
                </Grid>
                <Grid item xs={12} m={6} margin={0}>
                    <Button
                        variant="outlined"
                        startIcon={<Search />}
                        className="w-full h-full text-center p-3 glass"
                        sx={{ color: "black", border: "none" }}
                    >
                        <span className="font-bold text-3xl">Find</span>
                    </Button>
                </Grid>
                <Grid item xs={12} m={6} margin={0}>
                    <Button
                        variant="outlined"
                        startIcon={<Recommend />}
                        className="w-full h-full text-center p-3 glass"
                        sx={{ color: "black", border: "none" }}
                    >
                        <span className="font-bold text-3xl">Recommended</span>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};


export default SectionMenu;