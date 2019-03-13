import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      endQuiz: false,
      currentQuestionIndex: 0,
      buttonClasses: {},
      answerGiven: [],
      showSubmitButton: true,
      score: 0,
      time: 0,
      timeInterval: null,
    };
  }


  componentDidMount() {
    if (!this.state.endQuiz)
      this.interval = setInterval(this.incrementTime, 1000);
  }

  incrementTime = () => {
    this.setState({
      time: this.state.time + 1,
    })
  }

  handleOnChange = e => {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    });
  }

  checkAnswer = (answer, correctAnswer) => {
    const { answerGiven } = this.state;
    const correct = (answer === correctAnswer);
    this.setState({
        correctAnswer: correct,
        incorrectAnswer: !correct,
        showNextQuestionButton: true,
        showSubmitButton: false,
        answerGiven: [ ...answerGiven, answer ],
        score: (correct ? this.state.score + 1 : this.state.score)
    })
  }

  nextQuestion = (currentQuestionIndex) => {
    const { questions } = this.props;
    let initState = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      showSubmitButton: true,
      answer: '',
    }
    if (currentQuestionIndex + 1 === questions.length) {
      this.setState({
        ...initState,
        endQuiz: true,
      });
      clearInterval(this.interval);

    } else {
      this.setState({
        ...initState,
        currentQuestionIndex: currentQuestionIndex + 1,
      })
    }
  }

  componentDidUpdate() {
    if (!this.state.endQuiz) {
      if (this.state.showNextQuestionButton) {
        this._inputAnswer.blur();
        this.nextQuestionButton.focus();
      }
      if (this.state.showSubmitButton)
        this._inputAnswer.focus();
    }
  }

  renderResults = () => {
    const { questions } = this.props;
    const { answerGiven } = this.state;
    return questions.map((q, idx) => 
      <div className="result-answer-wrapper" key={idx+1}>
        <div class="row">
          <div class="col-qnum">({idx+1})</div>
          <div class="col-num">{q.number1}</div>
          <div class="col-operand">x</div>
          <div class="col-num">{q.number2}</div>
          <div class="col-operand">=</div>
          <div class="col-answer">{q.correctAnswer}</div>
          <div class="col-text"> 
            - You answered {answerGiven[idx]} -
            <span className={q.correctAnswer !== answerGiven[idx] ? "incorrect_highlight" : "correct_highlight"}>
              {q.correctAnswer === answerGiven[idx] ? 'Correct' : 'Wrong'}
            </span> 
          </div>
        </div>
      </div>
    );
  }


  render() {
    const { questions, tables } = this.props;
    const { score, answer, time } = this.state;
    let question = questions[this.state.currentQuestionIndex];
    return (
      <div className="questionWrapper">
        {!this.state.endQuiz &&
          <form autoComplete="off">
              <div className="questionWrapperBody">
                <div>Question {this.state.currentQuestionIndex + 1}/{questions.length}:</div>
                <div>Score: {score} / {questions.length}</div>
                <div>Time: {time}</div>
                <h3>{`${question.number1} x ${question.number2} = `}</h3>
                <div>
                  <p>
                    <input
                      type="text"
                      name="answer"
                      readOnly={!this.state.showSubmitButton}
                      autoFocus
                      value={answer}
                      onChange={this.handleOnChange}
                      ref={a => this._inputAnswer = a}
                    />
                  </p>
                </div>
                {this.state.showSubmitButton &&
                  <button
                    onClick={() => this.checkAnswer(isNaN(answer) ? answer :  Number(answer), question.correctAnswer)}
                    className="nextQuestionBtn btn"
                    >
                    Submit
                    </button>
                }
                {this.state.showNextQuestionButton &&
                  <div>
                    <button
                      onClick={() => this.nextQuestion(this.state.currentQuestionIndex)}
                      className="nextQuestionBtn btn"
                      ref={a => this.nextQuestionButton = a}
                    >
                      Next
                    </button>
                  </div>
                }
                <div className="questionModal">
                  {this.state.incorrectAnswer &&
                    <div className="alert incorrect">Wrong the correct answer is {question.correctAnswer}</div>
                  }
                  {this.state.correctAnswer &&
                    <div className="alert correct">Correct</div>
                  }
                </div>
              </div>
          </form>
        }
        {this.state.endQuiz &&
          <div className="result-answer-wrapper">
            <h2>Score: {score} / {questions.length}</h2>
            <div className="subHeading">
              <div>Time: {time} seconds</div>
              <div>Tables: [
                {tables.map((r, idx) => idx === (tables.length - 1) ? r : r + ', ')}
                ]
              </div>
            </div>
            {this.renderResults()}
            
          </div>
        }
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.array,
};

export default Question;
