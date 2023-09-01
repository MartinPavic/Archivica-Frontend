import { Button, Checkbox, Dialog, DialogTitle, FormControlLabel, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Period } from "../../models/period";
import { useCountries } from "../../hooks/useCountries";
import { yearPickerClasses } from "@mui/lab";

interface AddPeriodFormDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


const AddPeriodFormDialog = ({ open, setOpen }: AddPeriodFormDialogProps) => {
    const {
        register,
        handleSubmit,
        // Read the formState before render to subscribe the form state through the Proxy
        formState: { errors, isValid, touchedFields },
    } = useForm<Period>();
    const onSubmit = (data: any) => console.log(data);

    const handleClose = (event: any, reason: "escapeKeyDown") => {
        setOpen(false);
    };

	const countries = useCountries();

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create a period</DialogTitle>
            <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            error={touchedFields.name && !!errors.name}
                            helperText={errors.name?.message}
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="synonym"
                            label="Synonym"
                            error={touchedFields.synonym && !!errors.synonym}
                            helperText={errors.synonym?.message}
                            {...register("synonym", {
                                required: "Synonym is required",
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
							type="number"
                            fullWidth
                            id="start"
                            label="Year started"
                            error={touchedFields.start?.year && !!errors.start?.year}
                            helperText={errors.start?.year?.message}
                            {...register("start.year", {
                                required: "Year Started is required",
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select defaultValue="AD" {...register("start.unit")}>
                            <MenuItem value="AD">AD</MenuItem>
                            <MenuItem value="BC">BC</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
							type="number"
                            id="end"
                            label="Year ended"
                            error={touchedFields.end?.year && !!errors.end?.year}
                            helperText={errors.end?.year?.message}
                            {...register("end.year")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Select defaultValue="AD" {...register("end.unit")}>
                            <MenuItem value="AD">AD</MenuItem>
                            <MenuItem value="BC">BC</MenuItem>
                        </Select>
                    </Grid>
                    {/* <Grid xs={12} sm={2}>
                        <FormControlLabel control={<Checkbox  />} label="Present" />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button disabled={!isValid} variant="outlined" type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default AddPeriodFormDialog;
