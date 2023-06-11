import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import styles from "./style.module.scss";
import { TextField } from "@mui/material";
import { AddToPhotos, VideoCall } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import apiService from "../../../services/api";

const architects = [
    { label: "Renzo Piano", year: 13241 },
    { label: "Zaha Hadid", year: 4124 },
    { label: "Frank LLoyd Wright", year: 421421 },
];

const ages = ["Baroque", "Reinassance", "Neoclassic"];

const location = ['Zagreb', 'London', 'Berlin']

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
};

const AddPost = (props: any) => {
    const [value, setValue] = React.useState("details");


    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    }
    console.log(props)
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.openModal}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{
                    ".MuiFormControl-root": {
                        margin: "10px 50px 10px 0",
                    },
                }}
            >
                <Fade in={props.openModal}>
                    <Box sx={style}>
                        <div className={styles.content}>
                            <h1>Create a post</h1>
                        </div>
                        <Divider />
                        <div className={styles.content}>
                            <div className={styles.parent}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={location}
                                    sx={{ mr: 2}}
                                    renderInput={(params) => <TextField {...params} variant='standard' label="Location" />}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={ages}
                                    renderInput={(params) => <TextField {...params} variant='standard' label="Ages" />}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={architects}
                                    sx={{ mr: 2}}
                                    renderInput={(params) => <TextField {...params} variant='standard' label="Architect" />}
                                />
                                <TextField
                                    className={styles.div4}
                                    id="something"
                                    label="Something else"
                                    variant="standard"
                                />
                                <TextField
                                    className={styles.div5}
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={3}
                                    variant="standard"
                                    InputProps={{disableUnderline: true}}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div style={{ display: "flex", justifyContent: "flex-start", padding: " 0 2rem" }}>
                            <Box sx={{ display: "flex", alignItems: "center", width: "fit-content", padding: 1 }}>
                                <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                                    Post
                                </Button>
                                <Divider orientation="vertical"/>
                                <Button startIcon={<AddToPhotos />} />
                                <Button startIcon={<VideoCall />} />
                            </Box>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default AddPost;
