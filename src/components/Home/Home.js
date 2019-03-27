import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
// import "./styles.css";
import './Home.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      tablesArray: [],
      q: [],
    }
    // this.start = this.start.bind(this);
  }

  start = () => {
    const { tablesArray } = this.state;
    const { quiz: { questions }, shuffle } = this.props;

    let questionsFiltered = [];
    tablesArray.forEach(num => {
      questions.filter(q => 
        q.number1 === num || q.number2 === num
      ).forEach(rec => questionsFiltered.push(rec));
    });



    if(shuffle) {
      questionsFiltered = this.shuffleQuestions(questionsFiltered);
    }

    this.setState({
      q: questionsFiltered,
    })

    this.setState({start: true})

  }

  shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  handleOnChange = e => {
    const { tablesArray } = this.state;
    const { target: { checked, value } } = e;
    if (checked) {
      if (!tablesArray.includes(value)) {
        this.setState({
          tablesArray: [ ...tablesArray, Number(value) ],
        });
      }
    } else {
      const array = tablesArray.filter(val => val !== Number(value));
      this.setState({
        tablesArray: [ ...array ],
      });
    }
  }

  render() {
    const { quiz } = this.props;
    console.log(this.state.tablesArray);

    if(!quiz) {
      console.error("Quiz object is required.");
      return (null);
    } 

    return (
      <div className="react-quiz-container">
        {!this.state.start &&
          <div>
            <h2>{quiz.quizTitle}</h2>
            {/*
            <div>{questionsFiltered.length} Questions</div>
            */}
            { quiz.quizSynopsis && 
                <div className="quiz-synopsis">
                  {quiz.quizSynopsis}
                </div> 
            }
            <div className="startQuizWrapper">
                <p>
                  <strong>Select multiplication tables:</strong><br />
                </p>
                <input type="checkbox" name="size_2" id="size_2" value="2" onChange={this.handleOnChange} /><label>2&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_3" id="size_3" value="3" onChange={this.handleOnChange} /><label>3&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_4" id="size_4" value="4" onChange={this.handleOnChange} /><label>4&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_5" id="size_5" value="5" onChange={this.handleOnChange} /><label>5&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_6" id="size_6" value="6" onChange={this.handleOnChange} /><label>6&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_7" id="size_7" value="7" onChange={this.handleOnChange} /><label>7&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_8" id="size_8" value="8" onChange={this.handleOnChange} /><label>8&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_9" id="size_9" value="9" onChange={this.handleOnChange} /><label>9&nbsp;&nbsp;</label>
                <input type="checkbox" name="size_12" id="size_12" value="12" onChange={this.handleOnChange} /><label>12 </label>

                {this.state.tablesArray.length > 0 &&
                  <div>
                    <p>
                      <button onClick={() => this.start()} className="startQuizBtn btn">Start Quiz</button>
                    </p>
                  </div>
                }

            </div>
          </div>
        }

        {this.state.start && 
          <Question questions={this.state.q} tables={this.state.tablesArray}/>
        }
      </div>
    );
  }
}



Quiz.propTypes = {
  quiz: PropTypes.object,
  shuffle: PropTypes.bool
};

export default Quiz;
