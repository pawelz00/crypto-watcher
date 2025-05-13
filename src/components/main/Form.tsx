import type { AppDispatch, RootState } from "@/state/store";
import { modifyWallet } from "@/state/user-data/userDataSlice";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type FormProps = {
  id: string;
  unit: string;
};

interface FormData {
  id: string;
  amount: number;
  unit: string;
  comment: string;
}

export default function Form({ id, unit }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { wallet } = useSelector((state: RootState) => state.userData);
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      id: id,
      amount: 1000,
      unit: unit,
      comment: "Some comment",
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(modifyWallet(data));
  };

  useEffect(() => {
    if (wallet[id]) {
      const { amount, unit, comment } = wallet[id];
      reset({ id, amount, unit, comment });
    }
  }, [wallet]);

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
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
        )}
      />

      <Controller
        name="unit"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
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
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Enter comment"
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
        )}
      />

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
