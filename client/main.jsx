import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from '../imports/ui/client/App.jsx';
import Maps from '../imports/ui/client/Map.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
	injectTapEventPlugin();
  render((
  	<Router history={hashHistory}>
	    <Route path="/" component={App}/>
	    <Route path="/map" component={Maps}/>
	  </Router>
	), document.getElementById('render-target'));
});