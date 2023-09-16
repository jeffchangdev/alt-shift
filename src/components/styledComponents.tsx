/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

type ColumnDivProps = {
  display?: string;
};

export const ColumnDiv = styled.div<ColumnDivProps>`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%
  border: 1px solid lightgrey;
  align-items: stretch;
  background-color: #fcfcfc;
  display: ${(props) => props.display};
`;

export const ColumnTitle = styled.div`
  margin-bottom: 8px;
`;
