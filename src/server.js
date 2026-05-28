import app from './app.js';
import env from './config/env.js';


app.listen(env.PORT, ()=>{
    console.log(`Servidor rodando no seguinte link http://localhost:${env.PORT}/`);
})