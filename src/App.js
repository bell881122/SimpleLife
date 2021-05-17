import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Loading from 'tools/Loading.tool.jsx';
const Layout = React.lazy(() => import('pages/_Layout.page.jsx'));
const Home = React.lazy(() => import('pages/Home.page.jsx'));
const Notification = React.lazy(() => import('pages/Notification.page.jsx'));
const Privacy = React.lazy(() => import('pages/Privacy.page.jsx'));
const User = React.lazy(() => import('pages/User.page.jsx'));
const Search = React.lazy(() => import('pages/Search.page.jsx'));
const Feedback = React.lazy(() => import('pages/Feedback.page.jsx'));
const Good = React.lazy(() => import('pages/Good.page.jsx'));
const Member = React.lazy(() => import('pages/Member.page.jsx'));
const Error = React.lazy(() => import('pages/Error.page.jsx'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SimpleLifeTest" component={Home} />
            <Route exact path="/notification" component={Notification} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/user" component={User} />
            <Route exact path="/search/:kw" component={Search} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/good/:id" component={Good} />
            <Route exact path="/good/add" component={Good} />
            <Route exact path="/member/:id" component={Member} />
            <Route exact path="/error" component={Error} />
            <Route exact component={Error} />
          </Switch>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;