const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Porta onde o servidor irá escutar

// Define a pasta 'build' como o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'build')));

// Rota para servir o arquivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});

