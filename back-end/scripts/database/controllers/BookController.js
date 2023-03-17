import app from "../../app.js";
import connection from "../connectBdd.js";
import express from "express";
// Librairie spécifique pour communiquer entre 2 ports différents
import cors from "cors";

const initRepo = function(){
  // Initialisation bodyparser
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
  
  app.post("/api/utilisateur", (req, res) => {
    // Attention normalement avant d'envoyer des données en base il faut les valider coté front ET coté serveur
    let username = req.body.username;
    let mdp = req.body.mdp;
  
    let query = `INSERT INTO UTILISATEUR (username, mdp) VALUES ('${username}', '${mdp}');`;
  
    console.log("POST Receptionné par le serveur");
  
    connection.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          msg: "Some thing went wrong please try again",
        });
        console.log("probleme survenu lors du post d'un user");
      } else {
        res.status(200).json({
          msg: "Utilisateur enregistré",
        });
        console.log("User reçu par la bdd");
      }
    });
  });
  
  app.get("/api/livres", (req, res) => {
    let query = `SELECT * FROM LIVRE;`;
  
    connection.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          msg: "Some thing went wrong please try again",
        });
        console.log("probleme survenu lors de la récupération des users");
      } else {
        res.status(200).json({
          msg: "Utilisateurs récupérés",
          data: result,
        });
        console.log("Users reçu depuis la base");
      }
    });
  });
}

export default initRepo;
