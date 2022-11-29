import reactLogo from "../assets/img/skills/react.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 

const Footer =() => {
    return (
        <footer className="footer">
                <p>Copyrights Fonkarts 2022. Powered by 
                    <img src={reactLogo} alt="React.js" className="footer__react"/>
                    and 
                    <FontAwesomeIcon icon={faHeart}  className="footer__heart"/>
                    .
                </p>
            </footer>
    )
}

export default Footer;