import * as Yup from 'yup';

const cpfRegex = /^\d{3}[\.\s-]?\d{3}[\.\s-]?\d{3}[\.\s-]?\d{2}$/;
const cepRegex = /^\d{5}-?\d{3}$/;
const phoneRegex = /^\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/;

export const stepOneSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  cpf: Yup.string()
    .required('Obrigatório')
    .matches(cpfRegex, 'CPF deve conter 11 dígitos'),
  social_name: Yup.string().required('Obrigatório'),
});

export const stepTwoSchema = Yup.object({
  name: Yup.string(),
  sex: Yup.string().required('Obrigatório'),
  registration_: Yup.string().required('Obrigatório'),
  registration_state: Yup.string().required('Obrigatório'),
  registration_place: Yup.string().required('Obrigatório'),
  address: Yup.string().required('Obrigatório'),
  address_number: Yup.string().required('Obrigatório'),
  address_complement: Yup.string(),
  address_neighborhood: Yup.string().required('Obrigatório'),
  address_city: Yup.string().required('Obrigatório'),
  address_state: Yup.string().required('Obrigatório'),
  address_zipcode: Yup.string()
    .required('Obrigatório')
    .matches(cepRegex, 'CEP deve conter apenas 8 números'),
  cell_phone: Yup.string()
    .required('Obrigatório')
    .matches(phoneRegex, 'Número de celular inválido'),
  // phone: Yup.string()
  //   .nullable()
  //   .matches(phoneRegex, 'Telefone inválido')
  //   .notRequired(),
  other_email: Yup.string().email('Email inválido'),
  quota: Yup.string().required('Obrigatório'),
  // quota_id: Yup.number().required('Obrigatório'),
});

export const stepThreeSchema = Yup.object({
  education_level: Yup.string(),
  graduation_course: Yup.string().required('Obrigatório'),
  graduation_year: Yup.string().required('Obrigatório'),
  graduation_institution: Yup.string().required('Obrigatório'),
  specialization_course: Yup.string(),
  specialization_year: Yup.string(),
  specialization_institution: Yup.string(),
  lattes_link: Yup.string().url('URL inválida'),
});

export function getValidationSchema(step: number) {
  switch (step) {
    case 1:
      return stepOneSchema;
    case 2:
      return stepTwoSchema;
    case 3:
      return stepThreeSchema;
    default:
      return Yup.object();
  }
}
