import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Loading from 'tools/Loading.tool.jsx';
const Layout = React.lazy(() => import('pages/_Layout.page.jsx'));
const Home = React.lazy(() => import('pages/Home.page.jsx'));
// const Notification = React.lazy(() => import('pages/Notification.page.jsx'));
const User = React.lazy(() => import('pages/User.page.jsx'));
const Search = React.lazy(() => import('pages/Search.page.jsx'));
const Feedback = React.lazy(() => import('pages/Feedback.page.jsx'));
const Good = React.lazy(() => import('pages/Good.page.jsx'));
const Member = React.lazy(() => import('pages/Member.page.jsx'));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Layout>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/notification" component={Notification} /> */}
            <Route exact path="/user" component={User} />
            <Route exact path="/search/:kw" component={Search} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/good/:id" component={Good} />
            <Route exact path="/good/add" component={Good} />
            <Route exact path="/member/:id" component={Member} />
          </Layout>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;