import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Architect } from "../models/architect";

const ArchitectForm = () => {
	const {
		register,
		handleSubmit,
		// Read the formState before render to subscribe the form state through the Proxy
		formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
	  } = useForm<Architect>();
	  const onSubmit = (data: any) => console.log(data);
	
	  return (
		<form onSubmit={handleSubmit(onSubmit)}>
		  <TextField {...register("firstName")} />
		  <TextField {...register("lastName")} />
		  <TextField type="submit" />
		</form>
	  );
}

export default ArchitectForm;