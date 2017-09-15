import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {default as If} from '../Functionals/If';
import optionsImg from '../../images/options.png';
import * as mapActions from '../../actions/mapActions';
class ViewAreas extends Component{
	constructor(props){
		super(props);
		this.state={
			currIndex:null
		}
		this.setWrapperRef = this.setWrapperRef.bind(this);           
        this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
           this.setState({
				currIndex:null
			})
        }
    }
	openPanel(index){
		// console.log(index)
		this.setState({
			currIndex:index
		})
	}
	removePlace(place){
        this.props.removeVenue(place)
        this.props.removeVenueByName(place)
	}
	selectVenue(venue){
      this.props.selectVenue(venue)
	}
	render(){
		// console.log(this.state.areas)
		let mapBox=this.props.mapBox
		// console.log(mapBox.length)
		return(
			<div className="ViewContainer">
			       <If test={mapBox.length>0}>
						<div>
						    <div className="savePlacesLabel">Saved Places</div>
						    <div className="savePlacesContent">
							{
								mapBox.map((item,index)=>
									<div className="savePlacesItemName" key={index}>
										<div className="venueNameItem">
											<span className="venueItemText" onClick={this.selectVenue.bind(this,item.venue)}>{item.venue}</span>
											<span className="venueOptionLabel" onClick={this.openPanel.bind(this,index)}><img src={optionsImg} /></span>
											<div className="clr"></div>
										</div>
										<If test={this.state.currIndex==index}>
											<div className="panelFilter" ref={this.setWrapperRef}>
												
												<span onClick={this.removePlace.bind(this,item.venue)}>Remove</span>
											</div>
										</If>
										
									</div>
									
								)
							}
							</div>
						</div>
					</If>
					<If test={mapBox.length==0}>
						<div className="noSave">No Saved Places</div>
					</If>
					
				
				
			</div>
		   
		);
	}
}
function mapStateToProps(state) {
   // console.log(state.mapBox)
   return {
    mapBox: state.mapBox
  };
  
}
export default connect(mapStateToProps,mapActions )(ViewAreas);
