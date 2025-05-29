import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from '@mui/material';
import CustomModal from '../custom-modal';

const opcoesLinhaPesquisa = [
  {
    value: 'Ciência de Dados e Inteligência Artificial',
    label: 'Ciência de Dados e Inteligência Artificial',
  },
  {
    value: 'Gestão e Desenvolvimento de Sistemas',
    label: 'Gestão e Desenvolvimento de Sistemas',
  },
  {
    value: 'Redes e Sistemas Distribuídos',
    label: 'Redes e Sistemas Distribuídos',
  },
];

const opcoesTemaPesquisa = [
  { value: 'Aprendizado de Máquina', label: 'Aprendizado de Máquina' },
  { value: 'Mineração de Dados', label: 'Mineração de Dados' },
  { value: 'Engenharia de Software', label: 'Engenharia de Software' },
  { value: 'UX e Inovação', label: 'UX e Inovação' },
  { value: 'Computação em Nuvem', label: 'Computação em Nuvem' },
  { value: 'IoT', label: 'IoT' },
  { value: 'Edge Computing', label: 'Edge Computing' },
];

// Tipo dos dados do formulário
export type DadosFormulario = {
  linha: string;
  tema: string;
  titulo: string;
  arquivo?: File | null;
};

type CadastroFormModalProps = {
  open: boolean;
  onClose: () => void;
  dadosIniciais?: DadosFormulario;
};

const CadastroFormModal: React.FC<CadastroFormModalProps> = ({
  open,
  onClose,
  dadosIniciais,
}) => {
  const [linha, setLinha] = useState('');
  const [tema, setTema] = useState('');
  const [titulo, setTitulo] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);

  // Preencher ou limpar os campos com base nos dados iniciais
  useEffect(() => {
    if (dadosIniciais) {
      setLinha(dadosIniciais.linha || '');
      setTema(dadosIniciais.tema || '');
      setTitulo(dadosIniciais.titulo || '');
      setArquivo(dadosIniciais.arquivo || null);
    } else {
      setLinha('');
      setTema('');
      setTitulo('');
      setArquivo(null);
    }
  }, [dadosIniciais, open]);

  const handleSubmit = () => {
    const dados = { linha, tema, titulo, arquivo };
    console.log(dadosIniciais ? 'Edição:' : 'Inscrição:', dados);
    onClose();
  };

  const isEdicao = Boolean(dadosIniciais);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={
        isEdicao
          ? 'Visualizar/Editar Inscrição'
          : 'Cadastro no Processo Seletivo'
      }
      width={500}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        mb={3}
      >
        {isEdicao
          ? 'Altere os dados da sua inscrição conforme necessário'
          : 'Preencha os dados para enviar seu pré-projeto'}
      </Typography>

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Linha de Pesquisa</InputLabel>
          <Select
            value={linha}
            label="Linha de Pesquisa"
            onChange={(e) => setLinha(e.target.value)}
          >
            <MenuItem value="">Selecione uma linha</MenuItem>
            {opcoesLinhaPesquisa.map((opcao) => (
              <MenuItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tema de Pesquisa</InputLabel>
          <Select
            value={tema}
            label="Tema de Pesquisa"
            onChange={(e) => setTema(e.target.value)}
          >
            <MenuItem value="">Selecione um tema</MenuItem>
            {opcoesTemaPesquisa.map((opcao) => (
              <MenuItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Título do Pré-Projeto"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <Button variant="outlined" component="label" fullWidth>
          Upload do Pré-Projeto (PDF)
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
          />
        </Button>

        <Typography variant="body2" color="text.secondary">
          {arquivo
            ? `Arquivo selecionado: ${arquivo.name}`
            : 'Somente arquivos PDF são aceitos.'}
        </Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            {isEdicao ? 'Salvar' : 'Enviar'}
          </Button>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default CadastroFormModal;
