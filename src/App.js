import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';

//dynamically importing
const Weather = lazy(() => import('./components/Weather'));
const Forecast = lazy(() => import('./components/Forecast'));

//const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'bc8924fe097215c8ff14207aabdc54b9';

class App extends Component {
  // from React v16
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    forecastTemp1: undefined,
    forecastTemp2: undefined,
    forecastTemp3: undefined,
    forecastTemp4: undefined,
    forecastTemp5: undefined,
    forecastWeather1: undefined,
    forecastWeather2: undefined,
    forecastWeather3: undefined,
    forecastWeather4: undefined,
    forecastWeather5: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    //Use this to prevent the page from refreshing after update
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    const api_call_forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const forecastData = await api_call_forecast.json();
    console.log(forecastData);

    if (city && country) {
      const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      //Every day - Noon
      const regexTime = /12:00:00$/;
      const filteredTime = forecastData.list
        .map(data => data)
        .filter(record => record.dt_txt.match(regexTime));

      const filteredDate = filteredTime
        .map(record => record.dt_txt
          .match(regexDate));

      const finalDate = filteredDate
        .map(date => date[0].slice(5))
        .map(date => date.split('-'))
        .map(date => date[1].concat(date[0]))
        .map(date => date.substr(0, 2) + '.' + date.substr(2));


      //Setting a state
      this.setState({
        temperature: Math.round(data.main.temp),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        forecastTemp1: Math.round(filteredTime[0].main.temp),
        forecastTemp2: Math.round(filteredTime[1].main.temp),
        forecastTemp3: Math.round(filteredTime[2].main.temp),
        forecastTemp4: Math.round(filteredTime[3].main.temp),
        forecastTemp5: Math.round(filteredTime[4].main.temp),
        forecastWeather1: filteredTime[0].weather[0].main,
        forecastWeather2: filteredTime[1].weather[0].main,
        forecastWeather3: filteredTime[2].weather[0].main,
        forecastWeather4: filteredTime[3].weather[0].main,
        forecastWeather5: filteredTime[4].weather[0].main,
        weatherDate1: finalDate[0],
        weatherDate2: finalDate[1],
        weatherDate3: finalDate[2],
        weatherDate4: finalDate[3],
        weatherDate5: finalDate[4],
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        forecastTemp1: undefined,
        forecastTemp2: undefined,
        forecastTemp3: undefined,
        forecastTemp4: undefined,
        forecastTemp5: undefined,
        forecastWeather1: undefined,
        forecastWeather2: undefined,
        forecastWeather3: undefined,
        forecastWeather4: undefined,
        forecastWeather5: undefined,
        weatherDate1: undefined,
        weatherDate2: undefined,
        weatherDate3: undefined,
        weatherDate4: undefined,
        weatherDate5: undefined,
        error: "Please enter the value!"
      });
    }
  }

//Rendering

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <div className="weather-data">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Weather 
                      temperature={this.state.temperature} 
                      humidity={this.state.humidity}
                      city={this.state.city}
                      country={this.state.country}
                      description={this.state.description}
                      error={this.state.error}
                    />
                    <Forecast 
                      city={this.state.city}
                      country={this.state.country}
                      forecastTemp1={this.state.forecastTemp1}
                      forecastTemp2={this.state.forecastTemp2}
                      forecastTemp3={this.state.forecastTemp3}
                      forecastTemp4={this.state.forecastTemp4}
                      forecastTemp5={this.state.forecastTemp5}
                      forecastWeather1={this.state.forecastWeather1}
                      forecastWeather2={this.state.forecastWeather2}
                      forecastWeather3={this.state.forecastWeather3}
                      forecastWeather4={this.state.forecastWeather4}
                      forecastWeather5={this.state.forecastWeather5}
                      weatherDate1={this.state.weatherDate1}
                      weatherDate2={this.state.weatherDate2}
                      weatherDate3={this.state.weatherDate3}
                      weatherDate4={this.state.weatherDate4}
                      weatherDate5={this.state.weatherDate5}
                    />
                  </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
