import styled from "@emotion/styled";
import { NextPage } from "next";
import { MouseEvent } from "react";
import { modeType } from "../../interface/mode";

interface props {
  mode: modeType;
  changeMode: (e: modeType) => void;
}

const Head: NextPage<props> = ({ mode, changeMode }: props) => {
  const coinClick = () => changeMode("coin");
  const diceClick = () => changeMode("dice");

  return (
    <HeadContainer>
      <Mode onClick={coinClick} mode={mode} name="coin">
        동전 던지기
      </Mode>
      <Mode onClick={diceClick} mode={mode} name="dice">
        주사위 던지기
      </Mode>
    </HeadContainer>
  );
};

const HeadContainer = styled.header`
  width: 100vw;
  height: 70px;
  border-bottom: 2px #404040 solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Mode = styled.span`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  ${({ mode, name }: { mode: modeType; name: modeType }) =>
    mode === name && `color:#94d82d`}
`;

export default Head;
