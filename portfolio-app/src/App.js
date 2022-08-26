import './App.scss';
import NavBar from "./views/NavBar"
import About from "./views/About"
import Projects from "./views/Projects"
import Skills from "./views/Skills"
import Contact from "./views/Contact"

function App() {
  return (
    <main className="app">
      <NavBar/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
    </main>
  );
}

export default App;
