import React from "react";
import "./style.css";

import { Home } from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { CombinedProviders } from "./context/combined-providers";
function App() {
  return (
    <CombinedProviders>
      <div className="App bg-theme text-color">
        <Home />
      </div>
    </CombinedProviders>
  );
}
export default App;
