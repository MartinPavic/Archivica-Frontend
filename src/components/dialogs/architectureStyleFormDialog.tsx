import { Button, Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { ArchitectureStyle } from "../../models/architectureStyle";

interface ArchitectureStyleFormDialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onSubmit: (data: ArchitectureStyle) => void;
    architectureStyle?: ArchitectureStyle;
}

const ArchitectFormDialog = ({ open, setOpen, onSubmit, architectureStyle }: ArchitectureStyleFormDialogProps) => {
    const {
        control,
        register,
        handleSubmit,
        // Read the formState before render to subscribe the form state through the Proxy
        formState: { errors, isValid, touchedFields },
        reset,
    } = useForm<ArchitectureStyle>({
        defaultValues: {
            synonyms: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "synonyms",
    } as never);

    const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown") => {
        setOpen(false);
        reset();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create an architecture style</DialogTitle>
            <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            value={architectureStyle?.name}
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
                            <Grid key={field.id} item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="synonm"
                                    label="Synonm"
                                    value={architectureStyle?.synonyms}
                                    error={touchedFields.synonyms && !!errors.synonyms}
                                    helperText={errors.synonyms?.message}
                                    {...register(`synonyms.${index}`, {
                                        minLength: 2,
                                    })}
                                />
								<Button onClick={() => append({})}>Add</Button>
								<Button onClick={() => fields.length > 1 ? remove(index) : null}>Delete</Button>
                            </Grid>
                        );
                    })}

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            fullWidth
                            id="start"
                            label="Start"
                            value={architectureStyle?.start}
                            error={touchedFields.start && !!errors.start}
                            helperText={errors.start?.message}
                            {...register("start", {
                                required: "Start is required",
                                maxLength: 4,
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            id="end"
                            label="End"
                            value={architectureStyle?.end}
                            error={touchedFields.end && !!errors.end}
                            helperText={errors.end?.message}
                            {...register("end", {
                                maxLength: 4,
                            })}
                        />
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

export default ArchitectFormDialog;
