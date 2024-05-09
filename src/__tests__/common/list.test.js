import React from "react"
import { render, screen } from "@testing-library/react"
import List from "../../components/common/List"

describe("List Component", () => {
  it("return null if no data", () => {
    const { container } = render(<List title="Test List" data={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders datra", () => {
    const testData = [
      { title: "Item 1", value: "Value 1" },
      { title: "Item 2", value: "Value 2" },
    ]
    render(<List title="Test List" data={testData} />)
    expect(screen.getByText("Test List")).toBeInTheDocument()
    testData.forEach((item) => {
      expect(
        screen.getByText(`${item.title}: ${item.value}`),
      ).toBeInTheDocument()
    })
  })

  it("when data is null", () => {
    const { container } = render(<List title="Test List" data={null} />)
    expect(container).toBeEmptyDOMElement()
  })
})
