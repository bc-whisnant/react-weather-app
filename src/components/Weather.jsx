import React, { Component } from 'react'
import axios from 'axios'

export default class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      currentTemp: '',
      humidity: '',
      feelsLike: '',
      maxTemp: '',
      minTemp: '',
      name: '',
      description: '',
      submitted: false,
    }
  }

  API_KEY = '731509ea59cc8fb073325761658c3185'

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    })
  }

  getWeatherInfo = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&units=imperial&apikey=${this.API_KEY}`
      )
      .then((response) => {
        const main = response.data.main
        const weather = response.data.weather

        const temp = main.temp
        const humidity = main.humidity
        const feels_like = main.feels_like
        const temp_max = main.temp_max
        const temp_min = main.temp_min
        const description = weather[0].description

        this.setState({
          description: description,
          currentTemp: temp,
          humidity: humidity,
          feelsLike: feels_like,
          maxTemp: temp_max,
          minTemp: temp_min,
          name: response.data.name,
          submitted: true,
        })
      })
  }

  render() {
    return (
      <div className="weather-container">
        <form onSubmit={this.getWeatherInfo}>
          <input
            type='text'
            placeholder='Enter value'
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
        <div className='weather-container'>
          {this.state.submitted ? (
            <div>
              <p>
                {' '}
                In {this.state.name} the weather is described as {this.state.description}. The current temperature is {this.state.currentTemp} degrees.
              </p>
              <p>
                The max today was {this.state.maxTemp} and the min was {this.state.minTemp}. It feels like it is {this.state.feelsLike} degrees.
              </p>
            </div>
          ) : (
            <p>Search for weather</p>
          )}
        </div>
      </div>
    )
  }
}
