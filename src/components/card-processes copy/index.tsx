import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Link,
  Stack,
  useTheme,
  Divider,
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material';

type SelectProcess = {
  id: number;
  email: string;
  nome: string;
  cpf: string;
  rg: string;
  endereco: string;
  telFixo: string;
  telCel: string;
  email2: string;
  statusColor?: string;
  graduacao: string;
  anoGraduacao: string;
  instituicaoGraduacao: string;
  cursoEspecializacao: string;
  anoEspecializacao: string;
  instituicaoEspecializacao: string;
  linkLattes: string;
  idCota: string;
  cota: string;
  linhaPesquisa: string;
  temaPesquisa: string;
  onApply?: (id: number) => void;
};

const SelectionProcessCard: React.FC<SelectProcess> = ({
  id,
  email,
  nome,
  cpf,
  rg,
  endereco,
  telFixo,
  telCel,
  email2,
  statusColor,
  graduacao,
  anoGraduacao,
  instituicaoGraduacao,
  cursoEspecializacao,
  anoEspecializacao,
  instituicaoEspecializacao,
  linkLattes,
  idCota,
  cota,
  linhaPesquisa,
  temaPesquisa,
  onApply,
}) => {
  const theme = useTheme();
  const borderColor = statusColor || theme.palette.success.main;


  // Estado para controlar o Switch
  const [checkedDadosPessoais, setCheckedDadosPessoais] = useState(false);
  const [checkedDadosAcademicos, setCheckedDadosAcademicos] = useState(false);
  const [checkedEscolhaCota, setCheckedEscolhaCota] = useState(false);
  const [checkedPreProjeto, setCheckedPreProjeto] = useState(false);
  const [checkedFormularioPontuacao, setCheckedFormularioPontuacao] = useState(false);
  const [checkedDiplomaGraduacao, setCheckedDiplomaGraduacao] = useState(false);
  const [checkedHistoricoGraduacao, setCheckedHistoricoGraduacao] = useState(false);
  const [checkedRgCpf, setCheckedRgCpf] = useState(false);
  const [checkedQuitacaoMilitar, setCheckedQuitacaoMilitar] = useState(false);
  const [checkedQuitacaoEleitoral, setCheckedQuitacaoEleitoral] = useState(false);
  const [checkedComprovanteResidencia, setCheckedComprovanteResidencia] = useState(false);
  const [checkedComprovanteCota, setCheckedComprovanteCota] = useState(false);
  const [checkedComprovanteServidorIfpb, setCheckedComprovanteServidorIfpb] = useState(false);

  const handlePersonalDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDadosPessoais(event.target.checked);
  };

  const handleAcademicDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDadosAcademicos(event.target.checked);
  };

    const handleCotaDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedEscolhaCota(event.target.checked);
  };

      const handlePreProjeto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedPreProjeto(event.target.checked);
  };

    const handleCheckFormularioPontuacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFormularioPontuacao(event.target.checked);
  };

  const handleCheckDiplomaGraduacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDiplomaGraduacao(event.target.checked);
  };
  
   const handleCheckHistoricoGraduacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedHistoricoGraduacao(event.target.checked);
  };

   const handleCheckRgCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRgCpf(event.target.checked);
  };

   const handleCheckQuitacaoMilitar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedQuitacaoMilitar(event.target.checked);
  };

  const handleCheckQuitacaoEleitoral = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedQuitacaoEleitoral(event.target.checked);
  };

  const handleCheckComprovanteResidencia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedComprovanteResidencia(event.target.checked);
  };

  const handleCheckComprovanteCota = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedComprovanteCota(event.target.checked);
  };

  const handleCheckComprovanteServidorIfpb = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedComprovanteServidorIfpb(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          width: '100%',
          mb: 3, // Espaço entre os boxes
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={25}>
          Dados Pessoais
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Homologado" color="success" />
        </Stack>
        
      </Box>
        <Divider sx={{ mb: 2 }}  /> 
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Email:</strong> {email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Nome:</strong> {nome}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>CPF:</strong> {cpf}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>RG:</strong> {rg}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Endereço:</strong> {endereco}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Tel Fixo:</strong> {telFixo}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Celular:</strong> {telCel}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Email Secundário:</strong> {email2}
        </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-start', marginLeft: -2}}>
        <FormControlLabel
          control={
            <Switch
              checked={checkedDadosPessoais}
              onChange={handlePersonalDataChange}
              name="statusSwitch"
              color="success"
              sx={{ml:5, transition: 'none'}}
            />
          }
          label={checkedDadosPessoais ? 'Conforme' : 'Não Conforme'}
          labelPlacement="start"
          sx={{ height: '100%', position:'relative', transition: 'none'}}
        />
      </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          width: '100%',
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={25}>
          Dados Acadêmicos
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Homologado" color="success" />
        </Stack>
        
      </Box>
        
        <Divider sx={{ mb: 2 }}  /> 
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Graduação:</strong> {graduacao}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Ano de Graduação:</strong> {anoGraduacao}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Instituição de Graduação:</strong> {instituicaoGraduacao}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Curso de Especialização:</strong> {cursoEspecializacao}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Ano de Especialização:</strong> {anoEspecializacao}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Instituição de Especialização:</strong> {instituicaoEspecializacao}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Link Lattes:</strong>{" "}
          <Link href={linkLattes} target="_blank">
            Acesse o Currículo Lattes
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-start', marginLeft: -2}}>
        <FormControlLabel
          control={
            <Switch
              checked={checkedDadosAcademicos}
              onChange={handleAcademicDataChange} // Certifique-se de chamar a função correta aquilDataChange}
              name="statusSwitch"
              color="success"
              sx={{ml:6}}
            />
          }
          label={checkedDadosAcademicos ? 'Conforme' : 'Não Conforme'}
          labelPlacement="start"
          sx={{ height: '100%'}}
        />
      </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          width: '100%',
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={25}>
          Upload de Arquivos Obrigatórios
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Homologado" color="success" />
        </Stack>
        
      </Box>
        <Divider sx={{ mb: 2 }}  /> 
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Formulário de pontuação preenchido e documentos comprobatórios (Anexo I)</strong> {''}
        </Typography>
        {/* Layout com botão e switch na mesma linha */}
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedFormularioPontuacao}
          onChange={handleCheckFormularioPontuacao} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedFormularioPontuacao ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>


        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Cópia do diploma ou certificado de conclusão de curso de graduação reconhecido pelo MEC</strong> {''}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedDiplomaGraduacao}
          onChange={handleCheckDiplomaGraduacao} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedDiplomaGraduacao ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Cópia do Histórico Escolar do curso de graduação</strong> {''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedHistoricoGraduacao}
          onChange={handleCheckHistoricoGraduacao} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedHistoricoGraduacao ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Cópia da carteira de identidade (RG) e CPF</strong> {''}
        </Typography>

         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedRgCpf}
          onChange={handleCheckRgCpf} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedRgCpf ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Comprovante de quitação das obrigações militares (se aplicável)</strong> {''}
        </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedQuitacaoMilitar}
          onChange={handleCheckQuitacaoMilitar} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedQuitacaoMilitar ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Comprovante de quitação das obrigações eleitorais</strong> {''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedQuitacaoEleitoral}
          onChange={handleCheckQuitacaoEleitoral} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedQuitacaoEleitoral ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Comprovante de residência</strong> {''}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedComprovanteResidencia}
          onChange={handleCheckComprovanteResidencia} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedComprovanteResidencia ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          width: '100%',
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={25}>
          Informações de Cota
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Homologado" color="success" />
        </Stack>
        
      </Box>
        <Divider sx={{ mb: 2 }}  /> 
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>ID Cota:</strong> {idCota}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Cota:</strong> {cota}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-start', marginLeft: -2}}>
        <FormControlLabel
          control={
            <Switch
              checked={checkedEscolhaCota}
              onChange={handleCotaDataChange}
              name="statusSwitch"
              color="success"
              sx={{ml:6}}
            />
          }
          label={checkedEscolhaCota ? 'Conforme' : 'Não Conforme'}
          labelPlacement="start"
          sx={{ height: '100%'}}
        />
      </Box>
      </Paper>


      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          width: '100%',
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={25}>
          Documentos Adicionais
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Homologado" color="success" />
        </Stack>
        
      </Box>
        <Divider sx={{ mb: 2 }}  /> 
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Declaração de optante por cota de ingresso (Anexo II)</strong> {cota}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedComprovanteCota}
          onChange={handleCheckComprovanteCota} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedComprovanteCota ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Declaração de cota de servidor do IFPB (se aplicável)</strong> {cota}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedComprovanteServidorIfpb}
          onChange={handleCheckComprovanteServidorIfpb} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedComprovanteServidorIfpb ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          width: '100%',
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={30}>
          Pré-Projeto de Pesquisa do Candidato
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Homologado" color="success" />
        </Stack>
      </Box>
        <Divider sx={{ mb: 2 }}  /> 
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Linha de Pesquisa: </strong> {linhaPesquisa}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Tema de Pesquisa:</strong> {temaPesquisa}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Pré-Projeto:</strong> {''}
        </Typography>


         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
    <Button
      variant="outlined"
      component="label"
      sx={{ mb: 2, mr: 2 }} // 'mr' é para adicionar margem à direita
    >
      Acessar Documento
      <input type="file" hidden />
    </Button>
    
    <FormControlLabel
      control={
        <Switch
          checked={checkedPreProjeto}
          onChange={handlePreProjeto} // Função do handle
          name="statusSwitch"
          color="success"
        />
      }
      label={checkedPreProjeto ? 'Conforme' : 'Não Conforme'}
      labelPlacement="end"
      sx={{ height: '100%', marginTop: -2, marginLeft: 0 }}
    />
  </Box>
        
      </Paper>

      <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
        {nome && (
          <Button
            variant="outlined"
            component={Link}
            href={''}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Edital
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default SelectionProcessCard;
