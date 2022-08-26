// import { faReact, faNode, faDatabase, faVuejs } from "@fortawesome/free-solid-svg-icons"

const Skills = () => {

    const skillsList = [ // test, mapper pour afficher
        {
            name: "React",
            icon: "liens icones"
        },
        {
            name: "Node",
            icon: "liens icones"
        },
        {
            name: "MySQL",
            icon: "liens icones"
        },
        {
            name: "Vue.js",
            icon: "liens icones"
        }
    ]
    return (
        <section className="skills" id="skills">
            {/*1. Description actions 2.Technos*/}
            <h2 className="skills__title">Compétences</h2>
            <div className="projects__container">
                <h3 className="projects__title">React</h3>
            </div>
            <div className="projects__container">
                <h3 className="projects__title">Node</h3>
            </div>
            <div className="projects__container">
                <h3 className="projects__title">MySQL</h3>
            </div>
        </section>
    )
}

export default Skills;