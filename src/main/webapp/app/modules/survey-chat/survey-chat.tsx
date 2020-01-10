import './chatbot.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { initiateSurveyResponse, storeSurveyResponse } from 'app/modules/survey-chat/chatbot.reducer';
import ChatBot from 'react-simple-chatbot';
import ProgressBar from 'app/modules/survey-chat/progress-bar';
import { ThemeProvider } from 'styled-components';
import { configureStep } from 'app/modules/survey-chat/configure-steps';
import { defaultValue as SurveyResponseDefault } from 'app/shared/model/survey-response.model';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IChatBotProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export class SurveyChat extends React.Component<IChatBotProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { surveysByName } = this.props;
    const survey = surveysByName[this.props.match.params.id];
    if (survey && this.props.currentSurveyResponse === SurveyResponseDefault) {
      this.props.initiateSurveyResponse(survey, moment());
    }
  }

  render() {
    const { surveysByName, activeCategory } = this.props;
    const survey = surveysByName[this.props.match.params.id];
    if (!survey) {
      return <Redirect to="/" />;
    }
    const steps = configureStep(survey.questions);

    return (
      <div style={{ width: '100%', backgroundColor: '#6065CC' }}>
        <ProgressBar
          activeCategory={activeCategory}
          categories={[
            'Εισαγωγή',
            'Δημογραφικά',
            'Ελλάδα & Κόσμος',
            'Κοινωνικές αξίες & δράσεις',
            'Πολιτική & Πρόσωπα',
            'Lifestyle & Προσωπικότητα'
          ]}
        />
        <ThemeProvider
          theme={{
            background: '#777EFF',
            fontFamily: 'TTNormsProMedium',
            botBubbleColor: '#FFFFFF',
            botFontColor: '#777EFF',
            userBubbleColor: 'rgba(255, 255, 255, 0.65)',
            userFontColor: '#777EFF'
          }}
        >
          <ChatBot
            hideUserAvatar
            cache
            botAvatar="content/images/granny.jpg"
            footerStyle={{ display: 'none' }}
            hideHeader
            handleEnd={() => this.props.storeSurveyResponse(survey)}
            steps={steps}
            style={{
              height: 'calc(100vh - 132px)',
              userSelect: 'none',
              borderRadius: '0px',
              width: window.innerWidth > 414 ? '600px' : '100%',
              marginLeft: window.innerWidth > 414 ? '30%' : '0'
            }}
            contentStyle={{
              height: window.innerWidth > 414 ? '70%' : '100%'
            }}
            bubbleStyle={{
              userSelect: 'none'
            }}
            bubbleOptionStyle={{
              background: 'rgba(255, 255, 255, 0.65)'
            }}
            customStyle={{
              botBubbleColor: 'transparent'
            }}
            width="100%"
          />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  surveysByName: storeState.survey.entitiesByName,
  currentSurveyResponse: storeState.chatBot.currentSurveyResponse,
  activeCategory: storeState.chatBot.activeCategory
});

const mapDispatchToProps = {
  initiateSurveyResponse,
  storeSurveyResponse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyChat);
