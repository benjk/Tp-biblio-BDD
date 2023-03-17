import { createConnection } from "mysql";
// Import des Controller
import initRepo from "./controllers/BookController.js";

// Constantes
const BDD_HOSTURL = "localhost";
const BDD_USER = "root";
const BDD_PASSWORD = "root";
const BDD_BASENAME = "biblio";

// Connexion à la BDD
const connection = createConnection({
  host: BDD_HOSTURL,
  user: BDD_USER,
  password: BDD_PASSWORD,
  database: BDD_BASENAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySql server");
});

initRepo();

export default connection;
