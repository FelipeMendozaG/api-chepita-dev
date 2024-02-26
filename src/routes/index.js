
const express = require('express');
const fs = require('fs');
const router = express.Router();
const env = require('../config');
const PATH_ROUTES = __dirname+'/v1';
const removeExtension = (fileName)=>{
    return fileName.split('.').shift()
}
fs.readdirSync(PATH_ROUTES).filter( (file)=>{
    const name = removeExtension(file)
    if(name!=='index'){
        console.log('cargando ruta '+name);
        router.use(`/${env.version}/${name}`,require(`./${env.version}/${file}`))
    }
});

module.exports = router;
