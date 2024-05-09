import styled from "styled-components"

const ListItem = ({ item }) => {
  return (
    <WrappedListItem>
      {item.title}: {item.value}
    </WrappedListItem>
  )
}

export default ListItem

const WrappedListItem = styled.ul`
  color: #fff;
`
