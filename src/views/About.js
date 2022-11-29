import portrait from "../assets/img/miniature.webp"

const About = () => {
    return (
        <section className="about" id="about">
            <div className="about__groupContainer">
                <div className="about__group"> 
                    <h2 className="about__title">
                        Sébastien Houchet <br/>
                        Développeur Fullstack Junior
                    </h2> 
                    <img src={portrait} alt="sebastien houchet developpeur web" className="about__portrait"/>
                </div>

                <div className="about__group">
                    <p className="about__description">
                        Je recherche actuellement un poste dans l'Hérault. <br/>
                        Passionné et volontaire, je peux mettre mes savoir-faire 
                        et mon savoir-être à votre service.
                    </p>
                </div>
            </div>
            <span id="skillsAnchor"></span>
        </section>
    )
}

export default About;