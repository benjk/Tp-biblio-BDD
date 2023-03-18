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
  
  app.post("/api/livre", (req, res) => {
    // Attention normalement avant d'envoyer des données en base il faut les valider coté front ET coté serveur
    let titre = req.body.titre;
    let auteur = req.body.auteur;
    let nbpages = req.body.nbpages;
  
    let query = `INSERT INTO LIVRE (titre, auteur, nbpages, disponible) VALUES ('${titre}', '${auteur}', '${nbpages}', true);`;
  
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
          insertId: result.insertId
        });
        console.log("User reçu par la bdd");
      }
    });
  });

  app.post("/api/emprunter", (req, res) => {
    console.log(req.body);
    let livreId = req.body.id;
    let disponible = req.body.disponible;
    console.log("mon ID: " + livreId);
    console.log("ma dispo: " + disponible);
  
    let query = `UPDATE LIVRE SET disponible = ${disponible} WHERE id = ${livreId};`;
  
    console.log("POST Receptionné par le serveur");
  
    connection.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          msg: "Some thing went wrong please try again",
        });
        console.log("probleme survenu lors du post d'un Livre");
      } else {
        res.status(200).json({
          msg: "Livre modifié"
        });
        console.log("Livre reçu par la bdd");
      }
    });
  });


  // Initialisation bodyparser OBLIGATOIRE car juste avant le GET
  app.use(express.json());
  app.use(express.urlencoded());
  app.get("/api/livres", (req, res) => {
    let query = `SELECT * FROM LIVRE;`;
  
    connection.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          msg: "Some thing went wrong please try again",
        });
        console.log("probleme survenu lors de la récupération des livres");
      } else {
        res.status(200).json({
          msg: "Livres récupérés",
          data: result,
        });
        console.log("Livres reçu depuis la base");
      }
    });
  });
}

export default initRepo;
