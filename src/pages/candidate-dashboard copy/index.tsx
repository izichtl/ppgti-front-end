import React, { useState } from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import ScrollToTop from '../../components/scroll-top';
import { useBoolean } from '../../hooks/use-boolean';
import CadastroFormModal, { DadosFormulario } from '../../components/process-register-modal';
import SelectionProcessCard from '../../components/card-processes copy';

const SelectionProcessPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');
  
  // Dados mock de um candidato
  const mockCandidate = {
    email: "aluno@gmail.com",
    nome: "Pedro Silva",
    cpf: "111.111.111-11",
    rg: "1234567",
    endereco: "Rua Duque de Caxias, 123, Bairro Centro",
    telFixo: "(11) 1111-1111",
    telCel: "(11) 11111-1111",
    email2: "aluno2@gmail.com",
    graduacao: "Ciências da Computação",
    anoGraduacao: "2015",
    instituicaoGraduacao: "UFPB",
    cursoEspecializacao: "Inteligência Artificial",
    anoEspecializacao: "2018",
    instituicaoEspecializacao: "Instituto de Tecnologia da Paraíba",
    linkLattes: "https://lattes.cnpq.br/1234567890",
    idCota: "1",
    cota: "Cota Escolhida",
    linhaPesquisa: "Inteligência Artificial Aplicada",
    temaPesquisa: "Aplicações de IA na Saúde Pública",
  };

  // Controla o modal
  const modal = useBoolean();
  const [dadosIniciais, setDadosIniciais] = useState<DadosFormulario | undefined>();

  return (
    <Box sx={{ width: { xs: '100%', md: '80%' }, minHeight: '100vh', mx: 'auto', p: { xs: 2, md: 4 }, pt: 8 }}>
      <ScrollToTop />

      <Grid container spacing={2} alignItems="center" mb={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold">
            Homologação de Candidato
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="text.secondary" textAlign={isMobile ? 'left' : 'right'}>
            {currentDateTime}
          </Typography>
        </Grid>
      </Grid>

      {/* Passando os dados mock para o SelectionProcessCard */}
      <SelectionProcessCard
        id={1}
        email={mockCandidate.email}
        nome={mockCandidate.nome}
        cpf={mockCandidate.cpf}
        rg={mockCandidate.rg}
        endereco={mockCandidate.endereco}
        telFixo={mockCandidate.telFixo}
        telCel={mockCandidate.telCel}
        email2={mockCandidate.email2}
        graduacao={mockCandidate.graduacao}
        anoGraduacao={mockCandidate.anoGraduacao}
        instituicaoGraduacao={mockCandidate.instituicaoGraduacao}
        cursoEspecializacao={mockCandidate.cursoEspecializacao}
        anoEspecializacao={mockCandidate.anoEspecializacao}
        instituicaoEspecializacao={mockCandidate.instituicaoEspecializacao}
        linkLattes={mockCandidate.linkLattes}
        idCota={mockCandidate.idCota}
        cota={mockCandidate.cota}
        linhaPesquisa={mockCandidate.linhaPesquisa}
        temaPesquisa={mockCandidate.temaPesquisa}
        statusColor="#4CAF50"
        onApply={() => {
          setDadosIniciais(undefined);
          modal.onTrue();
        }}
      />

      <CadastroFormModal open={modal.value} onClose={modal.onFalse} dadosIniciais={dadosIniciais} opcoesLinhaPesquisa={[]} />
    </Box>
  );
};

export default SelectionProcessPage;
