import React, { Component, PropTypes } from 'react';
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as mapActions from '../../actions/mapActions';
import {default as If} from '../Functionals/If';
import ViewAreas from './ViewAreas'
import { browserHistory } from 'react-router';
import CloseImg from '../../images/close.png';
import markerUrl from '../../images/marker.png';

const Map = ReactMapboxGl({
		  accessToken: "pk.eyJ1IjoiYW5raXRndXB0YTQxOSIsImEiOiJjajdpdWZkdzkwOGNnMzNxbjR6ZWVyMWtiIn0.q99xK5UnMWzfwlPu3FMk_w"
		});
class MapView extends Component{
	constructor(props){
		super(props);
		this.state={
			showBar:false,
			directions:{},
			addDirections:[],
		}
		this._onClickMap=this._onClickMap.bind(this)
	}
	componentDidMount(){
		// console.log(this)
		if(!this.props.children){
			this.context.router.push('/viewMap')
		}
	}
	componentWillReceiveProps(props){
		// console.log("gettt",props.selectedVenue)
		if(props.removedVenue!=null){
			let index=null
			// console.log("gettt",props.selectedVenue)
			let addDirections=this.state.addDirections
			for(let i=0;i<addDirections.length;i++){
				if(addDirections[i].venue==props.removedVenue){
					index=i
				}
			}
			addDirections.splice(index,1)
			// let newAddDirections=addDirections.filter(item =>item.venue !== props.selectVenue)
			// console.log("saasasas",addDirections)
			this.setState({
				
				addDirections:addDirections
			})
		}
	}
	_onClickMap(map, evt) {
	  // console.log(evt);
	  
	  // console.log(evt.lngLat);
	  this.setState({
	  	 showBar:true,
	  	 directions:evt.lngLat,
	  },function(){
	  		document.getElementById("addVenueContainer").style.top=evt.point.x +'px'
	        document.getElementById("addVenueContainer").style.left=evt.point.y +'px'
	  })
	}
	saveVenues(){
       let directions=this.state.directions
       let addDirections=this.state.addDirections
       let venueValue=this.refs.venue.value
	   let latlan={
		  	venue:venueValue,
		  	lat:directions.lat,
		  	lng:directions.lng
	    }
	  	addDirections.push(latlan)
        this.setState({
		  	 showBar:false,
		  	 addDirections 
		})
        this.props.addVenueSuccess(venueValue,this.state.directions)
        this.props.removeVenueByName(null)
	}
	close(){
		 this.setState({
		  	 showBar:false,
		  })
	}
	render(){
		let self=this
		return(
			<div className="appContainer">
				<div className="viewContent"><ViewAreas /></div>
				<div className="mapContainer">
					<div className="mapDesign"> 
						<Map
						  style="mapbox://styles/mapbox/streets-v9"
						  containerStyle={{
						    height: "700px",
						    width: "800px"
						  }} 
						  onClick={this._onClickMap}
						  >
						  {
						  	this.state.addDirections.map((item,index)=>
					  			{
					  				return(
					  					<div key={index}>
						  					<Marker
											  coordinates={[item.lng,item.lat]} 
											  anchor="bottom" onMouseUp={this.touchItem.bind(this)}>
											  <img src={markerUrl}/>
											  <div>{item.venue}</div>
											</Marker>
											
										</div>
					  					)
					  			}
					  			
					  		)
						  }
						</Map>
					</div>
					<If test={this.state.showBar}>
						<div className="addVenueContainer" id="addVenueContainer">
							<div className="closePopupContainer" onClick={this.close.bind(this)}><img src={CloseImg} /></div>
							<div className="contentPopupContainer">
								<input className="venueText" type="text" ref="venue" placeholder="add venue name" />
								<input className="venueButton" type="submit" name="Save" onClick={this.saveVenues.bind(this)}/>
							</div>
							<div className="clr"></div>
						</div>
					</If>
				    <div className="clr"></div>
				</div>
				<div className="clr"></div>
			</div>
		);
	}
}
MapView.contextTypes = {
  router: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
   return {
    mapBox: state.mapBox,
    removedVenue:state.removeVenue
  };
  
}

export default connect(mapStateToProps,mapActions )(MapView);
