import {
  Box,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

type FormProps = {
  unit: string;
};

export default function Form({ unit }: FormProps) {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted");
      }}
    >
      <FormControl>
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Amount:
        </Typography>
        <TextField
          defaultValue="1000"
          placeholder="Enter amount"
          sx={{
            backgroundColor: "#545454",
            borderRadius: "5px",
            borderColor: "#fff",
            "& .MuiOutlinedInput-root": {
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
          }}
        />
      </FormControl>

      <FormControl>
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Unit:
        </Typography>
        <Select
          defaultValue={unit}
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            color: "white",
            backgroundColor: "#545454",
            borderRadius: "5px",
            borderColor: "#fff",
            "& .MuiOutlinedInput-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "& .MuiSvgIcon-root": {
              color: "#D9D9D9",
            },
          }}
        >
          <MenuItem value={unit}>{unit}</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Comment:
        </Typography>
        <TextField
          placeholder="Enter comment"
          defaultValue="Some comment"
          multiline
          maxRows={2}
          sx={{
            backgroundColor: "#545454",
            borderRadius: "5px",
            borderColor: "#fff",
            "& .MuiOutlinedInput-root": {
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
          }}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{
          alignSelf: "flex-end",
          mt: 2,
          px: 4,
          border: "1px solid #fff",
          borderRadius: "5px",
          backgroundColor: "#2F8D2F",
          width: "120px",
          height: "30px",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
