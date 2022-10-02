import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
faMagnifyingGlass, 
faDesktop,
faChartLine,
faHandshake,
faLock,
faPeopleRoof
} from "@fortawesome/free-solid-svg-icons"
import reactLogo from "../img/skills/react.webp"
import nodeLogo from "../img/skills/node.webp"
import vueLogo from "../img/skills/vue.webp"
import htmlLogo from "../img/skills/html.webp"
import cssLogo from "../img/skills/css.webp"
import sassLogo from "../img/skills/sass.webp"
import mysqlLogo from "../img/skills/mysql.webp"
import mongodbLogo from "../img/skills/mongodb.webp"
import cv from "../img/cv.pdf"


const Skills = () => {

    function ActionItem(props) {
        return (
            <div className="skills__actionItem">
                <FontAwesomeIcon icon={props.icon} className="skills__actionIcon"/>
                <h3 className="skills__actionTitle">{props.title}</h3>
                <div className="skills__actionMore">
                    <p className="skills__actionDescription">{props.description}</p>
                </div>
            </div>
        )
    }

    function SkillsItems() {
        const skillsList = [
            {id:"1", name:"React.js", icon: reactLogo},
            {id:"2", name:"Node.js", icon: nodeLogo},
            {id:"3", name:"Vue.js", icon: vueLogo},
            {id:"4", name:"HTML", icon: htmlLogo},
            {id:"5", name:"CSS", icon: cssLogo},
            {id:"6", name:"Sass", icon: sassLogo},
            {id:"7", name:"MySQL", icon:mysqlLogo},
            {id:"8", name:"MongoDB", icon: mongodbLogo}
            // GIT ?
        ]
        return (
            skillsList.map(item => 
                <div className="skills__skillItem" key={item.id}>
                    <img className="skills__skillIcon"
                        id={`skillIcon${item.id}`}
                        src={item.icon} 
                        alt={item.name}/>
                    <h3 className="skills__skillTitle">{item.name}</h3>
                </div>
            )
        )
    }

    return (
        <section className="skills" id="skills">
            <h2 className="skills__title">Compétences</h2>
            <div className="skills__actionsContainer">
                <div className="skills__actionsGroup">
                    <ActionItem
                    title="Comprendre un besoin, le traduire en solution."
                    description="L'exercice de mon ancien métier de Psychomotricien m'a souvent amené à rapidement cerner une demande, envisager son traitement et rester adaptable."
                    icon={faMagnifyingGlass}/>
                    <ActionItem
                    title="Accompagner, collaborer et partager."
                    description={"La dimension humaine joue à mon sens un rôle capital dans l'élaboration d'un produit web. C'est pourquoi il me paraît naturel de communiquer efficacement, et en toute transparence."}
                    icon={faHandshake}/>
                    <ActionItem
                    title="Créer ou modifier un site web, une API, une base de données."
                    description="Je considère le web dans sa globalité et suis donc intéressé par le Front-end et le Back-end. Je les envisage comme des instances ne pouvant fonctionner l'une sans l'autre."
                    icon={faDesktop}/>
                </div>
                <div className="skills__actionsGroup">
                    <ActionItem
                    title="Veiller au respect des normes d'accessibilité, penser à l'utilisateur."
                    description="La satisfaction du client passe aussi par celle des utilisateurs. Respecter leur singularité et penser à leur confort est donc impératif."
                    icon={faPeopleRoof}/>
                    <ActionItem
                    title="Favoriser le référencement naturel (SEO), optimiser les performances."
                    description="Nous assistons aujourd'hui à un réel essor de la transformation numérique, et la concurrence peut parfois être rude. Tirer son épingle du jeu avec une application visible, fluide et scalable devient une nécessité."
                    icon={faChartLine}/>
                    <ActionItem
                    title="Appliquer les dernières recommandations en termes de cybersécurité."
                    description="Je consulte régulièrement les recommandations de l'OWASP et cherche des moyens simples et efficaces d'améliorer la sécurité d'une application."
                    icon={faLock}/>
                </div>
                
            </div>
            
            <div className="skills__skillsItemsContainer">
                <p>Le coin geek</p>
                <SkillsItems/>
            </div>

            <div className="skills__resume">
                <h3 className="skills__resumeTitle">Envie d'en savoir plus ?</h3>
                <button className="skills__resumeButton">
                    <a href={cv} download rel="nofollow">Télécharger mon CV</a>
                </button>
            </div>
            <span id="projectsAnchor"></span>
        </section>
    )
}

export default Skills;