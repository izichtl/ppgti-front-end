export type QuotaOption = {
  id: number;
  label: string;
  value: string;
};

const quotaOptions: QuotaOption[] = [
  { id: 1, label: 'Não Optante', value: 'nao_optante' },
  { id: 2, label: 'Afrodescendente ou Indígena', value: 'afro_ou_inde' },
  { id: 3, label: 'Pessoa com Deficiência', value: 'pcd' },
  { id: 4, label: 'Servidor permanente do IFPB', value: 'servidor_if' },
];

export const getQuotaLabel = (id?: number) => {
  const option = quotaOptions.find((opt) => opt.id === id);
  return option ? option.label : '';
};

export const getQuotaValue = (id?: number) => {
  const option = quotaOptions.find((opt) => opt.id === id);
  return option ? option.value : '';
};
