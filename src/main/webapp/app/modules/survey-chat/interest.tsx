import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { IComponentProps, IOption } from 'app/modules/survey-chat/configure-steps';
import { IRootState } from 'app/shared/reducers';
import { addQuestionResponse, initiateQuestionTimer, updateActiveCategory } from 'app/modules/survey-chat/chatbot.reducer';
import { connect } from 'react-redux';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IInterestProps extends IComponentProps, StateProps, DispatchProps {}

export class Interest extends React.Component<IInterestProps> {
  componentDidMount(): void {
    this.props.initiateQuestionTimer();
    if (this.props.activeCategory !== this.props.category) {
      this.props.updateActiveCategory(this.props.category);
    }
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
        <Menu compact borderless className="interest-component">
          {options.map((option, index) => (
            <Menu.Item as={Button} key={option.trigger} content={option.text} onClick={() => this.commitChoice(option)} />
          ))}
        </Menu>
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
  questionStartTime: storeState.chatBot.questionStartTime,
  activeCategory: storeState.chatBot.activeCategory
});

const mapDispatchToProps = {
  initiateQuestionTimer,
  addQuestionResponse,
  updateActiveCategory
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interest);
