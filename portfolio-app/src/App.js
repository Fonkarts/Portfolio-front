import './App.scss';
import NavBar from "./views/NavBar"
import About from "./views/About"
import Skills from "./views/Skills"
import Projects, {ProjectItem} from './views/Projects';
import Contact from "./views/Contact"


function App() {
  return (
    <main className="app">
      <NavBar/>
      <About/>
      <Skills/>
      <Projects>
        <ProjectItem>Groupomania</ProjectItem>
        <ProjectItem>Hot Takes API</ProjectItem>
        <ProjectItem>Oh My Food !</ProjectItem>
      </Projects>
      <Contact/>
    </main>
  );
}

export default App;
