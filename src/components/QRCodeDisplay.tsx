import styled from 'styled-components';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

const CenteredDiv = styled.div`
  width: 200px;
  height: 200px;
  background-color: #fff;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 20px;
`;

export default function QRCodeDisplay() {
  const { columnId } = useParams();

  const columnid = columnId?.split(' ').join('%20');
  const apiUrl = 'http://altshift.netlify.app';
  const value = `${apiUrl}/${columnid}`;

  return (
    <CenteredDiv>
      <TitleDiv>{columnId}</TitleDiv>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={value}
        viewBox="0 0 256 256"
      />
    </CenteredDiv>
  );
}
