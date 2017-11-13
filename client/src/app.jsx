import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable'
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import videoReducer from './reducers/videos';
import uqvideoReducer from './reducers/uqvideo';
import { loadAuth, logoutByUser } from './actions/auth';
import { HashRouter as Router, Route, Link, Switch, hashHistory, Redirect  } from "react-router-dom";
import home from "./home.jsx";
import Viewvideo from "./Viewvideo.jsx";
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

  doLogout(store,logoutfnc){
    store.dispatch(logoutfnc(store.getState().toJS().auth.token));
  }

  render() {
    const reducer = combineReducers({
      auth:authReducer,
      videos:videoReducer,
      uqvideo:uqvideoReducer
    });
    const store = createStore(reducer, fromJS({}), applyMiddleware(ReduxThunk));
    store.dispatch(loadAuth());
    
    return (
      <Provider store={store}>
        <Router history={hashHistory} >
          <div>
              <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
              <a className="navbar-brand" href="#">Crossover Video Portal</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                  </li>
              </ul>
              {store.getState().toJS().auth.loggedIn && <ul className="nav navbar-nav navbar-right">
                <li><button onClick={this.doLogout.bind(this,store,logoutByUser)}>Log Out</button></li>
              </ul>}
             
              </div>
            </nav>
            <main role="main" className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={home} store={store}/>
                  <PrivateRoute  path="/ViewVideo/:id" component={Viewvideo} store={store}/>
                  <Route exact path="/login" component={loginForm}/>
                </Switch>
            </main>
          </div>                
      </Router>
    </Provider>
    );
  }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));
