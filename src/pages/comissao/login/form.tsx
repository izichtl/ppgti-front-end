import { Box, TextField, Typography, Button } from "@mui/material";

const Form = ({ handlerNextStep, useFormikProps }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
        padding: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          backgroundColor: "#eeeeee",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login da Comissão
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Acesse com seus dados e código de autorização.
        </Typography>
        <TextField
          label="Nome"
          name="name"
          variant="outlined"
          placeholder="Seu nome"
          fullWidth
          value={useFormikProps.values.name}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.name !== undefined &&
            useFormikProps.touched.name
          }
          helperText={useFormikProps.errors.name}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          placeholder="seu-email@aqui.com"
          fullWidth
          value={useFormikProps.values.email}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.email !== undefined &&
            useFormikProps.touched.email
          }
          helperText={useFormikProps.errors.email}
        />
        <TextField
          label="CPF"
          variant="outlined"
          fullWidth
          name="cpf"
          placeholder="111.222.333.44"
          value={useFormikProps.values.cpf}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.cpf !== undefined &&
            useFormikProps.touched.cpf
          }
          helperText={useFormikProps.errors.cpf}
        />
        <TextField
          label="Código de Autorização"
          variant="outlined"
          fullWidth
          name="authorizationCode"
          placeholder="Seu código"
          value={useFormikProps.values.authorizationCode}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.authorizationCode !== undefined &&
            useFormikProps.touched.authorizationCode
          }
          helperText={useFormikProps.errors.authorizationCode}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlerNextStep}
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
