import React, {Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes
const Order = React.lazy(() => import('./containers/Order'));
const OrderDashboard = React.lazy(() => import('./containers/OrderDashboard'));
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const Login = React.lazy(() => import('./containers/Login'));
const Documentation = React.lazy(() => import('./containers/Documentation'));
const DocumentationDashboard = React.lazy(() => import('./containers/DocumentationDashboard'));
const Quarantine = React.lazy(() => import('./containers/Quarantine'));
const QuarantineDashboard = React.lazy(() => import('./containers/QuarantineDashboard'));
const Production = React.lazy(() => import('./containers/Production'));
const ProductionDashboard = React.lazy(() => import('./containers/ProductionDashboard'));
const Stock = React.lazy(() => import('./containers/Stock'));
const StockDashboard = React.lazy(() => import('./containers/StockDashboard'));
const Signup = React.lazy(() => import('./containers/Signup'));
const DetailsContainer = React.lazy(() => import('./containers/DetailsContainer'));
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'));

export default (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/order" component={Order}/>
      <Route exact path="/order/dashboard" component={OrderDashboard}/>
      {/* <Route exact path="/login" component={Login}/> */}
      <Route exact path="/about" component={About}/>
      <Route exact path="/documentationForm/:id" component={Documentation}/>
      <Route exact path="/documentation/dashboard" component={DocumentationDashboard}/>
      <Route exact path="/quarantineForm/:id" component={Quarantine}/>
      <Route exact path="/quarantine/dashboard" component={QuarantineDashboard}/>
      <Route exact path="/productionForm/:id" component={Production}/>
      <Route exact path="/production/dashboard" component={ProductionDashboard}/>
      <Route exact path="/stockForm/:id" component={Stock}/>
      <Route exact path="/stock/dashboard" component={StockDashboard}/>
      <Route exact path="/details/:department/:id" component={DetailsContainer}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path='*' component={PageNotFound} />
    </Switch>
  </Suspense>
);