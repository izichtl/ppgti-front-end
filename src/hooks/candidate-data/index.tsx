import { APIDecoratorWithBaseURI } from '../../service';
import useSWR from 'swr';

export type CandidateLoginProps = {
  email: string;
  cpf: string;
  name: string;
  quota?: string;
  quota_id?: number;
  social_name: string;
  sex: string;
  registration_: string;
  registration_state: string;
  registration_place: string;
  address: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  cell_phone: string;
  phone?: string;
  other_email?: string;
  education_level?: string;
  graduation_course?: string;
  graduation_year?: string;
  graduation_institution?: string;
  specialization_course?: string;
  specialization_year?: string;
  specialization_institution?: string;
  lattes_link?: string;
};

export interface CourtesySaleRequesteResponse {
  success: boolean;
  mensagem: string;
}

export const useCandidateUpdate = (
  payload: CandidateLoginProps,
  step: string = '',
) => {
  const url =
    step === 'stepTwo'
      ? '/v1/candidate/personal-data'
      : '/v1/candidate/academic-data';
  const useCandidateUpdateFetcher = async () => {
    return await APIDecoratorWithBaseURI().post(url, {
      ...payload,
    });
  };

  return {
    useCandidateUpdateFetcher,
  };
};

export const useCandidate = () => {
  const fetcher = async () => {
    const { data } = await APIDecoratorWithBaseURI().get('/v1/candidate');

    return data.data;
  };

  const { data, mutate } = useSWR('candidate', fetcher);

  return { data, mutate };
};
