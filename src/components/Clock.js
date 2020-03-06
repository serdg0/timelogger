import React, { Component } from 'react';
import ms from 'pretty-ms';
import PropTypes from 'prop-types';
import axios from 'axios';
import { format } from 'date-fns';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      date: '',
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.doneToday = this.doneToday.bind(this);
  }

  startTimer() {
    const date = format(new Date(), 'PP');
    this.setState(state => {
      const { time } = state;
      return {
        time,
        start: Date.now() - time,
        isOn: true,
        date,
      };
    });
    this.timer = setInterval(() => this.setState(state => {
      const { start } = state;
      return {
        time: Date.now() - start,
      };
    }), 1000);
  }

  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  doneToday() {
    const { clock, token, id } = this.props;
    const { date, time } = this.state;
    if (date === '') { return false; }
    axios.post(`https://cors-anywhere.herokuapp.com/https://hidden-ocean-49877.herokuapp.com/todos/${id}/items`, null, { params: { time, date }, headers: { Authorization: token } })
      .then(response => {
        const { data: { items } } = response;
        const { time } = items[items.length - 1];
        const { date } = items[items.length - 1];
        clock({
          time,
          date,
          id,
        });
      }).catch(() => false);
    return this.setState({
      time: 0,
    });
  }

  render() {
    const { time, isOn } = this.state;
    const start = (time === 0)
      ? <button type="button" className="btn btn-color" onClick={this.startTimer}>Start</button>
      : null;
    const stop = (time === 0 || !isOn)
      ? null
      : <button type="button" className="btn btn-color" onClick={this.stopTimer}>Stop</button>;

    const done = (time === 0 || isOn)
      ? null
      : <button type="button" className="btn btn-link btn-sm" onClick={this.doneToday}>Done</button>;
    const resume = (time === 0 || isOn)
      ? null
      : <button type="button" className="btn btn-link btn-sm" onClick={this.startTimer}>Resume</button>;

    return (
      <div className="clock center">
        <p className="numbers">{time === 0 ? 'Start Work' : ms(time, { colonNotation: true })}</p>
        {start}
        {resume}
        {done}
        {stop}
      </div>
    );
  }
}

Clock.propTypes = {
  id: PropTypes.number.isRequired,
  clock: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default Clock;
