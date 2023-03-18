class Livre {
  /** syntaxe ES6 dispo est défini à true par défaut si non-renseigné */
  constructor(id, titre, auteur, nbPages, dispo = true) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
    this.nbPages = nbPages;
    this.dispo = dispo;
  }

  afficher() {
    console.log(
      `${this.titre}, ${this.auteur}, ${this.nbPages} pages - ${
        this.dispo ? "disponible" : "emprunté"
      }`
    );
  }

  getLigneLivre() {
    let ligneLivre = document.createElement('tr');
    ligneLivre.innerHTML = `<td>${this.titre}</td><td>${this.auteur}</td><td> ${this.nbPages}</td>`
    ligneLivre.innerHTML += `<td>${this.dispo ? 'disponible' : 'emprunté'}</td>`;
    // ligneLivre.innerHTML += `<td${this.dispo ? '>disponible' : ' style=\'color: red\'>emprunté'}</td>`;
    return ligneLivre;
  }

  getLigneLivreAvecBouton() {
    let ligneLivre = document.createElement('tr');
    ligneLivre.innerHTML = `<td>${this.titre}</td><td>${this.auteur}</td><td> ${this.nbPages}</td>`
    ligneLivre.innerHTML += `<td>${this.dispo ? 'disponible' : 'emprunté'}</td>`;
    // ligneLivre.innerHTML += `<td${this.dispo ? '>disponible' : ' style=\'color: red\'>emprunté'}</td>`;
    
    // Button emprunter
    let celluleEmprunter = document.createElement("td");
    let buttonEmprunter = document.createElement("button");
    buttonEmprunter.textContent = "Emprunter";
    buttonEmprunter.classList.add("buttonEmpruntLivre");
    buttonEmprunter.addEventListener('click', (e) =>{
      if(this.emprunter()) {
        alert(`Le live ${this.titre} a été emprunté !`);
      } else {
        alert("Ce livre n'est pas disponible");
      }
    })
    celluleEmprunter.insertAdjacentElement("afterbegin", buttonEmprunter);
    ligneLivre.insertAdjacentElement("beforeend", celluleEmprunter);

    // Button rendre
    let celluleRendre = document.createElement("td");
    let buttonRendre = document.createElement("button");
    buttonRendre.textContent = "Rendre";
    buttonRendre.classList.add("buttonEmpruntLivre");
    buttonRendre.addEventListener('click', (e) =>{
      this.rendre();
      alert(`Merci d'avoir rendu le livre ${this.titre} !`);
    })
    celluleRendre.insertAdjacentElement("afterbegin", buttonRendre);
    ligneLivre.insertAdjacentElement("beforeend", celluleRendre);
    return ligneLivre;
  }

  emprunter() {
    if (this.dispo) {
      this.dispo = false;
      this.updateEmprunt()
      return true;
    } else {
      return false;
    }
  }

  rendre() {
    this.dispo = true;
    this.updateEmprunt()
  }

  updateEmprunt() {
    axios
    .post("http://localhost:8081/api/emprunter", {
        id: this.id,
        disponible: this.dispo,
    })
    .then((res) => {
        console.log("Emprunt modifié !", res.data);
    })
    .catch(() => {
      alert("Something Went Wrong");
    });
  }
}
