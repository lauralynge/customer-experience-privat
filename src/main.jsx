// Importerer React StrictMode for at hjælpe med at finde potentielle problemer i udvikling
import { StrictMode } from "react";
// Importerer createRoot til at starte React-app'en i root-elementet
import { createRoot } from "react-dom/client";
// Importerer BrowserRouter til at enable client-side routing
import { BrowserRouter } from "react-router-dom";
// Importerer globale styles
import "./styles.css";
// Importerer hoved-App-komponenten
import App from "./App.jsx";

// Starter React-app'en og mount'er den i <div id="root"> i index.html
createRoot(document.getElementById("root")).render(
  // StrictMode hjælper med at finde fejl og advarsler i udvikling (fx dobbelt-render)
  <StrictMode>
    {/* BrowserRouter gør det muligt at bruge <Route> og <Link> i hele appen */}
    {/* basename sætter base-URL for alle ruter, så det virker på fx GitHub Pages subdirectory */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
