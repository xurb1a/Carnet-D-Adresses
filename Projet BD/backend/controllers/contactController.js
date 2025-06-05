const db = require('../db');

exports.addContact = (req, res) => {
  const { nom, prenom, email, telephone, idUtilisateur } = req.body;
  
  // Check if contact with same name, email or phone already exists for this user
  db.query(
    `SELECT c.* FROM Contact c
     INNER JOIN Ajoutee a ON c.idContact = a.idContact
     WHERE a.idUtilisateur = ? AND (
       (c.nom = ? AND c.prenom = ?) OR
       c.email = ? OR 
       c.telephone = ?
     )`,
    [idUtilisateur, nom, prenom, email, telephone],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      
      // If a matching contact is found, return an error
      if (results.length > 0) {
        let message = 'Contact already exists: ';
        const existingContact = results[0];
        
        if (existingContact.nom === nom && existingContact.prenom === prenom) {
          message += 'Same name already exists';
        } else if (existingContact.email === email) {
          message += 'Email already exists';
        } else if (existingContact.telephone === telephone) {
          message += 'Phone number already exists';
        }
        
        return res.status(409).json({ message });
      }
      
      // If no duplicate found, proceed with inserting the new contact
      db.query(
        'INSERT INTO Contact (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, telephone],
        (err, result) => {
          if (err) return res.status(500).json({ error: err });
          const idContact = result.insertId;
          
          db.query(
            'INSERT INTO Ajoutee (idUtilisateur, idContact) VALUES (?, ?)',
            [idUtilisateur, idContact],
            (err) => {
              if (err) return res.status(500).json({ error: err });
              res.status(201).json({ message: 'Contact ajouté', idContact });
            }
          );
        }
      );
    }
  );
};

exports.modifyContact = (req, res) => {
  const { idContact, nom, prenom, email, telephone, idUtilisateur } = req.body;
  
  // Check if another contact with same name, email or phone already exists for this user
  db.query(
    `SELECT c.* FROM Contact c
     INNER JOIN Ajoutee a ON c.idContact = a.idContact
     WHERE a.idUtilisateur = ? AND c.idContact != ? AND (
       (c.nom = ? AND c.prenom = ?) OR
       c.email = ? OR 
       c.telephone = ?
     )`,
    [idUtilisateur, idContact, nom, prenom, email, telephone],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      
      // If a matching contact is found, return an error
      if (results.length > 0) {
        let message = 'Cannot modify: Another contact with the same ';
        const existingContact = results[0];
        
        if (existingContact.nom === nom && existingContact.prenom === prenom) {
          message += 'name already exists';
        } else if (existingContact.email === email) {
          message += 'email already exists';
        } else if (existingContact.telephone === telephone) {
          message += 'phone number already exists';
        }
        
        return res.status(409).json({ message });
      }
      
      // If no duplicate found, proceed with updating the contact
      db.query(
        'UPDATE Contact SET nom=?, prenom=?, email=?, telephone=? WHERE idContact=?',
        [nom, prenom, email, telephone, idContact],
        (err) => {
          if (err) return res.status(500).send(err);
          res.status(200).send({ message: 'Contact modifié' });
        }
      );
    }
  );
};

exports.getContacts = (req, res) => {
  const { idUtilisateur } = req.params;
  db.query(
    `SELECT Contact.* FROM Contact
     INNER JOIN Ajoutee ON Contact.idContact = Ajoutee.idContact
     WHERE Ajoutee.idUtilisateur=?`,
    [idUtilisateur],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(results);
    }
  );
};

exports.deleteContact = (req, res) => {
  const { idContact, idUtilisateur } = req.body;
  db.query(
    'DELETE FROM Ajoutee WHERE idContact=? AND idUtilisateur=?',
    [idContact, idUtilisateur],
    (err) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Contact supprimé du carnet' });
    }
  );
};