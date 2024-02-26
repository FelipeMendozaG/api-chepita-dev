const express = require('express');
const cors = require('cors');
const app = express();
const {port} = require('./src/config')
app.use(cors());
app.use(express.json());
app.use('/api',require('./src/routes'))
app.listen(port,()=>{
    console.log(`Aplicacion corriendo en: http://localhost:${port}/api`)
});