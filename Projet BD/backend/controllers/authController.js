const db = require('../db');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
  const { nomUtilisateur, email, motDePasse } = req.body;
  bcrypt.hash(motDePasse, 10, (err, hash) => {
    if (err) return res.status(500).send(err);
    db.query(
      'INSERT INTO Utilisateur (nomUtilisateur, email, motDePasse) VALUES (?, ?, ?)',
      [nomUtilisateur, email, hash],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Utilisateur créé' });
      }
    );
  });
};

exports.login = (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;
  db.query(
    'SELECT * FROM Utilisateur WHERE nomUtilisateur = ?',
    [nomUtilisateur],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send({ message: 'Utilisateur non trouvé' });
      bcrypt.compare(motDePasse, results[0].motDePasse, (err, match) => {
        if (match) res.status(200).send({ message: 'Connexion réussie', idUtilisateur: results[0].idUtilisateur });
        else res.status(401).send({ message: 'Mot de passe incorrect' });
      });
    }
  );
};

exports.getUserInfo = (req, res) => {
  const idUtilisateur = req.params.idUtilisateur;
  
  if (!idUtilisateur) {
    console.error('ID utilisateur manquant dans la requête');
    return res.status(400).send({ message: 'ID utilisateur requis' });
  }
  
  console.log('Recherche utilisateur avec ID:', idUtilisateur);
  
  db.query(
    'SELECT nomUtilisateur, email FROM Utilisateur WHERE idUtilisateur = ?',
    [idUtilisateur],
    (err, results) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).send({ message: 'Erreur serveur', error: err.message });
      }
      
      if (!results || results.length === 0) {
        console.error('Aucun utilisateur trouvé avec ID:', idUtilisateur);
        return res.status(404).send({ message: 'Utilisateur non trouvé' });
      }
      
      console.log('Utilisateur trouvé:', results[0]);
      res.status(200).json(results[0]);
    }
  );
};


exports.changePassword = (req, res) => {
  const { idUtilisateur, oldPassword, newPassword } = req.body;
  
  db.query('SELECT motDePasse FROM Utilisateur WHERE idUtilisateur = ?', 
    [idUtilisateur], 
    async (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send({ message: 'Utilisateur non trouvé' });
      
      const match = await bcrypt.compare(oldPassword, results[0].motDePasse);
      if (!match) return res.status(403).send({ message: 'Mot de passe incorrect' });
      
      const hashed = await bcrypt.hash(newPassword, 10);
      db.query('UPDATE Utilisateur SET motDePasse = ? WHERE idUtilisateur = ?', 
        [hashed, idUtilisateur], 
        (err) => {
          if (err) return res.status(500).send(err);
          res.send({ message: 'Mot de passe mis à jour avec succès' });
        }
      );
    }
  );
};