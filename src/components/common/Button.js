import styled from "styled-components"

const Button = ({ text, onClick }) => {
  const handleClick = () => {
    onClick()
  }

  return <WrappedButton onClick={handleClick}>{text}</WrappedButton>
}

export default Button

const WrappedButton = styled.button`
  display: block;
  font-size: 1.1em;
  color: #000000;
  background-color: #34b4f1;
  margin: 10px 0px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #63c6f5;
  }
`
