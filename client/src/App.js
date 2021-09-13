import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./components/nav";
import VideogameDetail from "./components/videogameDetails";
import Videogames from "./components/videogames";
import CreateVideogame from "./components/createVideogame";
import Landing from "./components/landing/landing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/home/createvideogame">
          <Nav />
          <CreateVideogame />
        </Route>

        <Route exact path="/home/videogame">
          <Nav />
          <Videogames />
        </Route>

        <Route exact path="/home/videogame/:id">
          <Nav />
          <VideogameDetail />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
