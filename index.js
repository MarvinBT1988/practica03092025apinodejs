const express = require('express');
const path = require('path')

const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.post('/cliente', (req, res) => {
  // Desestructurar el nombre y apellido del cuerpo de la solicitud (body)
  const { nombre, apellido } = req.body;

  // Validar si los campos están presentes
  if (!nombre || !apellido) {
    // Si falta alguno, enviar un error 400 (Bad Request)
    return res.status(400).json({ error: 'Faltan el nombre o el apellido' });
  }

  // Concatenar el nombre y apellido para formar el nombre completo
  const nombreCompleto = `${nombre} ${apellido}`;

  // Enviar una respuesta JSON con el nombre completo
  res.json({ nombreCompleto: nombreCompleto });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})