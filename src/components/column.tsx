import styled from 'styled-components';

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid lightgrey;
  align-items: stretch;
`;

export const ColumnTitle = styled.div`
  margin-bottom: 8px;
`;

type ColumnProps = {
  columnid: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function Column({ columnid, text, children }: ColumnProps) {
  return (
    <ColumnDiv key={columnid}>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
    </ColumnDiv>
  );
}
