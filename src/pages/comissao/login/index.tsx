import React, { useState } from "react";
import { AxiosError } from "axios";
import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { useNavigate } from "react-router-dom";

import {
  useComissaoLogin,
  useComissaoRegister,
} from "../../../hooks/comissao-login";
import { useAuth } from "../../../hooks/auth";

import Form from "./form";

const ComissaoLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoginMode, setIsLoginMode] = useState(false);

  type initialComissaoLoginProps = {
    email: string;
    matricula: string;
    name: string;
    authorizationCode: string;
    cpf: string;
    password: string;
  };

  const initial: initialComissaoLoginProps = {
    email: "",
    matricula: "",
    name: "",
    authorizationCode: "",
    cpf: "",
    password: "",
  };

  const useFormikProps: FormikProps<initialComissaoLoginProps> =
    useFormik<initialComissaoLoginProps>({
      initialValues: initial,
      enableReinitialize: true,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: () => {
        const baseSchema = {
          matricula: Yup.string().required("Matrícula é obrigatório"),
          password: Yup.string()
            .min(6, "Senha deve ter pelo menos 6 caracteres")
            .required("Senha é obrigatória"),
        };

        if (isLoginMode) {
          return Yup.object().shape(baseSchema);
        } else {
          return Yup.object().shape({
            ...baseSchema,
            cpf: Yup.string().required("CPF é obrigatório"),
            email: Yup.string()
              .email("Email inválido")
              .required("Email é obrigatório"),
            name: Yup.string().required("Nome é obrigatório"),
            authorizationCode: Yup.string().required(
              "Código de autorização é obrigatório"
            ),
          });
        }
      },
      onSubmit: async (values: initialComissaoLoginProps) => {
        await handlerSubmit();
      },
    });

  const { useComissaoRegisterFetcher } = useComissaoRegister({
    email: useFormikProps.values.email,
    matricula: useFormikProps.values.matricula,
    name: useFormikProps.values.name,
    authorizationCode: useFormikProps.values.authorizationCode,
    cpf: useFormikProps.values.cpf,
    password: useFormikProps.values.password,
  });

  const { useComissaoLoginFetcher } = useComissaoLogin({
    matricula: useFormikProps.values.matricula,
    password: useFormikProps.values.password,
  });

  const {
    trigger: triggerRegister,
    isMutating: isMutatingRegister,
  }: SWRMutationResponse<any> = useSWRMutation(
    "useComissaoRegisterFetcher",
    useComissaoRegisterFetcher,
    {
      revalidate: false,
    }
  );

  const {
    trigger: triggerLogin,
    isMutating: isMutatingLogin,
  }: SWRMutationResponse<any> = useSWRMutation(
    "useComissaoLoginFetcher",
    useComissaoLoginFetcher,
    {
      revalidate: false,
    }
  );

  const handlerSubmit = async () => {
    try {
      const response = isLoginMode
        ? await triggerLogin()
        : await triggerRegister();
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        p: 2,
        pt: 8,
        bgcolor: "#f0f4f8",
      }}
    >
      <Container maxWidth="sm">
        <Form
          useFormikProps={useFormikProps}
          handlerNextStep={handleButtonClick}
          isMobile={isMobile}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
        />
      </Container>
    </Box>
  );
};

export default ComissaoLoginPage;
