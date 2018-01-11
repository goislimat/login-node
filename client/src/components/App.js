import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LoginPage from "./pages/login";

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route exact="/login" component={LoginPage} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
