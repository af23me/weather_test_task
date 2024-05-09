import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Page from "../../components/weaterPage/Page"
import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"

const mock = new AxiosMockAdapter(axios)

const mockWeatherData = (response) => {
  mock.onGet(/current.json/).reply(200, response)
}

describe("Page Component", () => {
  it("renders initial data on the scren", () => {
    render(<Page />)
    expect(screen.getByText("Stop fetching")).toBeInTheDocument()
    expect(screen.getByTitle("Query:")).toBeInTheDocument()
    expect(screen.queryByText("Last loaded data")).toBeInTheDocument()
  })

  it("check table data", async () => {
    const fakeResponse = {
      data: {
        current: {
          last_updated: "2024-10-10",
          temp_c: 20,
        },
      },
    }
    mockWeatherData(fakeResponse)

    const { queryByText } = render(<Page />)

    await waitFor(() =>
      expect(queryByText("Last Temperature: 20 C")).toBeInTheDocument(),
    )

    expect(queryByText("Last Date: 2020-10-10")).toBeInTheDocument()
  })

  it("handles input changes", () => {
    const { getByTitle } = render(<Page />)
    const input = getByTitle("Query")
    fireEvent.change(input, { target: { value: "48.8567,2.4433" } })
    expect(input.value).toBe("48.8567,2.4433")
  })
})
