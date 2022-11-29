import { useState, useEffect } from "react"
import './App.scss';
import NavBar from "./views/NavBar"
import About from "./views/About"
import Skills from "./views/Skills"
import Projects, {ProjectItem} from './views/Projects';
import Contact from "./views/Contact"
import Footer from "./views/Footer"


function App() {

  // Gets the viewport's width and height
  // This is used to handle the reCaptcha display mode
  // the size of the Projects section img (carousel),
  // and the of Nav menu type (mobile/inter vs. desktop) 
  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  } 

  // We store the viewport's width as a state
  const [windowSize, setWindowSize] = useState(getWindowSize());
  // const [view, setView] = useState("mobile")

  // Triggers a eventListener each time the viewport width and height change
  // Gets the new values and remove the listener
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
        <ProjectItem>DLForum</ProjectItem>
        <ProjectItem>Hot Takes API</ProjectItem>
        <ProjectItem>Oh My Food !</ProjectItem>
      </Projects>
      <Contact windowWidth={windowSize.innerWidth}/>
      <Footer/>
    </main>
  );
}

export default App;
