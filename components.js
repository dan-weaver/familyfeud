import React from "react";
import { Notes } from "mdx-deck";

export class Foo extends React.Component {
  render() {
    const { children } = this.props;
    return <div>{children} sup yo</div>;
  }
}

function getQuestionAnswerPair(children) {
  let question;
  let answers = [];
  React.Children.forEach(children, (c, i) => {
    if (c.type === "div") {
      React.Children.forEach(c.props.children, (c, i) => {
        if (i === 0) {
          question = c;
        } else {
          answers.push(c);
        }
      });
    }
  });
  return [question.props.children, answers.map(a => a.props.children)];
}

export class QuestionLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAnswers: []
    };
  }
  componentDidMount() {
      console.log("mount")
  }
  componentWillUnmount() {
      console.log("unmount")
  }
  uncheckAnswer(answerText) {
    const checkedAnswers = this.state.checkedAnswers.filter(
      aText => aText != answerText
    );
    this.setState({
      checkedAnswers: checkedAnswers
    });
  }
  checkAnswer(answerText) {
    const checkedAnswers = this.state.checkedAnswers.filter(
      aText => aText != answerText
    );
    this.setState({
      checkedAnswers: checkedAnswers.concat([answerText])
    });
  }
  isChecked(answerText) {
    return this.state.checkedAnswers.indexOf(answerText) != -1;
  }
  renderAnswers(answers, stealthMode) {
    return (
      <ul style={{ listStyleType: "none" }}>
        {answers.map(a => (
          <li style={{ margin: "20px", padding: "10px", position: "relative" }}>
            {stealthMode && !this.isChecked(a) ? (
              <div
                style={{
                  borderRadius: "3px",
                  cursor: "pointer",
                  backgroundColor: "lightblue",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
                onClick={e => {
                  this.checkAnswer(a);
                }}
              />
            ) : null}
            {a}{" "}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const [question, answers] = getQuestionAnswerPair(this.props.children);
    return (
      <div className="QuestionLayout" style={{ textAlign: "left" }}>
        <h1>{question}</h1>
        <div>{this.renderAnswers(answers, true)}</div>
        <Notes>{this.renderAnswers(answers, false)}</Notes>
      </div>
    );
  }
}
