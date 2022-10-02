import { useState, useEffect } from "react"
import './App.scss';
import NavBar from "./views/NavBar"
import About from "./views/About"
import Skills from "./views/Skills"
import Projects, {ProjectItem} from './views/Projects';
import Contact from "./views/Contact"
import Footer from "./views/Footer"


function App() {

  // Récupération de la largeur + hauteur du viewport
  // Utilisé pour  la "size" du reCaptcha dans Contact
  // ainsi que pour les NavItems
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  } 

  // State renseignant la largeur du viewport
  // et le type de vue à afficher
  const [windowSize, setWindowSize] = useState(getWindowSize());
  // const [view, setView] = useState("mobile")

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
    window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <main className="app" id="aboutAnchor">
      <NavBar 
        windowWidth={windowSize.innerWidth}
        windowHeight={windowSize.innerHeight}
      />
      <About/>
      <Skills/>
      <Projects>
        <ProjectItem>Groupomania</ProjectItem>
        <ProjectItem>Hot Takes API</ProjectItem>
        <ProjectItem>Oh My Food !</ProjectItem>
      </Projects>
      <Contact windowWidth={windowSize.innerWidth}/>
      <Footer/>
    </main>
  );
}

export default App;
