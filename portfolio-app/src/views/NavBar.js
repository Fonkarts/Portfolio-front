import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faComputer } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    // État d'affichage du menu dropdown (mobile)
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    function DropdownItem (props) {
        // Empêche l'animation dropdown de se lancer au 1er chargement de la page
        if(!clicked) {
            return (
                <li className="nav__item">
                    <a href={props.linkTo} className="nav__link">{props.name}</a>
                </li>
            )
        } else {
            return (
                <li className=
                { !open ? 
                    "nav__item nav__item--hidden" : 
                    "nav__item nav__item--displayed"}
                    onClick={handleClick}
                >
                    <a href={props.linkTo} className="nav__link">{props.name}</a>
                </li>
            )
        }
    }
    
    function handleClick() {
        setOpen(!open)
        if(!clicked) {
            setClicked(true)
        }
        
    }

    return (   
        <header className="header">
            {/* Lien Labs ?*/}
            {/* Accentuer bordures hover desktop */}
            <nav className="nav"> 
                <div className="nav__logoContainer">
                    <h1 className="nav__logo">
                        <FontAwesomeIcon icon={faComputer}/>
                    </h1>
                </div>
                <FontAwesomeIcon 
                icon={!open ? faBars : faXmark} 
                className={ !open ? "nav__icon nav__icon--inactive" : "nav__icon nav__icon--active"}
                onClick={handleClick}
                />
            </nav>
            <div>
                <ul className="nav__list">                    
                    <DropdownItem name={"À propos"} linkTo="#about"/>
                    <DropdownItem name={"Compétences"} linkTo="#skills"/>
                    <DropdownItem name={"Projets"} linkTo="#projects"/>
                    <DropdownItem name={"Contact"} linkTo="#contact"/>
                </ul>
            </div>
        </header>
    )
}

export default NavBar