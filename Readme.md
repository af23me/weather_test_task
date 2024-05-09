# Test Task for getting Weather 

## Intro

Note: *This repo was created as test task and do not used in production.*

Test task requirements was:

The application must use React function components (not React class components).
The application can use any other libraries.
The temperature and timestamp must update automatically every 5s.
There must be a Play/Pause button to temporarily stop the data from updating.
The design must be inspired by the wireframe diagram attached.
The design must be responsive.
The temperature value must come from a third party API [https://www.weatherapi.com/docs/](https://www.weatherapi.com/docs/).

## Setup

* Create network: `$ docker network create weather_task_task`
* Build image: `$ docker compose build`
* Copy file `.env.example` to `.env` and fill it with your `REACT_APP_WEATHER_API_KEY` for Weatherapi service requests.

## Development

Run service `docker compose up`
Open browser [http://localhost:3000/](http://localhost:3000/) 

## Testing

Run tests: `$ docker compose run weather_web npm run test`

## What can be improved?

* Add popup for messages about failed loading.
* Add more tests
* Add linter
