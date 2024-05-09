import React from "react"
import { render, screen } from "@testing-library/react"
import Table from "../../components/common/Table"

describe("Table Component", () => {
  it("return null if no data", () => {
    render(<Table data={[]} />)
    expect(screen.getByText("No data to show")).toBeInTheDocument()
  })

  it("render datra", () => {
    const testData = [
      { temperature: "9 C", date: "2024-09-01" },
      { temperature: "20 C", date: "2023-09-01" },
    ]
    render(<Table data={testData} />)
    expect(screen.getByText("temperature")).toBeInTheDocument()
    expect(screen.getByText("date")).toBeInTheDocument()
    testData.forEach((item) => {
      expect(screen.getByText(item.temperature)).toBeInTheDocument()
      expect(screen.getByText(item.date)).toBeInTheDocument()
    })
  })

  it("when data is null", () => {
    const { container } = render(<Table data={null} />)
    expect(screen.getByText("No data to show")).toBeInTheDocument()
  })
})
