import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./App";
const WheelContainer = styled.div<{
  rotation: number;
  time: number;
}>`
  border-radius: 100%;
  overflow: hidden;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  background-color: black;
  transition: rotate;
  transform: rotate(${(props) => props.rotation}deg);
  transition: transform ${(props) => props.time}s cubic-bezier(0.1, 0.7, 0.1, 1);

  &:nth-child(odd) {
    background-color: green;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const WheelWrapper = styled.div`
  max-width: 400px;
  height: 100%;
  flex-grow: 1;
  position: relative;
  margin-right: 20px;
`;

interface SegmentProps {
  offset: number;
  blub: number;
  over50: boolean;
  colorBg: string;
}

interface InnerSegmentProps {
  value: number;
  colorBg: string;
}

interface LabelProps {
  offset: number;
  value: number;
}

const Segment = styled.div.attrs<SegmentProps>(({ offset }) => ({
  // we can define static props
  style: {
    transform: `translate(100%, 0) rotate(${(offset / 100) * 360}deg)`,
  },
}))<SegmentProps>`
  overflow: ${(props) => (props.over50 ? "visible" : "hidden")};
  padding-bottom: 100%;
  width: 50%;
  position: absolute;
  transform-origin: 0 50%;

  &:after {
    content: "";
    background: ${(props) => props.colorBg};
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: ${(props) => (props.over50 ? "1" : "0")};
  }
`;

const SegmentInner = styled.div.attrs<InnerSegmentProps>(({ value }) => ({
  // we can define static props
  style: {
    transform: `rotate(-180deg) rotate(${(value / 100) * 360}deg)`,
  },
}))<InnerSegmentProps>`
  content: "rerer";
  background: ${(props) => props.colorBg};
  padding-bottom: 200%;
  width: 100%;
  transform-origin: 0 50%;
  position: absolute;
`;

const Label = styled.div.attrs<LabelProps>(({ offset, value }) => ({
  // we can define static props
  style: {
    transform: `translate(20px, -50%) rotate(${
      ((offset + value / 2) / 100) * 360 - 90
    }deg) `,
  },
}))<LabelProps>`
  position: absolute;
  top: 50%;
  width: 50%;
  text-align: center;
  left: 50%;
  transform-origin: -20px 50%;
  color: ${(props) => props.color};
`;

const Marker = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-right: 20px solid black;
  border-bottom: 10px solid transparent;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(75%, -50%);
`;

type MyProps = {
  areas: string[];
  spinningTime: number;
  numberOfColors: number;
  colorsBackground: string[];
  colorsFont: string[];
  weights: number[];
};

const Wheel: React.FC<MyProps> = ({
  areas,
  spinningTime,
  numberOfColors,
  colorsBackground,
  colorsFont,
  weights,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setSpinning] = useState<boolean>(false);

  const spin = () => {
    const rotationNew = rotation + spinningTime * 720 + Math.random() * 360;
    setRotation(rotationNew);
    setSpinning(true);
  };

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => setSpinning(false), spinningTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning, spinningTime]);

  const WEIGHTS_SUM = weights.reduce(
    (sum: number, element: string | number) => sum + Number(element),
    0
  );

  const renderSegments = () => {
    let segments = [];
    let offset = 0;
    for (let i = 0; i < areas.length; i++) {
      segments.push(
        <div key={i}>
          <Segment
            offset={(offset * 100) / WEIGHTS_SUM}
            key={`${i}seg`}
            blub={7}
            over50={(weights[i] * 100) / WEIGHTS_SUM > 50}
            colorBg={colorsBackground[i % numberOfColors]}
          >
            <SegmentInner
              value={(weights[i] * 100) / WEIGHTS_SUM}
              colorBg={colorsBackground[i % numberOfColors]}
              key={`${i}segI`}
            />
          </Segment>
          <Label
            offset={(offset * 100) / WEIGHTS_SUM}
            value={(weights[i] * 100) / WEIGHTS_SUM}
            color={colorsFont[i % 4]}
          >
            {areas[i]}
          </Label>
        </div>
      );
      offset += weights[i];
    }

    return segments;
  };
  return (
    <Container>
      <WheelWrapper>
        <WheelContainer rotation={rotation} time={spinningTime}>
          {renderSegments()}
        </WheelContainer>
        <Marker />
      </WheelWrapper>
      <Button onClick={spin} disabled={isSpinning} size="large" color="fancy">
        Spin
      </Button>
    </Container>
  );
};

export default Wheel;
