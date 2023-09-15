import styled, { keyframes } from 'styled-components';

const slidein = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideout = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

type NotificationContainerProps = {
  show: boolean;
};

const NotificationContainerDiv = styled.div<NotificationContainerProps>`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 20px;
  margin-top: 8px;
  width: 150px;
  animation: ${({ show }) => (show ? slidein : slideout)} 0.5s ease forwards;
`;

const NotificationDiv = styled.div`
  position: relative;
  background-color: #ffffff;
  color: black;
  padding: 2px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid black;
`;

type NotificationProps = {
  message: string;
  showNotification: boolean;
};

export default function Notification({
  message,
  showNotification,
}: NotificationProps) {
  return (
    <NotificationContainerDiv show={showNotification}>
      <NotificationDiv>
        <p>{message}</p>
      </NotificationDiv>
    </NotificationContainerDiv>
  );
}
