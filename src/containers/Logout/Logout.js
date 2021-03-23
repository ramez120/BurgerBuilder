
import React, {Component} from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import * as actions from '../../store/actions';
class Layout extends Component {
    componentDidMount(){
        this.props.logMeOut();
    }
    
    render() { 
        return ( 

            <Redirect to= "/" />
         );
    }
}

const mapDispatchToProps = (dispatch) =>{
    
    return {
        logMeOut : () => dispatch(actions.logout())
    }
}
 
export default connect(null, mapDispatchToProps)(Layout);