import styled from "styled-components"

const Input = ({ value, title, onInput }) => {
  return (
    <div>
      <Title>{title}:</Title>
      <InputComponent
        type="text"
        value={value}
        placeholder={title}
        onChange={(e) => {
          const val = e.target.value
          onInput((_) => val)
        }}
      />
    </div>
  )
}

export default Input

const Title = styled.div`
  display: block;
  font-size: 1.2em;
  color: #fff;
`
const InputComponent = styled.input`
  display: block;
  margin: 4px 0;
  width: 100%;
  height: 25px;
  line-height: 25px;
  padding: 0 4px;
  border-radius: 4px;
  border: none;
`
