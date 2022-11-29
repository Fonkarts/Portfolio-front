import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faComputer } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {

    // Gets the window width and height from the app.js file
    const windowWidth = props.windowWidth
    const windowHeight = props.windowHeight

    // Dropdown menu display states (mobile + inter)
    // When set to true, the menu is displayed and the animation is launched
    const [open, setOpen] = useState(false);
    // If set to false, prevents the menu opening animation from launching
    const [clicked, setClicked] = useState(false);
    // See toogleHiddenClass function below
    const [stayHidden, setStayHidden] = useState(false);
    // État gérant l'ancre de la section dans laquelle l'utilisateur souhaite se rendre
    const [scrollInto, setScrollInto] = useState(null);

    // Mobile Nav item component
    function DropdownItem (props) {
        if(!clicked) {
            return (
                <li className="nav__dropItem">
                    <p onClick={() => setScrollInto(props.linkTo)} className="nav__link">{props.name}</p>
                </li>
            )
        } else {
            return (
                <li className=
                { !open ? 
                    toggleHiddenClass() : 
                    "nav__dropItem nav__dropItem--displayed"}
                    onClick={handleClick}
                >
                    <p onClick={() => setScrollInto(props.linkTo)} className="nav__link">{props.name}</p>
                </li>
            )
        }
    }

    // Desktop Nav item component
    function NavItem (props) {
        return (
            <li className="nav__item">
                <p onClick={() => setScrollInto(props.linkTo)} className="nav__link">{props.name}</p>
            </li>
        )
    }

    function toggleHiddenClass() {
        // Use the "stayHidden" state to reset the className of the dropdownItems.
        // This is because the hiding animation was playing each time we scroll
        // on mobile.
        // So now the className resets after the hiding animation      
        if(stayHidden) {
            return "nav__dropItem"
        } else {
            return "nav__dropItem nav__dropItem--hidden"
        }
    }

    // Handles the behavior of the dropdown menu animation
    function handleClick() {
        if(!clicked) {
            setClicked(true)
        }
        if(clicked && open) {
            setTimeout(() => {
                setStayHidden(true)
            }, 900)
        } else if(clicked && !open) {
            setStayHidden(false)
        }
        setOpen(!open)   
    }

    // If the user clicks on a Nav item, the "scrollInto" state gets a value equal to the anchor link
    // So we can then get the user to that anchor.
    useEffect(() => {
        if(scrollInto !== null) {
            const element = document.querySelector(scrollInto);
            element.scrollIntoView({behavior: "smooth"})
        }
    }, [scrollInto])

    // Centers the loading animation
    useEffect(() => {
        const loader = document.querySelector(".loader")
        const middleHeight = `${windowHeight/2}px`
        loader.style.top = middleHeight
    })

    return (   
        <header className="header">
            {/* Loading animation */}
            <div className="loader">
                <div className="loader__bar1"></div>
                <div className="loader__bar2"></div>
                <div className="loader__bar3"></div>
                <div className="loader__bar4"></div>
                <div className="loader__bar5"></div>
                <div className="loader__bar6"></div>
                <p>
                    Chargement
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </p>
            </div>
            <>
            {/* Is the window width smaller than 951px ? */}
            {windowWidth < 951  ?
            // If yes, display the dropdown menu (mobile/inter)
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
                        {/* <DropdownItem name={"Labs (soon)"}/> */}
                    </ul>
                </div>
            </nav>
            : 
            // If not, display the desktop menu
            <nav className="nav"> 
                <ul className="nav__list">                    
                    <NavItem name={"À propos"} linkTo="#aboutAnchor" className="test"/>
                    <NavItem name={"Compétences"} linkTo="#skillsAnchor"/>
                    <NavItem name={"Projets"} linkTo="#projectsAnchor"/>
                    <NavItem name={"Contact"} linkTo="#contactAnchor"/>
                    {/* <NavItem name={"Labs (prochainement)"}/> */}
                </ul>
            </nav>
            }
            </>
        </header>
    )
}

export default NavBar