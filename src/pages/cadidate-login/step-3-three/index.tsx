import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

const StepThree = ({ handlerNextStep, useFormikProps }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const errors = useFormikProps.errors;
    // console.log(errors, 'academic errors');
    if (Object.keys(errors).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [useFormikProps]);

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          maxWidth: 900,
          mx: 'auto',
          p: 4,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: '#fff',
        }}
      >
        <Typography variant='h5' align='center' gutterBottom>
          Formação Acadêmica
        </Typography>
        <Typography
          variant='body2'
          align='center'
          color='text.secondary'
          gutterBottom
        >
          Preencha os dados da sua formação acadêmica para prosseguir.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label='Maior Titulação'
              name='education_level'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.education_level}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.education_level &&
                !!useFormikProps.touched.education_level
              }
              helperText={useFormikProps.errors.education_level}
            />
            <TextField
              label='Curso de Graduação'
              name='graduation_course'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.graduation_course}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.graduation_course &&
                !!useFormikProps.touched.graduation_course
              }
              helperText={useFormikProps.errors.graduation_course}
            />
            <TextField
              label='Ano da Graduação'
              name='graduation_year'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.graduation_year}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.graduation_year &&
                !!useFormikProps.touched.graduation_year
              }
              helperText={useFormikProps.errors.graduation_year}
            />
            <TextField
              label='Instituição de Graduação'
              name='graduation_institution'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.graduation_institution}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.graduation_institution &&
                !!useFormikProps.touched.graduation_institution
              }
              helperText={useFormikProps.errors.graduation_institution}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label='Curso de Especialização'
              name='specialization_course'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.specialization_course}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.specialization_course &&
                !!useFormikProps.touched.specialization_course
              }
              helperText={useFormikProps.errors.specialization_course}
            />
            <TextField
              label='Ano da Especialização'
              name='specialization_year'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.specialization_year}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.specialization_year &&
                !!useFormikProps.touched.specialization_year
              }
              helperText={useFormikProps.errors.specialization_year}
            />
            <TextField
              label='Instituição da Especialização'
              name='specialization_institution'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.specialization_institution}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.specialization_institution &&
                !!useFormikProps.touched.specialization_institution
              }
              helperText={useFormikProps.errors.specialization_institution}
            />
            <TextField
              label='Link do Currículo Lattes'
              name='lattes_link'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.lattes_link}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.lattes_link &&
                !!useFormikProps.touched.lattes_link
              }
              helperText={useFormikProps.errors.lattes_link}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 4,
                gap: 2,
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{
                  flex: 1,
                  textAlign: { xs: 'center', sm: 'left' },
                  fontWeight: 500,
                }}
              >
                Preencha todos os campos obrigatórios para avançar
              </Typography>

              <Button
                variant='contained'
                color='primary'
                disabled={disabled}
                size='large'
                sx={{
                  width: { xs: '100%', sm: '100%' },
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  alignSelf: { sm: 'flex-start' },
                }}
                onClick={handlerNextStep}
              >
                Avançar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StepThree;
