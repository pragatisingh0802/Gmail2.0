import { Box , Typography} from "@mui/material";
import { useRouteError } from "react-router-dom"; //custom hook

const ErrorComponent = () => {
    const error= useRouteError(); //shows the actual error for developer 

  return (
    <Box style={{marginLeft:250}}>
        <Typography>There was an error loading the page</Typography>
    </Box>
  )
}

export default ErrorComponent;