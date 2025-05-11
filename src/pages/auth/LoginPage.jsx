import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useLoginMutation } from "@services/rootApi";

const LoginPage = () => {
  const [login, { data = {}, isLoading, error, isSuccess, isError }] =
    useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
      .required(),
    password: yup.string().required(),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData) {
    console.log({ formData });
    login(formData);
  }

  console.log({ email: getValues("email") });

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/verify-otp", {
        state: {
          email: getValues("email"),
        },
      });
    }
  }, [isError, error, dispatch, data.message, isSuccess, navigate, getValues]);

  return (
    <div>
      <p className="mb-5 text-center text-lg font-bold">Login</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors["email"]}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          {isLoading && (
            <CircularProgress size="16px" color="warning" className="mr-1" />
          )}
          Sign in
        </Button>
      </form>
      <p className="mt-4">
        New on our platform? <Link to="/register"> Create an account</Link>
      </p>
    </div>
  );
};
export default LoginPage;
