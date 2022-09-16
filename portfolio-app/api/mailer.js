const nodemailer =  require('nodemailer');

const Email = (options) => {
  const transpoter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.REACT_APP_SECRET_M, 
      pass: process.env.REACT_APP_SECRET_P, 
    }
  });
  
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// Modalités d'envoi du mail
exports.EmailSender = ({ username, email, message }) => {
    const options = {
        from: process.env.REACT_APP_SECRET_M,
        to: process.env.REACT_APP_SECRET_M,
        subject: `Message de ${username}`,
        html: `
            <div style="width: 100%; background-color: #333; padding: 5rem 0">
            <div style="max-width: 700px; background-color: white; margin: 0 auto">
            <div style="width: 100%; background-color: #6a97f9; padding: 20px 0;">
            <a href="${process.env.REACT_APP_CLIENT_URL}" style="border-radius: 3em;" ><img
                src="https://img.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-garcon-joueur-colere-concept-icone-technologie-personnes-isole-vecteur-premium-style-dessin-anime-plat_138676-3984.jpg?w=826&t=st=1663229511~exp=1663230111~hmac=05eb21e5733c77297e7b685fd14fb2aa27d127d37c8a2f5b53f6f3b5aaca0f7c"
                style="width: 100%; height: 70px; object-fit: contain"
                /></a> 
            
            </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                Formulaire de contact de Seb
                </p>
                <div style="font-size: .8rem; margin: 0 30px">
                <p>Nom: <b>${username}</b></p>
                <p>Email: <b>${email}</b></p>
                <p>Message: <i>${message}</i></p>
                </div>
            </div>
            </div>
        </div>
            `
    };

    Email(options);

};
