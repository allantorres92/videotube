import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable'
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import { loadAuth } from './actions/auth';
import { HashRouter as Router, Route, Link, Switch, hashHistory, Redirect  } from "react-router-dom";
import home from "./home.jsx";
import loginForm from "./login.jsx";

 

const PrivateRoute = ({ component: Component, store, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().toJS().auth.loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends React.Component {
  render() {
    const reducer = combineReducers({
      auth:authReducer
    });
    const store = createStore(reducer, fromJS({}), applyMiddleware(ReduxThunk));
    store.dispatch(loadAuth());
    
    return (
      <Provider store={store}>
        <Router history={hashHistory} >
          <div>
              <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
              <a className="navbar-brand" href="#">Test</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                  </li>
              </ul>
              </div>
            </nav>
            <main role="main" className="container">
              <div className="videoApp">
                <Switch>
                  <PrivateRoute exact path="/" component={home} store={store}/>
                  <Route exact path="/login" component={loginForm}/>
                </Switch>
              </div>
            </main>
          </div>                
      </Router>
    </Provider>
    );
  }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));
