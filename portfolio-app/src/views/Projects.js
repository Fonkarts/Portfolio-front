import { faCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Projects = () => {
    return (
        <section className="projects" id="projects">
            {/* Maper sur tableau d'objets */}
            {/* Lien vers section Labs ??? */}
            <h2 className="projects__title">Projets</h2>
            <FontAwesomeIcon icon={faCode} className="projects__logo"/>
            <div className="projects__container">
                <h3 className="projects__title">Groupomania</h3>
                <img src="*" alt="projet XXX" className="projects__img"/>
                <p className="projects__description">Description du projet 1</p>
            </div>
            <div className="projects__container">
                <h3 className="projects__title">Hot Takes</h3>
                <img src="*" alt="projet XXX" className="projects__img"/>
                <p className="projects__description">Description du projet 1</p>
            </div>
            <div className="projects__container">
                <h3 className="projects__title">Oh my Food !</h3>
                <img src="*" alt="projet XXX" className="projects__img"/>
                <p className="projects__description">Description du projet 1</p>
            </div>
        </section>
    )
}

export default Projects;