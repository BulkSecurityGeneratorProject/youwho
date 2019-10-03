import React from 'react';
import { Button } from 'semantic-ui-react';
import { IComponentProps, IOption } from 'app/modules/chatbot/configure-steps';
import { IRootState } from 'app/shared/reducers';
import { addQuestionResponse, initiateQuestionTimer } from 'app/modules/chatbot/chatbot.reducer';
import { connect } from 'react-redux';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IInterestProps extends IComponentProps, StateProps, DispatchProps {}

export class Interest extends React.Component<IInterestProps> {
  componentDidMount(): void {
    this.props.initiateQuestionTimer();
  }

  commitChoice(option: IOption): void {
    this.props.addQuestionResponse({
      questionId: option.questionId,
      startTime: this.props.questionStartTime,
      endTime: moment(),
      choiceIds: [option.value]
    });
    // @ts-ignore
    this.props.triggerNextStep({ trigger: option.trigger });
  }

  render() {
    const { options } = this.props;

    return (
      <div style={{ width: '100%', alignContent: 'center' }}>
        <Button.Group className="interest-buttons">
          {options.map((option, index) => (
            <Button
              className={`interest-button opt${index}`}
              key={option.trigger}
              content={option.text}
              onClick={() => this.commitChoice(option)}
            />
          ))}
        </Button.Group>
        <div className="interest-tooltip">
          {options.map(option => (
            <span className="interest-tooltip-text" key={option.trigger}>
              {option.description}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  questionStartTime: storeState.chatBot.questionStartTime
});

const mapDispatchToProps = {
  initiateQuestionTimer,
  addQuestionResponse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interest);
