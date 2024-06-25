import { Button } from "@mui/material";

const DefaultButton = (props) => {
	return <Button {...props}>{props.children}</Button>;
};

export default DefaultButton;
