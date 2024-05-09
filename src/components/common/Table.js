import TableRow from "./TableRow"
import styled from "styled-components"

const Table = ({ data }) => {
  return data && data.length > 0 ? (
    <WrapedTable>
      <thead>
        <tr>
          {Object.keys(data[0]).map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} item={item} />
        ))}
      </tbody>
    </WrapedTable>
  ) : (
    <p>No data to show</p>
  )
}

export default Table

const WrapedTable = styled.table`
  background-color: #ffffff;
  width: 100%;
  text-align: center;

  th {
    background-color: #363636;
    color: #fff;
    font-weight: 600;
  }

  tr,
  td {
    line-height: 30px;
  }

  tr:nth-child(even) {
    background-color: #eee;
  }
`
