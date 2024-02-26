#!/usr/bin/env node

const {Command} = require('commander');
const fs = require('fs');
const {version} = require('./src/config')
const program = new Command();

program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.8.0');

program
    .command('saludar <nombre>')
    .description('Saluda a alguien')
    .action((nombre) => {
        console.log(`¡Hola, ${nombre}!`);
    });
program
    .command('make:model')
    .description('Crea un modelo')
    .action(()=>{
        console.log('Modelo creado de manera correcta');
    });
program
    .command('make:routes-init')
    .description('Habilita las rutas dentro de nuestro proyecto ')
    .action(()=>{
        const folderPath = './src/routes';
        const indexPath = './src/routes/index.js';
        const indexContent = `
const express = require('express');
const fs = require('fs');
const router = express.Router();
const env = require('../config');
const PATH_ROUTES = __dirname+'/${version}';
const removeExtension = (fileName)=>{
    return fileName.split('.').shift()
}
fs.readdirSync(PATH_ROUTES).filter( (file)=>{
    const name = removeExtension(file)
    if(name!=='index'){
        console.log('cargando ruta '+name);
        router.use(\`/\${env.version}/\${name}\`,require(\`./\${env.version}/\${file}\`))
    }
});

module.exports = router;
`;
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            fs.mkdirSync(folderPath+`/${version}`)
            console.log('Se ha creado la carpeta "routes".');
        } else {
            console.log('La carpeta "routes" ya existe.');
        }
        // Crear el archivo index.js solo si no existe
        if (!fs.existsSync(indexPath)) {
            fs.writeFileSync(indexPath, indexContent);
            console.log('Se ha creado el archivo "index.js" en la carpeta "src/routes".');
        } else {
            console.log('El archivo "index.js" ya existe en la carpeta "src/routes".');
        }
        console.log('Acabamos de crear el directorio de rutas para el proyecto');
    });
program
    .command('make:routes <nameroute>')
    .description('Crea una ruta para el proyecto especificando el nombre de ruta')
    .action((nameroute)=>{
        const folderPath = './src/routes';
        const indexPath = `./src/routes/${version}/${nameroute}.js`;
        const contentRoute = `
const express=require('express');
const routes = express.Router();

module.exports=routes
`
        if (!fs.existsSync(folderPath)) {
            console.log('Se ha creado la carpeta "routes".');
            return ;
        }
        if (!fs.existsSync(indexPath)) {
            fs.writeFileSync(indexPath, contentRoute);
            console.log(`Se ha creado el archivo "${nameroute}.js" en la carpeta "src/routes/${version}".`);
        } else {
            console.log(`El archivo "${nameroute}.js" ya existe en la carpeta "src/routes/${version}".`);
        }
    });

program.parse(process.argv);
