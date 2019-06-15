import React, {Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const Login = React.lazy(() => import('./containers/Login'));
const Documentation = React.lazy(() => import('./containers/Documentation'));
const Quarantine = React.lazy(() => import('./containers/Quarantine'));
const Production = React.lazy(() => import('./containers/Production'));
const Stock = React.lazy(() => import('./containers/Stock'));
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'));

export default (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/documentation" component={Documentation}/>
      <Route exact path="/quarantine" component={Quarantine}/>
      <Route exact path="/production" component={Production}/>
      <Route exact path="/stock" component={Stock}/>
      <Route exact path='*' component={PageNotFound} />
    </Switch>
  </Suspense>
);