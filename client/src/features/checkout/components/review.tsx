import { Grid, Typography } from "@mui/material";
import { BasketTable, BasketSummary } from "../../basket/components";
import { useAppSelector } from "../../../app/store/configure-store";

export default function Review() {
	const { basket } = useAppSelector(state => state.basket);

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			{basket !== undefined && <BasketTable items={basket.items} />}
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<BasketSummary />
				</Grid>
			</Grid>
		</>
	);
}