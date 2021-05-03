import React, { useState } from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import { Row, Col, Container } from "./Grid";
import Accordion from "./Accordion";

const AreaInput = styled.input`
  padding: 10px;
  flex-grow: 1;
  outline: 0;
  border: 0;
  width: 100%;
`;

type NumberInputProps = {
  type: string;
};
const NumberInput = styled.input.attrs<NumberInputProps>((type) => ({
  type: "number",
  min: 1,
}))<NumberInputProps>`
  width: 50px;
`;

const LabelWeightInput = styled.span`
  font-weight: 500;
  font-size: 16px;
  margin-right: 5px;
`;
const Title = styled.h1``;

const InputBase = styled.div`
  display: inline-flex;
  border: 2px solid black;
  align-items: center;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus-within {
    outline: 0;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
const FormControl = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 8px;
`;

const Label = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 8px;
`;
const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;
  outline: 0;

  &:hover {
    background-color: rgb(0, 0, 0, 0.2);
  }
`;

interface ButtonProps {
  size: string;
  color?: string;
}
export const Button = styled.button<ButtonProps>`
  padding: ${(props) => props.theme.buttons[props.size].padding};
  font-size: ${(props) => props.theme.buttons[props.size].fontsize};
  min-width: 75px;
  background-color: ${(props) =>
    props.theme.buttons.variant[props.color || "primary"]};
  cursor: pointer;
  outline: 0;
  font-weight: 500;
  color: white;
  border: 0;
  border-radius: 5px;
  z-index: 10;

  &:hover {
    background-color: rgb(0, 0, 0, 0.2);
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ButtonContainer = styled.div`
  & > button {
    margin-right: 10px;
  }
`;

const InputContainer = styled.div`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 2px solid black;
`;

interface Config {
  areas: string[];
  colorsFont: string[];
  colorsBackground: string[];
  numberColors: number;
  spinningTime: number;
  weights: string[];
}

const App: React.FC = () => {
  const [state, setState] = useState<Config>({
    areas: ["A", "B", "C", "D"],
    colorsBackground: ["green", "red", "blue", "yellow"],
    colorsFont: ["white", "black", "white", "black"],
    numberColors: 4,
    spinningTime: 5,
    weights: ["1", "1", "1", "3"],
  });

  const [expandedInfo, setExpanded] = useState<boolean[]>([true, false]);

  const handleChange = (index: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isExpanded: boolean
  ) => {
    let copy = [...expandedInfo];
    copy[index] = !copy[index];
    setExpanded(copy);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = state[event.target.name as keyof Config];
    if (typeof value === "object") {
      value[Number(event.target.dataset.index)] = event.target.value;
    } else if (typeof value === "number") {
      value = Number(event.target.value);
    }

    setState({ ...state, [event.target.name]: value });
  };

  const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (isNaN(value)) {
      value = 5;
    }
    setState({ ...state, spinningTime: value });
  };

  const addArea = () => {
    let areasCopy = [...state.areas];
    let weightsCopy = [...state.weights];
    areasCopy.push("New Option");
    weightsCopy.push("1");
    setState({ ...state, areas: areasCopy, weights: weightsCopy });
  };

  const removeArea = (area: number) => {
    let areasCopy = [...state.areas];
    let weightsCopy = [...state.weights];
    areasCopy.splice(area, 1);
    weightsCopy.splice(area, 1);
    setState({ ...state, areas: areasCopy, weights: weightsCopy });
  };

  const removeAreas = () => {
    setState({ ...state, areas: [], weights: [] });
  };

  const renderInputs = () => {
    return state.areas.map((value: string, index: number) => (
      <Col small={12} medium={6} key={index}>
        <InputBase>
          <AreaInput
            type="text"
            value={value}
            onChange={onChange}
            data-index={index}
            name="areas"
          />
          <LabelWeightInput>weight</LabelWeightInput>
          <NumberInput
            type="number"
            value={state.weights[index]}
            data-index={index}
            onChange={onChange}
            name="weights"
          />
          <CloseButton onClick={() => removeArea(index)}>X</CloseButton>
        </InputBase>
      </Col>
    ));
  };

  const renderColorFields = () => {
    return state.colorsBackground
      .slice(0, state.numberColors)
      .map((value: string, index: number) => (
        <Col small={6} medium={4} key={index}>
          <FormControl>
            <Label>{"Color " + (index + 1)}</Label>
            <InputBase>
              <AreaInput
                type="text"
                value={value}
                onChange={onChange}
                data-index={index}
                name="colorsBackground"
              />
            </InputBase>
          </FormControl>
        </Col>
      ));
  };
  const renderColorFontFields = () => {
    return state.colorsFont
      .slice(0, state.numberColors)
      .map((value: string, index: number) => (
        <Col small={6} medium={4} key={index}>
          <FormControl>
            <Label>{"Color " + (index + 1)}</Label>
            <InputBase>
              <AreaInput
                type="text"
                value={value}
                onChange={onChange}
                data-index={index}
                name="colorsFont"
              />
            </InputBase>
          </FormControl>
        </Col>
      ));
  };

  return (
    <Container>
      <Title>Create your wheel</Title>
      <Wheel
        areas={state.areas}
        spinningTime={state.spinningTime}
        numberOfColors={state.numberColors}
        colorsBackground={state.colorsBackground}
        colorsFont={state.colorsFont}
        weights={state.weights.map((element) => parseInt(element))}
      />
      <Accordion
        title="Add options"
        isExpanded={expandedInfo[0]}
        onChange={handleChange(0)}
      >
        {" "}
        <InputContainer>
          <Row spacing={5}>
            {renderInputs()}
            <Col small={6}>
              <ButtonContainer>
                <Button onClick={addArea} color="primary" size="medium">
                  Add
                </Button>
                <Button onClick={removeAreas} color="secondary" size="medium">
                  Clear
                </Button>
              </ButtonContainer>
            </Col>
          </Row>
        </InputContainer>
      </Accordion>
      <Accordion
        title="Customize wheel"
        isExpanded={expandedInfo[1]}
        onChange={handleChange(1)}
      >
        <InputContainer>
          <FormControl>
            <Label>Spinning time</Label>
            <InputBase>
              <AreaInput onChange={onTimeChange} value={state.spinningTime} />
            </InputBase>
          </FormControl>
          <FormControl>
            <Label>Number of colors</Label>
            <RadioLabel>
              <input
                type="radio"
                value="2"
                name="numberColors"
                onChange={onChange}
                checked={state.numberColors === 2}
              />{" "}
              2
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="3"
                name="numberColors"
                onChange={onChange}
                checked={state.numberColors === 3}
              />{" "}
              3
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="4"
                name="numberColors"
                onChange={onChange}
                checked={state.numberColors === 4}
              />{" "}
              4
            </RadioLabel>
          </FormControl>
          <h3>Background-Colors</h3>
          <Row spacing={2}>{renderColorFields()}</Row>
          <h3>Font-Colors</h3>
          <Row spacing={2}>{renderColorFontFields()}</Row>
        </InputContainer>
      </Accordion>
    </Container>
  );
};

export default App;
