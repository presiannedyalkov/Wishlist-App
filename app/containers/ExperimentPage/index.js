/**
 *
 * Experiment
 *
 */

// Libraries
import React from 'react';

// Components
import { Grid, Row } from 'react-bootstrap';
import Header from 'components/Header';
import Instruction from 'components/Instruction';
import ItemList from 'containers/ItemList';
import AuthenticityCheck from 'components/AuthenticityCheck';
import Survey from 'containers/Survey';
import ThankYou from 'containers/ThankYou';
import Statistics from 'components/Statistics';

class Experiment extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      step: 1,
      sessionColor: '',
      sessionId: null,
      allFinishedItemsData: {},
      participantAge: null,
      participantGender: '',
      participantDevice: '',
      onlinePurchasingFrequency: null,
      sendData: false,
    };
    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.uniqueId = this.uniqueId.bind(this);
    this.serialize = this.serialize.bind(this);
  }

  // Change 0x10 and the substring values for longer/shorter id
  uniqueId() {
    return parseInt(Math.floor((1 + Math.random()) * 0x1000000000).toString().slice(-8), 10);
  }

  handleChangeStep(props) {
    const { send, data, color, age, gender, device, frequency } = props;
    this.setState({
      step: this.state.step + 1,
      sendData: send || this.state.sendData,
      allFinishedItemsData: data ? this.serialize(data) : this.state.allFinishedItemsData,
      sessionColor: color || this.state.sessionColor,
      sessionId: this.uniqueId(),
      participantAge: age || this.state.participantAge,
      participantGender: gender || this.state.participantGender,
      participantDevice: device || this.state.participantDevice,
      onlinePurchasingFrequency: frequency || this.state.onlinePurchasingFrequency,
    });
  }

  serialize(array) {
    const object = array.reduce((acc, curr, i) => {
      const accumulator = acc;
      const currentValue = curr;
      accumulator[i] = currentValue;
      return accumulator;
    }, {});
    const serializedData = JSON.stringify(object);
    return serializedData;
  }

  render() {
    const { step, sendData } = this.state;

    const Page = (currentStep) => {
      switch (currentStep) {
        case 2:
          return <ItemList handleChangeStep={this.handleChangeStep} />;
        case 3:
          return <Survey handleChangeStep={this.handleChangeStep} />;
        case 4:
          return <AuthenticityCheck handleChangeStep={this.handleChangeStep} />;
        case 5:
          return <ThankYou />;
        default:
          return <Instruction handleChangeStep={this.handleChangeStep} />;
      }
    };

    return (
      <div>
        <Header />
        <Grid>
          <Row>
            {sendData ? <Statistics {...this.state} /> : null}
            {Page(step)}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Experiment;
