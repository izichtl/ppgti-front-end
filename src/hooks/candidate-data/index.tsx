import { APIDecoratorWithBaseURI } from '../../service';
// TODO ajustar os types do arquivo
export type CandidateLoginProps = {
  email: string;
  cpf: string;
  name: string;
};

export interface CourtesySaleRequesteResponse {
  success: boolean;
  mensagem: string;
}

export const useCandidateUpdate = (
  payload: CandidateLoginProps,
  step: string = ''
) => {
  console.log(step, 'step');
  const url =
    step === 'stepTwo'
      ? '/v1/candidate/personal-data'
      : '/v1/candidate/academic-data';
  console.log(url, 'step');
  const useCandidateUpdateFetcher = async () => {
    return await APIDecoratorWithBaseURI().post(url, {
      ...payload,
    });
  };

  return {
    useCandidateUpdateFetcher,
  };
};
