import React from "react";
import styled from "styled-components";
import { BsChevronUp } from "react-icons/bs";

type AccordionProps = {
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isExpanded: boolean
  ) => void;
  title: string;
  isExpanded: boolean;
};

type IconProps = {
  $isExpanded: boolean;
};

const ExpandIcon = styled(BsChevronUp)<IconProps>`
  font-size: 40px;
  transform: rotate(${(props) => (props.$isExpanded ? "180" : "0")}deg);
  transition: transform 200ms;
`;

const SummaryTitle = styled.div`
  flex-grow: 1;
`;
const SummaryRoot = styled.button`
  display: flex;
  align-items: center;
  padding: 30px 30px;
  cursor: pointer;
  width: 100%;
  color: white;
  position: relative;
  font-size: 20px;
  background: #1569a8;
  margin-bottom: -1px;
  border-bottom: 1px solid #0e4671;
  text-align: left;
  outline: 0;
  border: 0;
`;

type ContentProps = {
  expanded: boolean;
};
const Content = styled.div<ContentProps>`
  max-height: ${(props) => (props.expanded ? "1000px" : 0)};
  overflow: hidden;
  transition: max-height 0.3s;
`;

const Accordion: React.FC<AccordionProps> = ({
  onChange,
  children,
  title,
  isExpanded,
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onChange) {
      onChange(event, !isExpanded);
    }
  };

  return (
    <>
      <SummaryRoot onClick={handleChange}>
        <SummaryTitle>{title}</SummaryTitle>
        <ExpandIcon $isExpanded={isExpanded}></ExpandIcon>
      </SummaryRoot>
      <Content expanded={isExpanded}>{children}</Content>
    </>
  );
};

export default Accordion;
