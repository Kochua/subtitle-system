import styled from "styled-components";

export const ErrorWrapper = styled.span`
  color: red;
  font-size: 80%;
  margin-top: 15px;
  margin-left: 5px;
`;

export const ServerAnswer = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-size: 80%;
  color: ${props => props.color};
`;
