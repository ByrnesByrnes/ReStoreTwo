import { Box, Typography, Pagination } from "@mui/material";
import React from 'react';
import { MetaData } from "../../app/models";

interface Props {
	metaData: MetaData;
	onPageChange: (page: number) => void;
}

const AppPagination: React.FC<Props> = ({ metaData, onPageChange }) => {
	const { currentPage, totalPages, pageSize, totalCount } = metaData;

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Typography>
				Displaying {(currentPage - 1) * pageSize + 1}-{currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
			</Typography>
			<Pagination
				color="secondary"
				size="large"
				count={totalPages}
				page={currentPage}
				onChange={(_, page) => onPageChange(page)}
			/>
		</Box>
	);
};

export default AppPagination;