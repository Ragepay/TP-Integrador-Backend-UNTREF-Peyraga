import swaggerJsDoc from "swagger-jsdoc";
import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TP-INTEGRADOR-PEYRAGA",
      description: "Documentation de TP-INTEGRADOR-PEYRAGA",
    },
    servers: [
      {
        url: "http://localhost:9000/",
        description: "Servidor local"
      },
      {
        url: "http://urldeprod.com/",
        description: "Servidor de produccion"
      }
    ]
  },
  apis: [__dirname + "/src/docs/*.yaml"],
};

const docSpec = swaggerJsDoc(options);
export default docSpec;
