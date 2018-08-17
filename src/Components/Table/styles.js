import styled from "styled-components"

export const ModalWrapper = styled.div`
  min-width: 420px;
  padding: 25px;
`

export const FlagContainer = styled.span`
  margin-right: 2px;
  cursor: pointer;
  opacity: ${props => props.exist === 0 && "0.6"};
  filter: ${props => props.exist === 0 && "grayscale(100%)"};
`
