import { APIDecoratorWithBaseURI } from "../../service";

export type ComissaoLoginProps = {
  email: string;
  cpf: string;
  name: string;
  authorizationCode: string;
};

export const useComissaoLogin = (payload: ComissaoLoginProps) => {
  const useComissaoLoginFetcher = async () => {
    return await APIDecoratorWithBaseURI().post("/v1/auth/comissao/register", {
      ...payload,
    });
  };

  return {
    useComissaoLoginFetcher,
  };
};
