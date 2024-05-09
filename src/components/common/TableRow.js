const TableRow = ({ item }) => {
  return (
    <tr>
      {Object.values(item).map((v, index) => (
        <td key={index}>{v}</td>
      ))}
    </tr>
  )
}

export default TableRow
