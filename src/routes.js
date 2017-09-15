import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MapView from './components/Auth/Map';



const routes = (
   
	    <Route path="/" component={MapView}>
		    <Route path="viewMap" component={MapView} />
		</Route>
	
);
export default routes;