import React, { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { faCode, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import groupomania_small from "../img/projects/groupomania_mobile.png"
import hotTakes_small from "../img/projects/hottakes_mobile.png"
import ohMyFood_small from "../img/projects/ohmyfood_mobile.png"
import groupomania_large from "../img/projects/groupomania_desktop.png"
import hotTakes_large from "../img/projects/hottakes_desktop.png"
import ohMyFood_large from "../img/projects/ohmyfood_desktop.png"

export const ProjectItem = ({children, width, index, details}) => {
    
  // Récupération de la largeur + hauteur du viewport
  // Utilisé pour  la "size" du reCaptcha dans Contact
  // ainsi que pour les NavItems
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  } 

  // State renseignant la largeur du viewport
  const [windowSize, setWindowSize] = useState(getWindowSize());
  // const [view, setView] = useState("mobile")

  useEffect(() => {
    const handleWindowResize = () => {
    setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
    window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


    const itemDetails = [
        {
            description: "Groupomania est un réseau social d'entreprise qui permet aux utilisateurs d'échanger entre eux via un fil d'actualités.",
            features: "Création de compte utilisateur et connexion / Gestion des privilèges utilisateur et modérateur / Post d'articles, likes et commentaires",
            technologies: "Vue.js, Node.js, MySQL",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_7_03022022",
            img_small: groupomania_small,
            img_large: groupomania_large
        },
        {
            description: "L'API destinée à l'application Hot Takes permet de gérer et sécuriser les actions des utilisateurs.",
            features: "Authentification sécurisée de l'utilisateur / Gestion des requêtes concernant les produits",
            technologies: "Node.js, Express, Mongoose, JWT, Bcrypt",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_6_27122021",
            img_small: hotTakes_small,
            img_large: hotTakes_large
        },
        {
            description: "Oh My Food ! est une application de réservation de menus dans de grands restaurants. Ce fut l'un de mes premiers projets.",
            features: "Animations / Responsive / Intégration statique",
            technologies: "HTML / CSS / Sass",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_3_18072021",
            img_small: ohMyFood_small,
            img_large: ohMyFood_large
        }
    ]
    const currentItem = itemDetails[index]
    
    return (
        <div className="carousel__item">
            <div className={`carousel__showcase carousel__showcase${index}`} style={{ width: width }}>
            <img src={windowSize.innerWidth > 550 ? currentItem.img_large : currentItem.img_small} alt="projet web de sebastien houchet" className={`carousel__img carousel__img${index}`}/>
                { details ? "" : <h3 className="carousel__title">{children}</h3>}
            </div>
            <div className={details? 
            "carousel__itemDetails carousel__itemDetails--active"
            : "carousel__itemDetails"}>
                <h3>{children}</h3>
                <p>{currentItem.description}</p>
                <h4>Fonctionnalités</h4>
                <p>{currentItem.features}</p>
                <h4>Technologies</h4>
                <p>{currentItem.technologies}</p>
                <a href={currentItem.githubLink} target="blank">Voir le code</a>             
            </div>
        </div>


    )
}

const Projects = ({children}) => {

    const [details, setDetails] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    const updateIndex = (newIndex) => {
        if(newIndex < 0) {
            newIndex = React.Children.count(children) -1
        } else if(newIndex >= React.Children.count(children)) {
            newIndex = 0
        }
        setActiveIndex(newIndex)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(!paused) {
                updateIndex(activeIndex +1)
            }
        }, 3000)

        return () => {
            if(interval) {
                clearInterval(interval)
            }
        }
    })

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex +1),
        onSwipedRight: () => updateIndex(activeIndex -1)
    })

    return (
        <section className="projects" id="projects">
            <h2 className="projects__title">Projets</h2>
            <div className="projects__mainContainer">
                <div>
                    <p className="projects__text">
                        Voici quelques-uns de mes projets.<br/>
                        N'hésitez pas à consulter mon profil Github ou à me contacter pour plus d'informations.
                    </p>
                    <FontAwesomeIcon icon={faCode} className="projects__icon"/>
                </div>
                
                <div 
                className="carousel"
                {...swipeHandlers} 
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={()=> setPaused(false)}>
                    <div className="carousel__inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                        {React.Children.map(children, (child, index) => {
                            return React.cloneElement(child, {width: "100%", index: index, details: details})
                        })}
                    </div>
                    <div className="carousel__detailsControl">
                        <FontAwesomeIcon icon={faAngleLeft} 
                            className="carousel__leftSelector"
                            onClick={() => updateIndex(activeIndex-1)}/>
                        <div className={details ? 
                        "carousel__detailsButton carousel__detailsButton--active"
                        : "carousel__detailsButton"} 
                        onClick={() => setDetails(!details)}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                        {details ? <p>- de détails</p> : <p>+ de détails</p>}
                        <FontAwesomeIcon icon={faAngleRight} 
                            className="carousel__rightSelector"
                            onClick={() => updateIndex(activeIndex+1)}/>
                    </div>
                    <div className="carousel__indicators">  
                        {React.Children.map(children, (child, index) => {
                            return (
                                <button
                                    className={index === activeIndex ? "carousel__button carousel__button--active" 
                                    : "carousel__button"}
                                    onClick={() => {
                                        updateIndex(index)
                                    }}>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <span id="contactAnchor"></span>
        </section>
    )
}

export default Projects;