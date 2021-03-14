import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./pages/_Layout.page.jsx";
import Home from "./pages/Home.page.jsx";
import Notification from "./pages/Notification.page.jsx";
import User from "./pages/User.page.jsx";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/user" component={User} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;