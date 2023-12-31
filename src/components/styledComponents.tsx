/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

type ColumnDivProps = {
  display?: string;
};

export const ColumnDiv = styled.div<ColumnDivProps>`
  display: flex;
  flex-direction: column;
  min-width: 275px;
  height: 100%;
  align-items: stretch;
  background-color: white;
  box-shadow:
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  display: ${(props) => props.display};
  overflow: auto;
`;

export const ColumnTitle = styled.div`
  margin-bottom: 0px;
`;

export const FlexTitleDiv = styled.div`
  position: sticky;
  min-height: 6%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0px 2px 4px 0px rgba(0, 0, 0, 0.14),
    0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  background-color: var(--title-color);
`;
