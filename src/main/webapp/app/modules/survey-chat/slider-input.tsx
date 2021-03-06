import React from 'react';
import { Slider, Handles, Rail } from 'react-compound-slider';
import { IComponentProps, IOption } from 'app/modules/survey-chat/configure-steps';
import { IRootState } from 'app/shared/reducers';
import { addQuestionResponse, initiateQuestionTimer, updateActiveCategory } from 'app/modules/survey-chat/chatbot.reducer';
import { connect } from 'react-redux';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export const Handle = ({ handle: { id, value, percent }, getHandleProps }) => (
  <div
    style={{
      left: `${percent}%`,
      position: 'absolute',
      marginLeft: -20,
      marginTop: 10,
      zIndex: 2,
      width: 46,
      height: 55,
      border: 0,
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '7px',
      backgroundColor: '#fff',
      color: '#fff'
    }}
    {...getHandleProps(id)}
  />
);

// TODO: Make it look as a ruler OR place option.texts on slider

export interface ISliderInputProps extends IComponentProps, StateProps, DispatchProps {}

export class SliderInput extends React.Component<ISliderInputProps> {
  componentDidMount(): void {
    this.props.initiateQuestionTimer();
    if (this.props.activeCategory !== this.props.category) {
      this.props.updateActiveCategory(this.props.category);
    }
  }

  onChange = x => {
    this.props.options.map(option => {
      if (option.value === `${x}`) {
        this.props.addQuestionResponse({
          questionId: option.questionId,
          startTime: this.props.questionStartTime,
          endTime: moment(),
          choiceIds: [option.value]
        });
        // @ts-ignore
        this.props.triggerNextStep({ trigger: option.trigger });
      }
    });
  };

  render() {
    const sliderStyle: React.CSSProperties = {
      // Give the slider some width
      position: 'relative',
      width: '90%',
      left: '5%',
      height: 65
    };

    const railStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: 30,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 5,
      background: 'transparent linear-gradient(278deg, #FFFFFF 0%, #E3E3E6 100%) 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      opacity: 0.52
    };

    const { options } = this.props;
    const min = 1;
    const max = options.length;
    const def = Math.floor(max / 2);
    const className = max < 10 ? 'tooltip' : 'ten-tooltip';
    const emo = options[0].description === '❤️' ? 'emoji' : '';

    return (
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Slider rootStyle={sliderStyle} domain={[min, max]} step={1} values={[def]} onChange={this.onChange}>
          <Rail>
            {(
              { getRailProps } // adding the rail props sets up events on the rail
            ) => <div style={railStyle} {...getRailProps()} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle key={handle.id} handle={handle} getHandleProps={getHandleProps} />
                ))}
              </div>
            )}
          </Handles>
        </Slider>
        <div className={`${className} range${max}`}>
          {options.map((option, index) => (
            <span className={`${className}-text ${emo} range${max} opt${index}`} key={option.trigger}>
              {option.description}
            </span>
          ))}
          {max === 11 && (
            <div style={{ width: '100%' }}>
              <span>Αριστερά</span>
              <span style={{ float: 'right', marginRight: '15px' }}>Δεξιά</span>
            </div>
          )}
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
)(SliderInput);
