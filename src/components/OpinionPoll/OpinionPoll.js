import React, { Component } from 'react';
import { connect } from 'react-redux';

class OpinionPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.selectedOption,
    };
  }

  handleOnChange = (e) => {
    const { id, firstName, lastName, dob } = this.props.item;
    let element = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      active: e.target.value,
      selectedOption: e.target.value,
    };
    console.log(e.target.value);
    this.setState({ selectedOption: e.target.value });
    this.props.updateData(element);
    this.props.onChangeUsers(element);
  };

  render() {
    const json = {
      choices: [
        { text: 'not active', value: 'false' },
        { text: 'active', value: 'true' },
      ],
    };
    return (
      <>
        <div>
          <div>
            {json.choices.map((choice, index) => (
              <label key={index}>
                <input
                  type='radio'
                  name={this.props.itemId}
                  value={choice.value}
                  key={index}
                  checked={this.state.selectedOption === choice.value}
                  onChange={(e) => this.handleOnChange(e)}
                />
                {choice.text}
                <br />
              </label>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  (state) => ({
    storeUsers: state.users,
  }),
  (dispatch) => ({
    onAddUsers: (addUsers) => {
      dispatch({
        type: 'ADD_USERS',
        payload: addUsers,
      });
    },
    onChangeUsers: (changeUsers) => {
      dispatch({
        type: 'UPDATE_USERS',
        payload: changeUsers,
      });
    },
  })
)(OpinionPoll);
