import React from 'react';
import {Modal,Form,Button} from "react-bootstrap";

class EditProfileModal extends React.Component {
    constructor(props){
        this.state = {
            show: false,
            setShow: false,
        };
    }

    handleClose(){
        this.setState({show:false})
    }
    
    handleShow(){
        this.setState({show:true})
    }

    render(){
        return(
            <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.handleClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}
