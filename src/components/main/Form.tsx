import { CRYPTO_CONVERSIONS } from "@/helpers/convert-crypto-denomination";
import type { AppDispatch, RootState } from "@/state/store";
import {
  modifyWallet,
  recalculateSingleCrypto,
} from "@/state/user-data/userDataSlice";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type FormProps = {
  id: string;
  unit: string;
};

export interface FormData {
  id: string;
  amount: number;
  unit: string;
  comment: string;
}

export default function Form({ id, unit }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { wallet } = useSelector((state: RootState) => state.userData);
  const items = useSelector((state: RootState) => state.crypto);
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      id: id,
      amount: 1000,
      unit: unit,
      comment: "",
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(modifyWallet(data));
    dispatch(recalculateSingleCrypto({ data, cryptoData: items }));
  };

  useEffect(() => {
    if (wallet[id]) {
      const { amount, unit, comment } = wallet[id];
      reset({ id, amount, unit, comment });
    }
  }, [wallet]);

  const denomination = CRYPTO_CONVERSIONS[id].smallestUnit;

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
        rules={{
          required: "Amount is required",
          validate: (value) => value > 0 || "Amount must be greater than 0",
        }}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <InputLabel
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                mb: 1,
              }}
            >
              Amount:
            </InputLabel>
            <TextField
              fullWidth
              {...field}
              type="number"
              placeholder="Enter amount"
              error={!!error}
              helperText={error?.message}
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
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
        )}
      />

      <Controller
        name="unit"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                mb: 1,
              }}
            >
              Unit:
            </InputLabel>
            <Select
              fullWidth
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
              <MenuItem value={denomination}>{denomination}</MenuItem>
            </Select>
          </Box>
        )}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <Box>
            <InputLabel
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                mb: 1,
              }}
            >
              Comment:
            </InputLabel>
            <TextField
              fullWidth
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
          </Box>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{
          alignSelf: "flex-end",
          mt: 2,
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
