
import React, { useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

function Home() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const searchWeather = async () => {

    if (city === '') {
      setError('Please enter a city name')
      return
    }

    try {

      setError('')
      setWeather(null)

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )

      if (!response.ok) {
        throw new Error('City not found')
      }

      const data = await response.json()

      setWeather(data)

    } catch (error) {

      setError(error.message)

    }
  }

  return (
   <div>
    <Container className="mt-5 rounded-4 bg-primary bg-gradient p-4 p-md-5 text-white shadow">
  <h1 className="mb-4 text-center fw-bold">
    🌤️ Weather App
  </h1>

  <Row className="justify-content-center">
    <Col md={8} lg={6}>
      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <Button
          type="button"
          variant="light"
          className="fw-semibold text-primary"
          onClick={searchWeather}
        >
          Search
        </Button>
      </InputGroup>

      {error && (
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      )}

      {weather && (
        <Card className="mt-4 rounded-4 border-0 text-center text-dark shadow">
          <Card.Body className="p-4 p-md-5" aria-live="polite">
            <h2 className="h3 fw-bold">{weather.name}</h2>

            <p className="display-4 my-4 fw-bold text-primary">
              🌡️ {weather.main.temp}°C
            </p>

            <p className="mb-4 text-capitalize text-secondary">
              ☁️ {weather.weather?.[0]?.description || "Weather unavailable"}
            </p>

            <Row className="g-3">
              <Col sm={6}>
                <div className="h-100 rounded-3 bg-light p-3">
                  <p className="small text-secondary mb-1">Humidity</p>
                  <p className="fw-semibold mb-0">
                    💧 {weather.main.humidity}%
                  </p>
                </div>
              </Col>

              <Col sm={6}>
                <div className="h-100 rounded-3 bg-light p-3">
                  <p className="small text-secondary mb-1">Wind Speed</p>
                  <p className="fw-semibold mb-0">
                    💨 {weather.wind.speed} m/s
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Col>
  </Row>
</Container>
   </div>
  )
}

export default Home

