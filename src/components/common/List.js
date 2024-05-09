import ListItem from "./ListItem"
import styled from "styled-components"

const List = ({ title, data }) => {
  return data && data.length > 0 ? (
    <>
      <Title>{title}</Title>
      <ul>
        {data.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </ul>
    </>
  ) : null
}

export default List

const Title = styled.div`
  display: block;
  font-size: 1.2em;
  color: #fff;
  margin-bottom: 10px;
`

const WrappedList = styled.ul`
  display: block;
  font-size: 1.2em;
  list-style: none;
  color: #fff;
  padding-left: 0px;
`
