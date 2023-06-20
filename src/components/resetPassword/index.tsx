import { Button, LinearProgress, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { UserResetPassword } from "../../models/user";
import { useRequest } from "../../hooks/useRequest";
import apiService from "../../services/api";
import { SnackbarWrapper } from "../snackbarWrapper";
import useAuth from "../../contexts/useAuth";
import { useState } from "react";

export const ResetPasswordForm = ({ email, token }: { email: string, token: string}): JSX.Element => {
    const {
        register,
        handleSubmit,
		watch,
        formState: { errors, isValid, touchedFields },
    } = useForm<UserResetPassword>();
	
    const resetPasswordRequest = useRequest({
        request: apiService.postResetPassword,
    });
	
	const { signIn } = useAuth()

    const onSubmit = async (values: FieldValues) => {
		if (isValid) {
			const { newPassword, confirmNewPassword } = values as UserResetPassword;
			const result = await resetPasswordRequest.call({ email, token, newPassword, confirmNewPassword });
			if (!result) return;
			await signIn({ email, password: newPassword });
		}
	}

    return (
		<SnackbarWrapper show={!!resetPasswordRequest.error} success={!!resetPasswordRequest.data && !resetPasswordRequest.error} message={resetPasswordRequest.error || "Successfully reset password"}>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<TextField
					margin="normal"
					required
					fullWidth
					id="newPassword"
					label="New password"
					type="password"
					autoFocus
					error={touchedFields.newPassword && !!errors.newPassword}
					helperText={errors.newPassword?.message}
					{...register("newPassword", {
						required: "New password is required",
						pattern: {
							value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
							message:
								"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
						},
					})}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="confirmNewPassword"
					label="Confirm new password"
					type="password"
					autoFocus
					error={touchedFields.confirmNewPassword && !!errors.confirmNewPassword}
					helperText={errors.confirmNewPassword?.message}
					{...register("confirmNewPassword", {
						required: "Confirm new password is required",
						pattern: {
							value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
							message:
								"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
						},
						validate: (value: string) => watch("newPassword") === value || "Passwords do not match"
					})}
				/>
				<Button type="submit" className="bg-primary" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid || resetPasswordRequest.loading}>
					Reset password
				</Button>
				{resetPasswordRequest.loading && <LinearProgress />}
        	</form>
		</SnackbarWrapper> 
    );
};
