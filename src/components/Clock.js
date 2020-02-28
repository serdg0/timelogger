import React, { Component } from 'react';
import ms from 'pretty-ms';
import axios from 'axios';
import { format } from 'date-fns';
import { numbers } from '../style/style';

class Clock extends Component {
    constructor(props){
        super(props)
        this.state = {
          time: 0,
          isOn: false,
          start: 0,
          id: this.props.id,
          date: '',
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.doneToday = this.doneToday.bind(this);
      }

      startTimer() {
        let date = format(new Date(), 'PP');
        this.setState({
          time: this.state.time,
          start: Date.now() - this.state.time,
          isOn: true,
          date: date
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1000);
      }

      stopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer);
      }

      doneToday() {
          const { clock, token, id } = this.props;
          const { date, time } = this.state;
          if (date === '') { return false };
          axios.post(`http://localhost:3001/todos/${id}/items`, null, { params: {time: time, date: date}, headers: {Authorization: token}})
          .then(response => {
            const { data: { items } } = response;
            const time = items[items.length - 1].time;
            const date = items[items.length - 1].date;
            clock({
              time: time,
              date: date,
              id: id,
            });
          }).catch(error => console.log(error));
          this.setState({
            time: 0,
          })
      }

      render() {
        const start = (this.state.time === 0) ?
          <button onClick={this.startTimer}>start</button> :
          null;
        const stop = (this.state.time === 0 || !this.state.isOn) ?
          null :
          <button onClick={this.stopTimer}>stop</button>;
        
        const done = (this.state.time === 0 || this.state.isOn) ?
          null :
          <button type="button" onClick={this.doneToday}>Done</button>;
        const resume = (this.state.time === 0 || this.state.isOn) ?
          null :
          <button onClick={this.startTimer}>resume</button>;
          
        return(
          <div>
            <p style={numbers}>{this.state.time === 0 ? 'Start Work' : ms(this.state.time, { colonNotation: true })}</p>
            {start}
            {resume}
            {done}
            {stop}
          </div>
        )
      }
}

export default Clock;