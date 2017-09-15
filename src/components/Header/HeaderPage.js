import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sideBarActions from '../../actions/sideBarActions';
import  menuIcon from './../../images/menu.png';
import  searchIcon from './../../images/search_icon.png';
import  profileIcon from './../../images/profile.jpg';
class Header extends Component{
	constructor(props){
		super(props);
		this.state={
			showProfilePanel:false
		}
	}
	seeProfilePanel(){
		this.props.actions.showProfileBar(!this.props.isShowProfile);
	}
	render(){
		const getUser=this.props.getUser
		return(
			<div className="headerContainer">
				<div className="headerContent">
					<div className="headerMenuIcon"><img src={menuIcon} /> </div>
					<div className="headerTitleLabel">Project title goes here</div>
					<div className="headerSearchBox"><span><img className="searchImageIcon" src={searchIcon} /></span><span><input type="text" className="headePanelSearchBox" /></span></div>
					<div className="userProfileSection">
						<span><img className="userProfileImg" src={getUser.profile_img!=null?getUser.profile_img :profileIcon} onClick={this.seeProfilePanel.bind(this)} /></span>
					</div>
					<div className="clr"></div>
				</div>
				<div className="headerEmptyBorderDiv"></div>
			</div>
		);
	}
}

Header.propTypes = {
  isShowProfile: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  return {
    isShowProfile:state.profileBar,
    getUser:state.getUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sideBarActions, dispatch)
  };

}
export default connect(mapStateToProps, mapDispatchToProps)(Header);