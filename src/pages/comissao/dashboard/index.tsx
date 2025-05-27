import React from "react";
import { Box, Typography } from "@mui/material";

const ComissaoDashboardPage: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Painel da Comissão
      </Typography>
      <Typography variant="body1">
        Bem-vindo ao painel de gerenciamento da comissão.
      </Typography>
      {/* TODO: Adicionar conteúdo do painel aqui */}
    </Box>
  );
};

export default ComissaoDashboardPage;
