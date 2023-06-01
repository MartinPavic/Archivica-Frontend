import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import style from "./style.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddToPhotos, ClearRounded, ExitToApp, ExitToAppRounded, PostAdd, VideoCall } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Divider, Fade, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Post } from "../../models/post";
import { FieldValues, useForm, Controller } from "react-hook-form";
import apiService from "../../services/api";
import useAuthenticatedRequest from "../../hooks/useRequest";

const theme = createTheme({
	palette: {
		primary: {
			main: "##65676B",
			dark: "#053e85",
		},
	},
});

const architects = [
	{ label: "Renzo Piano", year: 13241 },
	{ label: "Zaha Hadid", year: 4124 },
	{ label: "Frank LLoyd Wright", year: 421421 },
];

const ages = ["Baroque", "Reinassance", "Neoclassic"];

const location = ["Zagreb", "London", "Berlin"];

const modal = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const PostCreate = (props: any) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [post, setPost] = useState<Post>();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
	} = useForm<Post>();
	const [postPostRequest, postPostResponse, isLoading, error] = useAuthenticatedRequest({
		request: apiService.postPost,
		requestData: post,
	});
	// quick fix
	const formSubmit = (
		data: Post) => {
		setPost(data)
		postPostRequest()
		console.log(data)
	} 
	const onSubmit = async (data: Post) => isValid ? formSubmit(data) : null;
	return (
		<div className={style.postAdd}>
			<div className={style.postAdd_header}>
				<div className={style.postAdd_header_user}>
					<Avatar alt="Remy Sharp" src="../../assets/images/temp/tempUser.jpg" />
					<input style={{ marginLeft: 10 }} onClick={() => handleOpen()} placeholder="Start a post" />
				</div>
			</div>
			<div style={{ padding: "0 30px" }}>
				<div className={style.postAdd_stats}>
					<ThemeProvider theme={theme}>
						<Button color="primary" onClick={() => handleOpen()} startIcon={<PostAdd />}>
							Post
						</Button>
						<Button color="primary" startIcon={<VideoCall />}>
							Video
						</Button>
						<Button color="primary" startIcon={<PostAdd />}>
							Article
						</Button>
					</ThemeProvider>
				</div>
			</div>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<div>
					<Fade in={open}>
						<Box className={style.modal}>
							<div className={style.header}>
								<Box sx={{ fontWeight: 'bold', fontSize: 20}}>Create a post</Box>
								<IconButton>
									<ClearRounded onClick={() => console.log("test")}/>
								</IconButton>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Divider />
								<div className={style.content}>
									<div className={style.parent}>
										<Controller
											control={control}
											name='city'
											render={({ field: { ref, onChange, ...field } }) => (
												<Autocomplete
													options={location}
													onChange={(_, data) => onChange(data)}
													renderInput={(params) => (
														<TextField
															{...params}
															{...field}
															inputRef={ref}
															label="Location"
															variant="standard"
														/>
													)}
												/>
											)}
										/>
										<Controller
											control={control}
											name="subAge"
											render={({ field: { ref, onChange, ...field } }) => (
												<Autocomplete
													options={ages}
													onChange={(_, data) => onChange(data)}
													renderInput={(params) => (
														<TextField
															{...params}
															{...field}
															inputRef={ref}
															label="Age"
															variant="standard"
														/>
													)}
												/>
											)}
										/>
										<Controller
											control={control}
											name="architect"
											render={({ field: { ref, onChange, ...field } }) => (
												<Autocomplete
													options={architects}
													onChange={(_, data) => onChange(data)}
													renderInput={(params) => (
														<TextField
															{...params}
															{...field}
															inputRef={ref}
															label="Architect"
															variant="standard"
														/>
													)}
												/>
											)}
										/>
										<TextField
											className={style.div4}
											id="something"
											label="Something else"
											variant="standard"
										/>
										<Controller
											control={control}
											name="description"
											defaultValue=""
											render={({ field }) => (
												<TextField
													{...field}
													className={style.div5}
													multiline
													rows={3}
													fullWidth
													variant="standard"
													label="Description"
												/>
											)}
										/>
									</div>
								</div>
								<Divider />
								<div style={{ display: "flex", justifyContent: "flex-start", padding: " 0 2rem" }}>
									<Box sx={{ display: "flex", alignItems: "center", width: "fit-content", padding: 1 }}>
										<Button type="submit" variant="contained" sx={{ mr: 3 }}>
											Post
										</Button>
										<Divider orientation="vertical" />
										<Button startIcon={<AddToPhotos />} />
										<Button startIcon={<VideoCall />} />
									</Box>
								</div>
							</form>
						</Box>
					</Fade>
					<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
						{error}
					</Alert>
				</div>
			</Modal>
		</div>
	);
};

export default PostCreate;
