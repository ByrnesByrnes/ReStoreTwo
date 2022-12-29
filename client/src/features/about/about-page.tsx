import { Alert, AlertTitle, Box, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import apiServices from "../../api-services/api-services";

export default function AboutPage() {
	const [validationErrors, setValidationErros] = useState<string[]>([]);

	const getValidationError = () => {
		apiServices.TestErrors.getValidationError()
			.then(() => console.log("Should not see this"))
			.catch(error => setValidationErros(error));
	};

	return (
		<Container>
			<Typography variant="h2" gutterBottom>Errors for testing purposes</Typography>
			<ButtonGroup fullWidth>
				<Button variant="contained" onClick={() => apiServices.TestErrors.get400Error().catch((error) => console.log(error))}>Test 400 Error</Button>
				<Button variant="contained" onClick={() => apiServices.TestErrors.get401Error().catch((error) => console.log(error))}>Test 401 Error</Button>
				<Button variant="contained" onClick={() => apiServices.TestErrors.get404Error().catch((error) => console.log(error))}>Test 404 Error</Button>
				<Button variant="contained" onClick={() => apiServices.TestErrors.get500Error().catch((error) => console.log(error))}>Test 500 Error</Button>
				<Button variant="contained" onClick={getValidationError} >Test Validation Error</Button>
			</ButtonGroup>
			<Box>
				{validationErrors.length > 0 &&
					<Alert severity="error">
						<AlertTitle>Validation Errors</AlertTitle>
						<List>
							{validationErrors.map(error => (
								<ListItem key={error}>{error}</ListItem>
							))}
						</List>
					</Alert>
				}
			</Box>
		</Container>
	);
}
