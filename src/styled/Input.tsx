import styled from "styled-components";

export const SquareButton = styled.div<{ color?: string; size?: number }>`
  width: ${(props) => props.size || 16}px;
  height: ${(props) => props.size || 16}px;
  margin: 0px 10px 10px 0px;
  cursor: pointer;
  position: relative;
  outline: none;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px;
  background: ${(props) => props.color};
`;

export const SquareButtonIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const SizeSelector = styled.input`
  width: fit-content;
  max-width: 40px;
  height: fit-content;
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
`;
