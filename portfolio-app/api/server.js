const express = require("express");
const router = express.Router();
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config()
const {EmailSender} = require("./mailer.js");
const port = process.env.PORT || 2000;


const corsOptions = {
    origin: process.env.REACT_APP_CLIENT_URL,
    methods: "POST",
    // allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
}

// Active cors
app.use(cors(corsOptions));

// Parse les données
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Active le router
app.use("/", router);

// Route POST Mail
router.post("/mail", async (req, res) => {
    try {
        if(req.body.key === process.env.REACT_APP_SITE_KEY) {
            const { username, email, message } = req.body;
            EmailSender({username, email, message});
            res.status(200).json({ message: "Votre message a bien été envoyé" });
        } else {
            res.status(403).json({ message: "Non autorisé !" });
        }
    } catch (error) {
      res.status(404).json({ message: "Message non envoyé ❌" });
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
            } else {
                res.send("Vouus ne passereeez paas, Robot 🤖 !");
            }
        })
        .catch(() => res.status(500).json({message: "Problème serveur !"}));

    } else {
        res.status(403).json({message : "Token non trouvé !"});
    }    
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});