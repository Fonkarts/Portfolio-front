const express = require("express");
const router = express.Router();
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config()
const {EmailSender} = require("./mailer.js");
const port = process.env.PORT || 2000;


// const corsOptions = {
//     origin: process.env.REACT_APP_CLIENT_URL
// }

// Active cors
app.use(cors());

// Parse les données
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Active le router
app.use("/", router);

// Route POST Mail
app.post("/mail", async (req, res) => {
    try {
      const { username, email, message } = req.body;
      EmailSender({username, email, message});
      res.json({ message: "Votre message a bien été envoyé" });
    } catch (error) {
      res.status(404).json({ message: "Error ❌" });
    }
  });

// Route POST Captcha
router.post("/captcha", async (req, res) => {
// Déstructuration du token depuis le corps de la requête
    const {token} = req.body;
    // Envoie la clé secrète + token à Google
    if(req.body.token) {
        await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${token}`
        )
        .then(() => {
        // Vérifie le statut de la réponse et le renvoie au client
            if (res.status(200)) {
                res.send("Vous pouvez passer, Humain 👨 👩 !");
            }else{
                res.send("Vous ne passerez pas, Robot 🤖 !");
            }
        })
        .catch(() => res.status(500).json({message: "Problème serveur !"}));

    } else {
        res.status(400).json({message : "Token non trouvé !"});
    }    
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});