import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, type, Component, error }) => {
  return (
    <div>
      <p className="mb-1 text-sm font-bold text-st-100">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              control={control}
              Component={Component}
              error={error?.message}
            />
          );
        }}
      />
      {error?.message && (
        <FormHelperText error={true}>{error.message}</FormHelperText>
      )}
    </div>
  );
};
export default FormField;
