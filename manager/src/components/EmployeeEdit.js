import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import {
  employeeUpdate,
  employeeEdit,
  employeeSave,
  employeeDelete
} from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.modalToggle = this.modalToggle.bind(this);
  }

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift, employee: { uid } } = this.props;
    this.props.employeeSave({ name, phone, shift, uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { employee: { uid } } = this.props;
    this.props.employeeDelete({ uid });
  }

  modalToggle() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button title="Save Changes" onPress={this.onButtonPress.bind(this)} />
        </CardSection>
        <CardSection>
          <Button title="Text Schedule" onPress={this.onTextPress.bind(this)} />
        </CardSection>
        <CardSection>
          <Button title="Fire Employee" onPress={this.modalToggle} />
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onDecline={this.modalToggle}
          onAccept={this.onAccept.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeEdit,
  employeeSave,
  employeeDelete
})(EmployeeEdit);
