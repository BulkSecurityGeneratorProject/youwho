import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { IComponentProps } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export interface IMultiSelectProps extends IComponentProps {
  questionId: string;
}

export interface IMultiSelectState {
  boxesChecked: number;
  optChecked: boolean[];
}

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  constructor(props) {
    super(props);
    this.state = {
      boxesChecked: 0,
      optChecked: []
    };
  }

  componentDidMount() {
    this.setState({ optChecked: new Array(this.props.options.length).fill(false) });
  }

  checkBox = index => {
    this.setState({
      boxesChecked: this.state.optChecked[index] ? this.state.boxesChecked - 1 : this.state.boxesChecked + 1,
      optChecked: this.state.optChecked.splice(index, 1, !this.state.optChecked[index]) && this.state.optChecked
    });
  };

  submitChoices = () => {
    // @ts-ignore
    this.props.triggerNextStep({ trigger: 'res_' + this.props.questionId });
  };

  render() {
    const { options } = this.props;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <h2 style={{ fontFamily: 'TTNormsProMedium', fontSize: '10px', color: '#FFFFFF', textAlign: 'center' }}>
          ΕΠΙΛΈΞΤΕ ΈΝΑ Ή ΠΕΡΙΣΣΌΤΕΡΑ
        </h2>
        <Form>
          {options.map((option, index) => (
            <Checkbox
              key={index}
              className="check-box"
              label={option.text}
              onChange={() => this.checkBox(index)}
              checked={this.state.optChecked[index]}
              disabled={!this.state.optChecked[index] && this.state.boxesChecked === 2}
              style={{
                fontFamily: 'TTNormsProMedium',
                fontSize: '15px',
                color: '#777EFF',
                opacity: this.state.optChecked[index] ? 1 : 0.7
              }}
            />
          ))}
          <Form.Button
            className="submit"
            type="submit"
            disabled={!this.state.boxesChecked}
            onClick={this.submitChoices}
            style={{
              fontFamily: 'TTNormsProMedium',
              fontSize: '15px',
              color: '#777EFF',
              textAlign: 'center',
              margin: '6px 0 6px 10px',
              borderStyle: 'none',
              background: 'transparent'
            }}
          >
            υποβολή
          </Form.Button>
        </Form>
      </div>
    );
  }
}

export default MultiSelect;
