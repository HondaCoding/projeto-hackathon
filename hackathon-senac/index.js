const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//--------- ROTAS MODULARIZADAS -------------
const recursoRoutes = require('./routers/recurso');
const funcaoRoutes = require('./routers/funcao')
const responsavelRoutes = require("./routers/responsavel");
const reservaRoutes = require("./routers/reserva");

app.use("/api/recurso", recursoRoutes);
app.use("/api/funcao", funcaoRoutes);
app.use("/api/responsavel", responsavelRoutes);
app.use("/api/reserva", reservaRoutes);

app.listen(port, (error) => {
    if(error) {
        console.log("Deu ERRO");
        return;
    }
    console.log("Subiu show!")

});
