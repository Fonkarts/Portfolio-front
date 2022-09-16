import { useRef, useState, useEffect } from "react"
import reactLogo from "../img/skills/react.webp"
import { faHeart, faInfoCircle, faCheck } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

const USER_REGEX = /^[A-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ'][A-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ'-]{2,24}$/;
const MAIL_REGEX = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const MSG_REGEX = /^[A-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ',^-_@/!?.%€+:\n ]+$/;

const Contact = () => {
    const errRef = useRef("")

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [mail, setMail] = useState("")
    const [validMail, setValidMail] = useState(false)
    const [mailFocus, setMailFocus] = useState(false)

    const [msg, setMsg] = useState("")
    const [validMsg, setValidMsg] = useState(false)
    const [msgFocus, setMsgFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    const captchaRef = useRef(null);

    // Validation des entrées
    useEffect(() => {
        const result = USER_REGEX.test(user); 
        setValidName(result) 
    }, [user])

    useEffect(() => {
        const result = MAIL_REGEX.test(mail); 
        setValidMail(result) 
    }, [mail])

    useEffect(() => {
        const result = MSG_REGEX.test(msg); 
        setValidMsg(result) 
    }, [msg])

    // Vide le message d'erreur dès la reprise de la saisie d'un champ
    useEffect(() => { 
        setErrMsg("");
    }, [user, mail, msg])

    // A DECOUPER !!!!
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = MAIL_REGEX.test(mail);
        const v3 = MSG_REGEX.test(msg)
        if(!v1 || !v2 || !v3) {
            setErrMsg("Informations invalides");
            return;
        }
        try {
            const token = captchaRef.current.getValue();
            captchaRef.current.reset();
            await axios.post(process.env.REACT_APP_CAPTCHA_URL, {token})
            .then(() => {
                sendMail();
            } )

            // nettoyer valeurs inputs
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Pas de réponse du serveur !");
            } else {
                setErrMsg("L'envoi a échoué !")
            }        
        }
            errRef.current.focus(); 
    }
    
    const sendMail = async() => {
        await axios.post(process.env.REACT_APP_SENDMAIL_URL, {
            username: user,
            email : mail,
            message : msg
        })
        .then(() => {
            setSuccess(true);
            setUser("")
            setMail("")
            setMsg("")
        })
    }

    return (
        <footer className="contact" id="contact"> {/*TRANSFORMER EN SECTION ET SEPARER FOOTER !*/}
            <h2 className="contact__title">Contact</h2>
            <p>Mon profil vous intéresse ? <br/>
                Prenons contact !
            </p>
            {/* CDN GMaps ? */} 
            <p ref={errRef} className={errMsg ? "contact__errMsg--active" : "contact__errMsg"} 
            aria-live="assertive">
                {errMsg}
            </p>      {/* GERER LES CAS D'ERREUR ET AFFICHER errMsg !*/}

            <form onSubmit={handleSubmit}>
                <label htmlFor="user"></label>
                <input 
                    type="text" 
                    id="user" 
                    name="user"
                    className="contact__nameInput"
                    placeholder="Votre nom"
                    value={user || ""}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"} // annonce valid ou pas pour screenReaders
                    aria-describedby= "uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)} 
                />
                <p id="uidnote" className={userFocus && user && !validName ? "contact__userNote--active" : "contact__userNote"}>
                    <FontAwesomeIcon icon={faInfoCircle} /><br/>
                    Votre nom doit comprendre entre 2 et 24 caractères. <br/>
                    Seuls les lettres, accents, les apostrophes et les tirets sont autorisés.
                </p>

                <label htmlFor="mail"></label>
                <input 
                    type="text" 
                    id="mail" 
                    name="mail"  
                    className="contact__mailInput"
                    placeholder="Votre mail"
                    value={mail || ""}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    aria-invalid={validMail ? "false" : "true"}
                    aria-describedby="mailnote"
                    onFocus={() => setMailFocus(true)}
                    onBlur={() => setMailFocus(false)}
                />
                <p id="mailnote" className={mailFocus && !validMail && mail ? "contact__mailNote--active" : "contact__mailNote"}>
                    <FontAwesomeIcon icon={faInfoCircle} /><br/>
                    Votre mail doit se présenter sous la forme 'user@mail.com'<br />
                </p>

                <label htmlFor="msg"></label>
                <textarea 
                    id="msg" 
                    name="msg" 
                    className="contact__msgInput"
                    placeholder="Votre message"
                    value={msg || ""}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                    aria-invalid={validMsg ? "false" : "true"}
                    aria-describedby="msgnote"
                    onFocus={() => setMsgFocus(true)}
                    onBlur={() => setMsgFocus(false)}
                />
                <p id="msgnote" className={msgFocus && !validMsg && msg ? "contact__msgNote--active" : "contact__msgNote"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Votre message doit contenir entre 30 et 500 caractères.<br />
                    Caractères spéciaux autorisés: ',^-_@/!?.%€+:
                </p>
                <div className="contact__test">
                <ReCAPTCHA 
                className="contact__recaptcha"
                sitekey={process.env.REACT_APP_SITE_KEY}
                size="compact"
                ref={captchaRef}
                />
                </div>
                
                

                <button className="contact__button">Envoyer</button>

                <p className={success ? "contact__successMsg--active" : "contact__successMsg"}>
                    Votre message a bien été envoyé !
                    <FontAwesomeIcon icon={faCheck}/>
                </p> 
            </form>

            <p>Retrouvez-moi également sur</p>
            <div className="contact__socialItem">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                <p>
                    <a href="https://www.linkedin.com/in/sebastienhouchet-2473609a/" target="blank">LinkedIn</a>
                </p>
            </div>
            <div className="contact__socialItem">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                <p>
                    <a href="https://github.com/Fonkarts" target="blank">Github</a>
                </p>
            </div> 

            <div className="separator"></div>

            <div className="copyrights">
                <p>Copyrights Fonkarts 2022. Made with 
                    <img src={reactLogo} alt="React.js" className="copyrights__react"/>
                    and 
                    <FontAwesomeIcon icon={faHeart}  className="copyrights__heart"/>
                    .
                </p>
            </div>
        </footer>
    )
}

export default Contact;