import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Loading from 'tools/Loading.tool.jsx';
const Layout = React.lazy(() => import('pages/_Layout.page.jsx'));
const Home = React.lazy(() => import('pages/Home.page.jsx'));
const Notification = React.lazy(() => import('pages/Notification.page.jsx'));
const User = React.lazy(() => import('pages/User.page.jsx'));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/notification" component={Notification} />
            <Route exact path="/user" component={User} />
          </Layout>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;