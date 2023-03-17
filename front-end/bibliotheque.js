// Constantes
//const selectAllLivre = "0";
const selectDispo = "1";
const selectNotDispo = "2";

var mesLivres = []

getLivres();
let monTableau = createTableauVide();

function getLivres() {
    axios
    .get("http://localhost:8081/api/livres", {
    })
    .then((res) => {
        for (const livre of res.data.data){
            mesLivres.push(new Livre(livre.id, livre.titre, livre.auteur, livre.nbpages, livre.disponible))
        }
        displayLivres();
    })
    .catch(() => {
      alert("Something Went Wrong");
    });
}

function createTableauVide() {
    var container = document.getElementById('containerAffichageLivres');
    let tableau = document.createElement('table');
    tableau.innerHTML = `<thead><tr><th>Titre du livre</th><th>Auteur</th><th>Nombre de pages</th><th>Disponibilité</th><th>Emprunter</th><th>Rendre</th></tr></thead>`;
    container.insertAdjacentElement('afterbegin', tableau);
    return tableau;
}

function ajouterLivre() {
    let titre = document.getElementById('inputTitre').value;
    let auteur = document.getElementById('inputAuteur').value;
    let nbPage = document.getElementById('inputNbPage').value;
    let monLivre = new Livre(titre, auteur, nbPage);
    // Insertion dans le tableau JS mesLivres
    mesLivres.push(monLivre);
    // Insertion dans le tableau du DOM, l'élément table
    monTableau.insertAdjacentElement('beforeend', monLivre.getLigneLivreAvecBouton());
    document.getElementById('ajoutLivre').reset();
}

function actualiserListe() {
    document.getElementById('containerAffichageLivres').innerHTML = '';
    monTableau = createTableauVide();
    let maListe = mesLivres;
    
    // Dispo
    let selectListeValue = document.getElementById('selectListeLivres').value;
    if (selectListeValue === selectDispo) {
        maListe = getLivresDisponibles(true, maListe);
    } else if (selectListeValue === selectNotDispo) {
        maListe = getLivresDisponibles(false, maListe);
    }

    // Auteur
    let auteurValue = document.getElementById('inputChercherAuteur').value;
    if (auteurValue.length > 0) {
        maListe = getLivresPourAuteur(auteurValue, maListe);
    }

    // Nombre de pages
    let nbPageMaxValue = document.getElementById('inputChercherPageMax').value;
    if (nbPageMaxValue.length >0){
        maListe = getLivreCourts(nbPageMaxValue, maListe);
    }

    // Affichage
    displayLivres(maListe);
}

function displayLivres(livres = mesLivres) {
    if (livres.length > 0) {
        for(let livre of livres) {
            monTableau.insertAdjacentElement('beforeend', livre.getLigneLivreAvecBouton());
        }
    } else {
        monTableau.insertAdjacentHTML('beforeend', '<tr>Il n\'y a aucun livre à afficher</tr>');
    }

}

function getLivresDisponibles(disponible, livres = mesLivres) {
    return livres.filter(livre => livre.dispo === disponible)
}

function getLivresPourAuteur(auteur, livres = mesLivres) {
    return livres.filter(livre => livre.auteur.toLowerCase().includes(auteur.toLowerCase()))
}

function getLivreCourts(nbPageMax, livres = mesLivres) {
    return livres.filter(livre => livre.nbPages < nbPageMax)
}

// function getLigneLivreAvecBouton(livre) {
//     let ligneLivre = document.createElement('tr');
//     ligneLivre.innerHTML = `<td>${livre.titre}</td><td>${livre.auteur}</td><td> ${livre.nbPages}</td>`
//     ligneLivre.innerHTML += `<td>${livre.dispo ? 'disponible' : 'emprunté'}</td>`;

//     ligneLivre.insertAdjacentHTML('beforeend',  `<td><button id="emprunt${livre.id}">Emprunter</button></td>`)
//     monTableau.insertAdjacentElement('beforeend', ligneLivre);

//     document.getElementById(`emprunt${livre.id}`).addEventListener('click', function(){
//         alert('ca marche');
//     })


//     return ligneLivre;
// }

