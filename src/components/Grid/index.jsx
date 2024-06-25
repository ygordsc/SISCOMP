import { Grid } from '@mui/material';

const DefaultGrid = (props) => {
	return (
		<Grid {...props}>
			{props.children}
		</Grid>
	)
}

export default DefaultGrid;