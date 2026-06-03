import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "./components/ui/Button";
import NavBar from './components/layout/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
