import { Button, Dialog, DialogTitle, Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Architect } from "../models/architect";
import { useCountries } from "../hooks/useCountries";
import { useAuthenticatedRequest } from "../hooks/useRequest";
import apiService from "../services/api";
import { SnackbarWrapper } from "./snackbarWrapper";

interface AddArchitectFormDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
	architects: Architect[];
	setArchitects: (architects: Architect[]) => void;
}

const AddArchitectFormDialog = ({ open, setOpen, architects, setArchitects }: AddArchitectFormDialogProps) => {
    const {
        register,
        handleSubmit,
        // Read the formState before render to subscribe the form state through the Proxy
        formState: { errors, isValid, touchedFields },
		reset
    } = useForm<Architect>();

    const createArchitectRequest = useAuthenticatedRequest({ request: apiService.postArchitect });

    const onSubmit = async (data: Architect) => {
		const response = await createArchitectRequest.call(data);
		if (response) setArchitects([...architects, response]);
		reset();
		setOpen(false);
	};

    const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown") => {
        setOpen(false);
    };

    const countries = useCountries();

    return (
        <SnackbarWrapper
            show={!!createArchitectRequest.data || !!createArchitectRequest.error}
            success={!createArchitectRequest.error}
            message={createArchitectRequest.error ?? "Architect successfully created"}
        >
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Create an architect</DialogTitle>
                <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={touchedFields.firstName && !!errors.firstName}
                                helperText={errors.firstName?.message}
                                {...register("firstName", {
                                    required: "First name is required",
                                    minLength: 2,
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                error={touchedFields.lastName && !!errors.lastName}
                                helperText={errors.lastName?.message}
                                {...register("lastName", {
                                    required: "Last name is required",
                                    minLength: 2,
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                type="number"
                                fullWidth
                                id="yearBorn"
                                label="Year born"
                                error={touchedFields.yearBorn && !!errors.yearBorn}
                                helperText={errors.yearBorn?.message}
                                {...register("yearBorn", {
                                    required: "Year born is required",
                                    maxLength: 4,
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                id="yearDied"
                                label="Year died"
                                error={touchedFields.yearDied && !!errors.yearDied}
                                helperText={errors.yearDied?.message}
                                {...register("yearDied", {
                                    maxLength: 4,
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                select
                                id="Country"
                                label="Country"
                                error={touchedFields.countryId && !!errors.countryId}
                                helperText={errors.countryId?.message}
                                {...register("countryId", {
                                    required: "Country is required",
                                })}
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country._id} value={country._id}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={!isValid} variant="outlined" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </SnackbarWrapper>
    );
};

export default AddArchitectFormDialog;
