import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faComputer } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {

    const windowSize = props.windowSize

    // État d'affichage du menu dropdown (mobile)
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Item de navigation mobile
    function DropdownItem (props) {
        // Empêche l'animation dropdown de se lancer au 1er chargement de la page
        if(!clicked) {
            return (
                <li className="nav__dropItem">
                    <a href={props.linkTo} className="nav__link">{props.name}</a>
                </li>
            )
        } else {
            return (
                <li className=
                { !open ? 
                    "nav__dropItem nav__dropItem--hidden" : 
                    "nav__dropItem nav__dropItem--displayed"}
                    onClick={handleClick}
                >
                    <a href={props.linkTo} className="nav__link">{props.name}</a>
                </li>
            )
        }
    }

    // Item de navigation desktop
    function NavItem (props) {
        return (
            <li className="nav__item">
                <a href={props.linkTo} className="nav__link">{props.name}</a>
            </li>
        )
    }
    
    function handleClick() {
        setOpen(!open)
        if(!clicked) {
            setClicked(true)
        }
        
    }

    return (   
        <header className="header">
            <>
            {windowSize <= 950 ?
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
                <div>
                    <ul className="nav__list">                    
                        <DropdownItem name={"À propos"} linkTo="#aboutAnchor"/>
                        <DropdownItem name={"Compétences"} linkTo="#skillsAnchor"/>
                        <DropdownItem name={"Projets"} linkTo="#projectsAnchor"/>
                        <DropdownItem name={"Contact"} linkTo="#contactAnchor"/>
                        <DropdownItem name={"Labs (prochainement)"}/>
                    </ul>
                </div>
            </nav>
            : 
            <nav className="nav"> 
                <ul className="nav__list">                    
                    <NavItem name={"À propos"} linkTo="#aboutAnchor" className="test"/>
                    <NavItem name={"Compétences"} linkTo="#skillsAnchor"/>
                    <NavItem name={"Projets"} linkTo="#projectsAnchor"/>
                    <NavItem name={"Contact"} linkTo="#contactAnchor"/>
                    <NavItem name={"Labs (prochainement)"}/>
                </ul>
            </nav>
            }
            </>
        </header>
    )
}

export default NavBar