import { useState } from 'react';
import styled from 'styled-components';

// Define the styled components
const AnimatedCheckmarkWrapper = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;

  &.checked .checkmark-icon {
    transform: scale(1);
  }
`;

const CheckmarkIcon = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #007bff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform-origin: center;
  transform: scale(0);
  transition: transform 0.3s ease-in-out;
`;

const CheckmarkStem = styled.div`
  width: 10px;
  background-color: #007bff;
  height: 2px;
  transform: rotate(45deg);
  position: absolute;
  top: 13px;
  left: 6px;
`;

const CheckmarkKick = styled.div`
  width: 10px;
  background-color: #007bff;
  height: 2px;
  transform: rotate(-45deg);
  position: absolute;
  top: 19px;
  left: 6px;
`;

export default function Checkmark() {
  const [isChecked, setIsChecked] = useState(true);

  setTimeout(() => {
    setIsChecked(false);
  }, 1000);

  return (
    <AnimatedCheckmarkWrapper className={isChecked ? 'checked' : ''}>
      <CheckmarkIcon className="checkmark-icon">
        <CheckmarkStem />
        <CheckmarkKick />
      </CheckmarkIcon>
    </AnimatedCheckmarkWrapper>
  );
}
