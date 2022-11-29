import React, { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { faCode, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import groupomania_small from "../assets/img/projects/groupomania_mobile.png"
import hotTakes_small from "../assets/img/projects/hottakes_mobile.png"
import ohMyFood_small from "../assets/img/projects/ohmyfood_mobile.png"
import dlForum_small from "../assets/img/projects/dlforum_mobile.png"

import groupomania_medium from "../assets/img/projects/groupomania_inter.png"
import hotTakes_medium from "../assets/img/projects/hottakes_inter.png"
import ohMyFood_medium from "../assets/img/projects/ohmyfood_inter.png"
import dlForum_medium from "../assets/img/projects/dlforum_inter.png"

import groupomania_large from "../assets/img/projects/groupomania_desktop.png"
import hotTakes_large from "../assets/img/projects/hottakes_desktop.png"
import ohMyFood_large from "../assets/img/projects/ohmyfood_desktop.png"
import dlForum_large from "../assets/img/projects/dlforum_desktop.png"



export const ProjectItem = ({children, width, index, details}) => {
    
  // Gets the viewport's width and height
  // This is used to handle the reCaptcha display mode,
  // the size of the Projects section img (carousel),
  // and the of Nav menu type (mobile/inter vs. desktop) 
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  } 

  // We store the viewport's width as a state
  const [windowSize, setWindowSize] = useState(getWindowSize());
  // const [view, setView] = useState("mobile")

  // Resets the windowSize state value if the viewport changes (see App.js file)
  useEffect(() => {
    const handleWindowResize = () => {
    setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
    window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

    // The Projects infos are here stored as an array of objects
    const itemDetails = [
        {
            description: "Groupomania est un réseau social d'entreprise qui permet aux utilisateurs d'échanger entre eux via un fil d'actualités.",
            features: "Création de compte utilisateur et connexion / Gestion des privilèges utilisateur et modérateur / Post d'articles, likes et commentaires",
            technologies: "Vue.js, Node.js, MySQL",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_7_03022022",
            deployLink : "",
            img_small: groupomania_small,
            img_medium: groupomania_medium,
            img_large: groupomania_large
        },
        {
            description: "DLForum est un forum muni d'un système d'inscription/connexion. L'utilisateur peut poser ses questions, répondre à d'autres et gérer son profil ou ses posts.",
            features: "Authentification sécurisée de l'utilisateur / Gestion des requêtes concernant les questions et les réponses",
            technologies: "PHP / MySQL / WAMP",
            githubLink: "https://github.com/Fonkarts/PHP_Forum",
            deployLink : "",
            img_small: dlForum_small,
            img_medium: dlForum_medium,
            img_large: dlForum_large
        },
        {
            description: "L'API destinée à l'application Hot Takes permet de gérer et sécuriser les actions des utilisateurs.",
            features: "Authentification sécurisée de l'utilisateur / Gestion des requêtes concernant les produits",
            technologies: "Node.js, Express, Mongoose, JWT, Bcrypt",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_6_27122021",
            deployLink : "",
            img_small: hotTakes_small,
            img_medium: hotTakes_medium,
            img_large: hotTakes_large
        },
        {
            description: "Oh My Food ! est une application de réservation de menus dans de grands restaurants. Ce fut l'un de mes premiers projets.",
            features: "Animations / Responsive / Intégration statique",
            technologies: "HTML / CSS / Sass",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_3_18072021",
            deployLink : "https://fonkarts.github.io/SebastienHOUCHET_3_18072021/",
            img_small: ohMyFood_small,
            img_medium: ohMyFood_medium,
            img_large: ohMyFood_large
        }
    ]
    const currentItem = itemDetails[index]
    
    // Defines what kind of img to display, regarding to the viewport' size
    const handleImg = () => {
        if(windowSize.innerWidth > 950) {
            return currentItem.img_large
        } else if (windowSize.innerWidth > 550 && windowSize.innerWidth < 951 ) {
            return currentItem.img_medium
        } else {
            return currentItem.img_small
        }
    }

    return (<div className="carousel__item">
            <div className={`carousel__showcase carousel__showcase${index}`} style={{ width: width }}>
                <img src={handleImg()} 
                    alt="projet web de sebastien houchet" 
                    className={`carousel__img carousel__img${index}`}
                />
                { details ? "" : <h3 className="carousel__title">{children}</h3>}
            </div>
            {/* Displays the project infos if the "Details" button is clicked, otherwise it displays nothing */}
            <div className={details? 
            "carousel__itemDetails carousel__itemDetails--active"
            : "carousel__itemDetails"}>
                <h3>{children}</h3>
                <p>{currentItem.description}</p>
                <h4>Fonctionnalités</h4>
                <p>{currentItem.features}</p>
                <h4>Technologies</h4>
                <p>{currentItem.technologies}</p>
                <a href={currentItem.githubLink} target="blank" rel="nofollow">Voir le dépot Github</a>
                {currentItem.deployLink !== "" ? 
                <a href={currentItem.deployLink} target="blank" rel="nofollow">Voir la page</a>
                : ""
                }           
            </div>
        </div>
    )

    
}

const Projects = ({children}) => {

    // If true, show the current project infos below the img
    const [details, setDetails] = useState(false)
    // Defines which project is currently displayed
    const [activeIndex, setActiveIndex] = useState(0)
    // Defines is the carousel should stop or not
    const [paused, setPaused] = useState(false)

    // 
    const updateIndex = (newIndex) => {
        // If the user is looking at the first project and clicks "previous"...
        if(newIndex < 0) {
            // ... the activeIndex is set on the last project.
            newIndex = React.Children.count(children) -1
        // Gets back to the first project after the last one
        } else if(newIndex >= React.Children.count(children)) {
            newIndex = 0
        }
        setActiveIndex(newIndex)
    }

    // Handles the carousel rotation, based on the activeIndex (index of the currently displayed project)
    useEffect(() => {
        const interval = setInterval(() => {
            if(!paused) {
                updateIndex(activeIndex +1)
            }
        }, 4000)

        return () => {
            if(interval) {
                clearInterval(interval)
            }
        }
    })

    // React Swipe handler hook
    // Allows the user to swipe to navigate
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
                        Voici quelques-uns de mes projets.<br/><br/>
                        N'hésitez pas à consulter mon profil Github ou à me contacter pour plus d'informations.
                    </p>
                    <FontAwesomeIcon icon={faCode} className="projects__icon"/>
                </div>
                
                <div 
                className="carousel"
                // We here integrate the swipe handlers
                {...swipeHandlers} 
                // If the user's mouse is on the carousel, the rotation animation stops
                onMouseEnter={() => setPaused(true)}
                // If the user's mouse gets out of the carousel, the rotation animation starts again
                onMouseLeave={()=> setPaused(false)}>
                    {/* As each project's width is 100%, we translate on X by 100% to display the following one */}
                    <div className="carousel__inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                        {/* We here successively display each child of the Projects component */}
                        {/* See App.js file */}
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
                        {/* Display an indicator for each Projects component child */}
                        {/* Clicking on an indicator displays the corresponding project (using index) */} 
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