import { CircularProgress , Typography, Box} from "@mui/material"

const SuspenceLoader = () => {
  return (
    <Box>
      <CircularProgress/>
      <Typography>Loading...</Typography>
    </Box>
  )
}

export default SuspenceLoader