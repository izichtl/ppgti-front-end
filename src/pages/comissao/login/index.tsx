import React from "react";
import { AxiosError } from "axios";
import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import { Box } from "@mui/material";
import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { useNavigate } from "react-router-dom";

import { useComissaoLogin } from "../../../hooks/comissao-login";
import { useAuth } from "../../../hooks/auth";
import { getUserFromToken } from "../../../utils/get-user-from-token";

import Form from "./form";

const ComissaoLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  type initialComissaoLoginProps = {
    email: string;
    cpf: string;
    name: string;
    authorizationCode: string;
  };

  const initial: initialComissaoLoginProps = {
    email: "",
    cpf: "",
    name: "",
    authorizationCode: "",
  };

  const useFormikProps: FormikProps<initialComissaoLoginProps> =
    useFormik<initialComissaoLoginProps>({
      initialValues: initial,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: () => {
        return Yup.object().shape({
          email: Yup.string()
            .email("Email inválido")
            .required("Email é obrigatório"),
          cpf: Yup.string().required("CPF é obrigatório"),
          name: Yup.string().required("Nome é obrigatório"),
          authorizationCode: Yup.string().required(
            "Código de autorização é obrigatório"
          ),
        });
      },
      onSubmit: async (values: initialComissaoLoginProps) => {
        await handlerLogin();
      },
    });

  const { useComissaoLoginFetcher } = useComissaoLogin({
    email: useFormikProps.values.email,
    cpf: useFormikProps.values.cpf,
    name: useFormikProps.values.name,
    authorizationCode: useFormikProps.values.authorizationCode,
  });

  const { trigger: triggerLogin, isMutating }: SWRMutationResponse<any> =
    useSWRMutation("useComissaoLoginFetcher", useComissaoLoginFetcher, {
      revalidate: false,
    });

  const handlerLogin = async () => {
    try {
      const response = await triggerLogin();
      const { data } = response;
      const { token } = data.data;
      login(token);
      navigate("/comissao/dashboard");
    } catch (error: AxiosError | any) {
      console.log(error!.response, "error");
    }
  };

  const handleButtonClick = () => {
    useFormikProps.submitForm();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
        padding: 1,
      }}
    >
      <Form
        useFormikProps={useFormikProps}
        handlerNextStep={handleButtonClick}
      />
    </Box>
  );
};

export default ComissaoLoginPage;
