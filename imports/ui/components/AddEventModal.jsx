import React from 'react';
import Modal from 'react-modal';
import { withTracker } from 'meteor/react-meteor-data';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

//this seems to be throwing an error......wrong scope?
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AddEventModal extends React.Component {
  constructor() {
    super();

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {eventname: "lab"};
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.modalIsOpen = false;
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.onClose}
          style={customStyles}
          contentLabel="Event Details"
        >

          <h2>Event Details</h2>

          <div>I think it should be given people and time</div>


          people (prop)
          owner
          times (prop)
          title

          <form>
            {/*{this.props.participants.map()}*/}

            <FormGroup>
              <ControlLabel>Event Name</ControlLabel>
              <FormControl
                name="eventname"
                type="text"
                value={this.state.eventname}
                onChange={this.handleChange}
              />
            </FormGroup>
          </form>

        </Modal>
      </div>
    );
  }
}

export default withTracker(({show, participants, start, end}) => {
  return {
    modalIsOpen: show,
    participants,
    start,
    end
  };
})(AddEventModal);