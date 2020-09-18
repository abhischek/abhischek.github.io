import React from 'react';

const Forecast = (props) => (
    <div className="forecast-container">
        {props.city && props.country && 
        <div className="forecast">
            <ul className="forecast-day">
                <li className="day-title">{props.weatherDate1}</li>
                <li>{props.forecastTemp1} °C</li>
                <li>{props.forecastWeather1}</li>
            </ul>
            <ul className="forecast-day">
                <li className="day-title">{props.weatherDate2}</li>
                <li>{props.forecastTemp2} °C</li>
                <li>{props.forecastWeather2}</li>
            </ul>
            <ul className="forecast-day">
                <li className="day-title">{props.weatherDate3}</li>
                <li>{props.forecastTemp3} °C</li>
                <li>{props.forecastWeather3}</li>
            </ul>
            <ul className="forecast-day">
                <li className="day-title">{props.weatherDate4} </li>
                <li>{props.forecastTemp4} °C</li>
                <li>{props.forecastWeather4}</li>
            </ul>
            <ul className="forecast-day">
                <li className="day-title">{props.weatherDate5}</li>
                <li>{props.forecastTemp5} °C</li>
                <li>{props.forecastWeather5}</li>
            </ul>
        </div>
        }
    </div>
)

export default Forecast;