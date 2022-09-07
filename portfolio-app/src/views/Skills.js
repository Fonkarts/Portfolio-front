import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
faMagnifyingGlass, 
faDesktop,
faChartLine,
faHandshake,
faLock,
faPeopleRoof } from "@fortawesome/free-solid-svg-icons"
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
                <p className="skills__actionText">{props.description}</p>
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

            <ActionItem
            description="Comprendre un besoin, le traduire en solution."
            icon={faMagnifyingGlass}/>
            <ActionItem
            description="Accompagner, collaborer et partager."
            icon={faHandshake}/>
            <ActionItem
            description="Créer ou modifier un site web, une API, une base de données."
            icon={faDesktop}/>
            <ActionItem
            description="Veiller au respect des normes d'accessibilité, penser à l'utilisateur."
            icon={faPeopleRoof}/>
            <ActionItem
            description="Favoriser le référencement naturel (SEO), optimiser les performances."
            icon={faChartLine}/>
            <ActionItem
            description="Appliquer les dernières recommandations en termes de cybersécurité."
            icon={faLock}/>

            <div className="skills__separator"></div>

            <div className="skills__skillsItemsContainer">
                <p>Le coin geek</p>
                <SkillsItems/>
            </div>

            <div className="skills__resume">
                <h3 className="skills__resumeTitle">Envie d'en savoir plus ?</h3>
                <button className="skills__resumeButton">
                    <a href={cv} download>Télécharger mon CV</a>
                </button>
            </div>

        </section>
    )
}

export default Skills;