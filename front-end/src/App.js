import GlobalStyles from "../src/assets/style/GlobalStyle.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfoClient from "./pages/infoClient.js";
import HomePage from "./pages/homePage.js";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/relatorio.html/:cnpj" element={<InfoClient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
