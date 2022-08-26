import portrait from "../img/miniature.webp"

const About = () => {
    return (
        <section className="about" id="about">
            <h2 className="about__title">
                Sébastien Houchet <br/>
                Développeur Web
            </h2> 
            <img src={portrait} alt="sebastien houchet developpeur web" className="about__portrait"/>

            <p className="about__description">
                Besoin d'une solution sur mesure ? <br/>
                Vous êtes au bon endroit.
            </p>
        </section>
    )
}

export default About;