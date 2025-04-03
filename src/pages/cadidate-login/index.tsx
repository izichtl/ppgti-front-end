import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import { useCandidateLogin } from '../../hooks/candidate-login';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';
import StepOne from './step-one';
import StepTWO from './step-two';
import StepTwo from './step-two';
import StepThree from './step-three';
import { getUserFromToken } from '../../utils/get-user-from-token';
import { useAuth } from '../../hooks/auth';

// TODO
// PRECISA VALIDAR TODOS OS CAMPOS
// PRECISA AJUSTAR O TOGGLE DE COTAS
// PRECISA DE FN PARA VALIDAR O PASSO QUE O USÁRIO ESTÁ
// CASO TUDO PREENCHIDO ENVIAR PARA DASHBOARD
// CASO INCOMPLETO ENVIAR PARA O PASSO A SER COMPLETO
// PRECISA CONFIGURAR PARA ACEITAR QUE ELE SEJA CARREGADO PÓS LOGIN
// PRECISA VALIDAR O SEXO DO USUÁRIO
// CASO MASCULINO FAZER COM QUE RESERVISTA SEJA OBRIGATÓRIO
// PRECISA VALIDAR SE TOGGLE DE COTA ESTÁ MARCADO, QUAL ESTA MARCADO
// CASO ESTEJA, TORNAR AQUELE PDF ESPECÍFICO OBRIGATÓRIO

// PRECISA CRIAR O SUMBIT STEP PARA 2
// PRECISA CRIAR O SUBMIT STEP PARA 3 (TODOS OS PDFS PREENCHIDOS)

const Login: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { login } = useAuth();

  type initialCandidateProps = {
    // step-one
    // auth-data
    email: string;
    cpf: string;
    name: string;

    // step-two
    // personal-data
    social_name: string;
    sex: string;
    registration_: string;
    registration_state: string;
    registration_place: string;
    address: string;
    address_number: string;
    address_complement: string;
    address_neighborhood: string;
    address_city: string;
    address_state: string;
    address_zipcode: string;
    cell_phone: string;
    phone: string;
    other_email: string;

    //  step-three
    // academic-data
    title?: string;
    graduation_course?: string;
    graduation_year?: string;
    graduation_institution?: string;
    specialization_course?: string;
    specialization_year?: string;
    specialization_institution?: string;
    lattes_link?: string;
  };

  //! IMPORTANT
  //! PRECISA VALIDAR OS CAMPOS POR UMA FN
  //! CASO A VALIDAÇÃO INFORME TODOS OS DADOS
  //! PASSAR ELE DIRETO PARA A INSCRIÇÃO

  const initial: initialCandidateProps = {
    email: '',
    cpf: '',
    name: '',
    social_name: '',
    sex: '',
    registration_: '',
    registration_state: '',
    registration_place: '',
    address: '',
    address_number: '',
    address_complement: '',
    address_neighborhood: '',
    address_city: '',
    address_state: '',
    address_zipcode: '',
    cell_phone: '',
    phone: '',
    other_email: '',
    title: '',
    graduation_course: '',
    graduation_year: '',
    graduation_institution: '',
    specialization_course: '',
    specialization_year: '',
    specialization_institution: '',
    lattes_link: '',
  };

  const useFormikProps: FormikProps<initialCandidateProps> =
    useFormik<initialCandidateProps>({
      initialValues: initial,
      validateOnBlur: false,
      validateOnMount: false,
      // validationSchema: () => {
      // },
      onSubmit: async (values: initialCandidateProps) => {
        console.log(values, 'values');
        if (currentStep === 1) {
          await handlerLogin();
          setCurrentStep((prevStep) => prevStep + 1);
        }
        if (currentStep === 2) {
          setCurrentStep((prevStep) => prevStep + 1);
        }
      },
    });

  const { useCandidateLoginFetcher } = useCandidateLogin({
    email: useFormikProps.values.email,
    cpf: useFormikProps.values.cpf,
    name: useFormikProps.values.name,
  });

  const { trigger: triggerLogin, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useCandidateLoginFetcher', useCandidateLoginFetcher, {
      revalidate: false,
    });

  const handlerLogin = async () => {
    try {
      const response = await triggerLogin();
      const { data } = response;
      const { token } = data.data;
      login(token);
      const user = await getUserFromToken(token);
      useFormikProps.setValues(user as any);
    } catch (error: AxiosError | any) {
      console.log(error!.response, 'error');
    }
  };

  const handleButtonClick = () => {
    useFormikProps.submitForm();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
        padding: 1,
      }}
    >
      {currentStep === 1 && (
        <StepOne
          useFormikProps={useFormikProps}
          setCurrentStep={setCurrentStep}
          handlerNextStep={handleButtonClick}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          useFormikProps={useFormikProps}
          setCurrentStep={setCurrentStep}
          handlerNextStep={handleButtonClick}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          // useFormikProps={useFormikProps}
          // setCurrentStep={setCurrentStep}
          cpf={useFormikProps.values.cpf}
          handlerNextStep={handleButtonClick}
        />
      )}
    </Box>
  );
};

export default Login;
