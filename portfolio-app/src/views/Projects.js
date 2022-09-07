import React, { useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import { faCode, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import groupomania from "../img/projects/p7_home.webp"
import hotTakes from "../img/projects/p6_demo.webp"
import ohMyFood from "../img/projects/p3_home.webp"


export const ProjectItem = ({children, width, index, details}) => {

    const itemDetails = [
        {
            description: "Groupomania est un réseau social d'entreprise qui permet aux utilisateurs d'échanger entre eux via un fil d'actualités.",
            features: "Création de compte utilisateur et connexion / Gestion des privilèges utilisateur et modérateur / Post d'articles, likes et commentaires",
            technologies: "Vue.js, Node.js, MySQL",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_7_03022022",
            src: groupomania
        },
        {
            description: "L'API destinée à l'application Hot Takes permet de gérer et sécuriser les actions des utilisateurs.",
            features: "Authentification sécurisée de l'utilisateur / Gestion des requêtes concernant les produits",
            technologies: "Node.js, Express, Mongoose, JWT, Bcrypt",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_6_27122021",
            src: hotTakes
        },
        {
            description: "Oh My Food ! est une application de réservation dans de grands restaurants. Ce fut l'un de mes premiers projets.",
            features: "Animations / Responsive / Intégration statique",
            technologies: "HTML / CSS / Sass",
            githubLink: "https://github.com/Fonkarts/SebastienHOUCHET_3_18072021",
            src: ohMyFood
        }
    ]

    const currentItem = itemDetails[index]

    return (
        <div className="carousel__item">
            <div className={`carousel__showcase carousel__showcase${index}`} style={{ width: width }}>
                <img src={currentItem.src} alt="*" className={`carousel__img carousel__img${index}`}/>
                <h3 className="carousel__title">{children}</h3>
            </div>
            <div className={details? 
            "carousel__itemDetails carousel__itemDetails--active"
            : "carousel__itemDetails"}>
                <h4>Description</h4>
                <p>{currentItem.description}</p>
                <h4>Fonctionnalités</h4>
                <p>{currentItem.features}</p>
                <h4>Technologies</h4>
                <p>{currentItem.technologies}</p>
                <a href={currentItem.githubLink} target="blank">Lien Github</a>             
            </div>
        </div>


    )
}

const Projects = ({children}) => {

    // const [desktop, setDesktop] = useState(true)
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
            <FontAwesomeIcon icon={faCode} className="projects__icon"/>
            <p className="projects__text">
                Voici quelques-unes de mes réalisations.<br/>
            </p>
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
                        <div className={details ? 
                        "carousel__detailsButton carousel__detailsButton--active"
                        : "carousel__detailsButton"} 
                        onClick={() => setDetails(!details)}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                        {details ? <p>- de détails</p> : <p>+ de détails</p>}
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
        </section>
    )
}

export default Projects;