import React, { Component } from "react";
import Aux from "../Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
      constructor(props){
          super(props);
        this.state = { error: null };
        this.reqInterceptor  = axios.interceptors.request.use((request) => {
            this.setState({ error: null });
            return request;
    
          });
          this.resInterceptor = axios.interceptors.response.use(response => response, (error) => {
            this.setState({ error });
          });
      }
    
    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);


    }
    removeErrorHandler=()=>{
        this.setState({error : null})
     } 
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} removeModal = {this.removeErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
