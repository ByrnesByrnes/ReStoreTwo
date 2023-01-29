import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { AppCheckbox, AppTextInput } from "../../../ui";

export default function AddressForm() {
	const { control, formState } = useFormContext();

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping address
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<AppTextInput control={control} name="fullName" label="Full Name"
					/>
				</Grid>
				<Grid item xs={12}>
					<AppTextInput control={control} name="addressOne" label="Address One" />
				</Grid>
				<Grid item xs={12}>
					<AppTextInput control={control} name="addressTwo" label="Address Two" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="city" label="City" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="state" label="State" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="zip" label="Zipcode" />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name="country" label="Country" />
				</Grid>
				<Grid item xs={12}>
					<AppCheckbox
						name="saveAddress"
						label="Save this as the default address"
						control={control}
						disabled={!formState.isDirty}
					/>
				</Grid>
			</Grid>
		</>
	);
}