import styled from 'styled-components'

export const InputForm = styled.input`
  margin: 8px auto;
  padding: 5px;
  border-radius: 4px;
  display: block;
  min-width: 300px;

  &:hover, &:focus {
    background-color: #9c9c9c;
    color: #fff;

    &::placeholder {
      color: #fff;
    }
  }
`

export const FormButton = styled.button`
  background-color: #dcdcdc;
  margin: 5px;
  padding: 5px 10px;
  min-width: 150px;
  border-radius: 5px;
  border: 2px solid #6c6c6c;

  &:hover {
    background-color: #75a72f;
    color: #fff;
  }
`
