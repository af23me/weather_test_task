import axios from "axios"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import List from "../common/List"
import Button from "../common/Button"
import Table from "../common/Table"
import Input from "../common/Input"

const Page = () => {
  // read api key from ENV variables
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  const [loadingEnabled, setLoadingEnabled] = useState(true)
  const [isDataLoading, setDataLoading] = useState(false)
  const [weaterData, setWeaterData] = useState([])
  const [lastTemperature, setLastTemperature] = useState(null)
  const [lastDate, setLastDate] = useState(null)
  const [runInterval, setRunInterval] = useState(false)
  const intervalRef = useRef(null)
  const [locationQuery, setLocationQuery] = useState("48.8567,2.3508")
  const [buttonText, setButtonText] = useState(null)

  useEffect(() => {
    updateButtonText(loadingEnabled)
    if (loadingEnabled && !runInterval) {
      loadAndSaveData()
      itterateLoading()
    }
  }, [loadingEnabled, runInterval])

  const handleClick = () => {
    const enabled = !loadingEnabled
    if (!enabled && runInterval) {
      cancelLoading()
    } else {
      setLoadingEnabled(enabled)
    }
  }

  const cancelLoading = () => {
    setLoadingEnabled(false)
    clearInterval(intervalRef.current)
    setRunInterval(false)
  }

  const itterateLoading = () => {
    const interval = setInterval(() => {
      loadAndSaveData()
    }, 5000)
    intervalRef.current = interval
    setRunInterval(true)
  }

  const handleQuery = (value) => {
    return setLocationQuery(value)
  }

  const loadRemoteData = () => {
    try {
      setDataLoading(true)
      const res = axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationQuery}`,
      )
      return res
    } catch (error) {
      setDataLoading(false)
      return Promise.reject(error)
    }
  }

  const saveRemoteData = (data) => {
    const { last_updated, temp_c } = data.current
    const temperature = `${temp_c} C`
    const item = {
      temperature: temperature,
      date: last_updated,
    }
    setWeaterData((weaterData) => {
      if (weaterData.length > 9) {
        weaterData.shift()
      }
      return [...weaterData, item]
    })
    setLastTemperature(temperature)
    setLastDate(last_updated)
  }

  const loadAndSaveData = () => {
    if (isDataLoading) {
      // skip loading if another request is running more than 5 seconds
      return
    }

    loadRemoteData()
      .then(({ data }) => {
        saveRemoteData(data)
      })
      .catch((error) => {
        cancelLoading() // and show popup instead of log in console
        alert(error.message)
      })
      .finally(() => {
        setDataLoading(false)
      })
  }

  const updateButtonText = (enabled) => {
    setButtonText(enabled ? "Pause fetching" : "Start fetching")
  }

  const lastDataCollection = [
    {
      title: "Last Temperature",
      value: lastTemperature,
    },
    {
      title: "Last Date",
      value: lastDate,
    },
  ]

  return (
    <FlexContainer>
      <FlexItem>
        <Input title="Query" value={locationQuery} onInput={handleQuery} />
        <Button text={buttonText} onClick={handleClick} />
      </FlexItem>
      {lastTemperature && (
        <FlexItem>
          <List title="Last loaded data" data={lastDataCollection} />
        </FlexItem>
      )}

      <FlexItem>
        <Table data={weaterData} />
      </FlexItem>
    </FlexContainer>
  )
}

export default Page

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  color: #fff;
`

const FlexItem = styled.div`
  background-color: #363636;
  padding: 10px;
  margin: 10px 0px;
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  min-width: 400px;
  border-radius: 8px;

  &:hover {
    background-color: #363642;
  }

  @media screen and (max-width: 768px) {
    max-width: 90%;
    min-width: auto;
    margin: 20px;
    width: 100%;
  }
`
