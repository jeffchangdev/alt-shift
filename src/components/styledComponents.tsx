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
  background-color: white;
  box-shadow: 
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  display: ${(props) => props.display};
  padding: 6px;
`;

export const ColumnTitle = styled.div`
  margin-bottom: 8px;
`;
