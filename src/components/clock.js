import React, { Component } from 'react';
import ms from 'pretty-ms';
import axios from 'axios';

class Clock extends Component {
    constructor(props){
        super(props)
        this.state = {
          time: 0,
          isOn: false,
          start: 0,
          id: this.props.id,
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.doneToday = this.doneToday.bind(this);
      }

      startTimer() {
        this.setState({
          time: this.state.time,
          start: Date.now() - this.state.time,
          isOn: true
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1000);
      }

      stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }

      doneToday() {
          const toAction = ['id', 'time'];
          const { clock } = this.props;
          const filtered = Object.keys(this.state).filter(key => toAction.includes(key))
          .reduce((obj, key) => {
              obj[key] = this.state[key];
              return obj;
          }, {})
          console.log(filtered)
          clock(filtered);
      }

      render() {
        let start = (this.state.time == 0) ?
          <button onClick={this.startTimer}>start</button> :
          null
        let stop = (this.state.time == 0 || !this.state.isOn) ?
          null :
          <button onClick={this.stopTimer}>stop</button>
        let resume = (this.state.time == 0 || this.state.isOn) ?
          null :
          <button onClick={this.startTimer}>resume</button>
          
        return(
          <div>
            <p>{this.state.time === 0 ? 'Start Project' : ms(this.state.time, { colonNotation: true })}</p>
            {start}
            {resume}
            {stop}
            <button type="button" onClick={this.doneToday}>Done</button>
          </div>
        )
      }
}

export default Clock;