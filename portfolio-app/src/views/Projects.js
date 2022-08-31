import { useState } from "react"
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CarouselItem(props) {
    return (
        <article className="carousel__article">
            <h3 className="carousel__title">{props.name}</h3>
            <img src={props.img} alt={props.name} className="carousel__image"/>
            <p className="carousel__description">{props.description}</p>
            <button className="carousel__button">
                <a href={props.link} className="carousel__link">Lien Github</a>
            </button>
        </article>
    )
} 

const Projects = () => {

    const [carouselIndex, setCarouselIndex] = useState(0);

    return (
        <section className="projects" id="projects">
            {/* Maper sur tableau d'objets */}
            {/* Lien vers section Labs ??? */}
            <h2 className="projects__title">Projets</h2>
            <FontAwesomeIcon icon={faCode} className="projects__icon"/>
            <p className="projects__text">Voici quelques exemples de projets que j'ai réalisé</p>
            <div className="carousel">
                <div className="carousel__view">
                    <CarouselItem 
                        name="Oh My Food !"
                        img="*"
                        description="Un site de réservation de restaurants"
                        link="https://github.com/Fonkarts/SebastienHOUCHET_3_18072021"
                    />
                    <CarouselItem 
                        name="Groupomania"
                        img="*"
                        description="Un réseau social d'entreprise"
                        link="https://github.com/Fonkarts/SebastienHOUCHET_7_03022022"
                    />
                    <CarouselItem 
                        name="Hot Takes API"
                        img="*"
                        description="Une API REST sécurisée"
                        link="https://github.com/Fonkarts/SebastienHOUCHET_6_27122021"
                    />
                </div>
            </div>
        </section>
    )
}

export default Projects;