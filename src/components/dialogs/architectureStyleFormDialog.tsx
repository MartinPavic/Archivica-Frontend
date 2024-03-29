import { Button, Dialog, DialogTitle, Grid, MenuItem, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { ArchitectureStyle } from "../../models/architectureStyle";
import { useEffect } from "react";

interface ArchitectureStyleFormDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onSubmit: (data: ArchitectureStyle) => void;
    architectureStyle?: ArchitectureStyle;
}

const ArchitectureStyleFormDialog = ({
    open,
    setOpen,
    onSubmit,
    architectureStyle,
}: ArchitectureStyleFormDialogProps) => {
    const {
        control,
        register,
        handleSubmit,
        // Read the formState before render to subscribe the form state through the Proxy
        formState: { errors, isValid, touchedFields },
        reset,
        setValue,
    } = useForm<ArchitectureStyle>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "synonyms",
    } as never);

    useEffect(() => {
        architectureStyle?.synonyms.forEach((synonym) => append(synonym));
        if (architectureStyle) setValue("_id", architectureStyle._id);
    }, [architectureStyle?._id]);

    const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown") => {
        setOpen(false);
        reset();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                {architectureStyle ? `Update ${architectureStyle.name}` : "Create an architecture style"}
            </DialogTitle>
            <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            defaultValue={architectureStyle?.name}
                            error={touchedFields.name && !!errors.name}
                            helperText={errors.name?.message}
                            {...register("name", {
                                required: "Name is required",
                                minLength: 2,
                            })}
                        />
                    </Grid>
                    {fields.map((field, index) => {
                        return (
                            <Grid key={field.id} item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id={`synonym${index}`}
                                    label={`Synonym ${index + 1}`}
                                    defaultValue={architectureStyle?.synonyms[index]}
                                    error={touchedFields.synonyms && !!errors.synonyms}
                                    helperText={errors.synonyms?.message}
                                    {...register(`synonyms.${index}`, {
                                        minLength: 2,
                                    })}
                                />
                                <Button onClick={() => remove(index)}>Delete</Button>
                            </Grid>
                        );
                    })}
                    <Grid item xs={12}>
                        <Button onClick={() => append("")}>Add synonym</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            fullWidth
                            id="start"
                            label="Start"
                            defaultValue={architectureStyle?.start.year}
                            error={touchedFields.start && !!errors.start}
                            helperText={errors.start?.message}
                            {...register("start.year", {
                                required: "Start year is required",
                                maxLength: 4,
                                min: 0,
                            })}
                        />
                        <TextField
                            required
                            fullWidth
                            select
                            id="startUnit"
                            label="Start Unit"
                            defaultValue={architectureStyle?.start.unit}
                            error={touchedFields.start && !!errors.start}
                            helperText={errors.start?.message}
                            {...register("start.unit", {
                                required: "Start unit is required",
                            })}
                        >
                            <MenuItem value="AD">AD</MenuItem>
                            <MenuItem value="BC">BC</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            id="end"
                            label="End"
                            defaultValue={architectureStyle?.end?.year}
                            error={touchedFields.end && !!errors.end}
                            helperText={errors.end?.message}
                            {...register("end.year", {
                                maxLength: 4,
                                min: 0,
                            })}
                        />
                        <TextField
                            required
                            fullWidth
                            select
                            id="endUnit"
                            label="End Unit"
                            defaultValue={architectureStyle?.end.unit}
                            error={touchedFields.end && !!errors.end}
                            helperText={errors.end?.message}
                            {...register("end.unit", {
                                required: "End unit is required",
                            })}
                        >
                            <MenuItem value="AD">AD</MenuItem>
                            <MenuItem value="BC">BC</MenuItem>
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
    );
};

export default ArchitectureStyleFormDialog;
