import { Button, Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Architect } from "../models/architect";

interface AddArchitectFormDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const countries = ["Croatia", "Serbia", "Bosnia"]

const AddArchitectFormDialog = ({ open, setOpen }: AddArchitectFormDialogProps) => {
    const {
        register,
        handleSubmit,
        // Read the formState before render to subscribe the form state through the Proxy
        formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
    } = useForm<Architect>();
    const onSubmit = (data: any) => console.log(data);

    const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown") => {
        setOpen(false);
    };

    return (
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
                            })}
                        />
                    </Grid>
					<Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="yearBorn"
                            label="Year born"
                            error={touchedFields.yearBorn && !!errors.yearBorn}
                            helperText={errors.yearBorn?.message}
                            {...register("yearBorn", {
                                required: "Year born is required",
                            })}
                        />
                    </Grid>
					<Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="yearDied"
                            label="Year died"
                            error={touchedFields.yearDied && !!errors.yearDied}
                            helperText={errors.yearDied?.message}
                            {...register("yearDied", {
                                required: "Year died is required",
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
							{countries.map()}
						</TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" />
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};


export default AddArchitectFormDialog;
