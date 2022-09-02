import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { coinThrow, diceThrow } from "../../function/throw";
import { modeType } from "../../interface/mode";

interface tempDataType {
  img: string;
  name: string;
  number: 2 | 6;
}
interface tempType {
  coin: tempDataType;
  dice: tempDataType;
}

const temp: tempType = {
  coin: {
    img: "/coin.png",
    name: "동전을",
    number: 2,
  },
  dice: {
    img: "/dice.png",
    name: "주사위를",
    number: 6,
  },
};

interface props {
  mode: modeType;
}

const InputSection: NextPage<props> = ({ mode }: props) => {
  const [number, setNumber] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const router = useRouter();

  const send = () => {
    if (!number) {
      alert("횟수를 입력해주세요");
      return;
    } else if (number === "0") {
      alert("0번 던질 수 없습니다");
      return;
    }
    setClicked(true);

    setTimeout(() => {
      if (mode === "coin") {
        const statistics: number[] = coinThrow(parseInt(number));
        router.push(`/${mode}?f=${statistics[0]}&b=${statistics[1]}`);
      } else {
        const statistics = diceThrow(parseInt(number));
        router.push(
          `/${mode}?one=${statistics[0]}&two=${statistics[1]}&three=${statistics[2]}&four=${statistics[3]}&five=${statistics[4]}&six=${statistics[5]}`
        );
      }
    }, 100);
  };

  const numberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/, "").replace(/^0+/, "0");
    if (value[value.length - 1] !== "0" && value[0] === "0") {
      value = value.slice(1);
    }

    setNumber(value);
  };

  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      send();
    }
  };

  return (
    <CoinContainer>
      <Img img={temp[mode].img} />
      <Explanation>
        {clicked
          ? `${temp[mode].name} 던지고 있어요!`
          : `${temp[mode].name} 몇번 던지실건가요?`}
      </Explanation>
      <InputWrap>
        <NumberInput
          onChange={numberChange}
          onKeyPress={pressEnter}
          value={number}
        />
        <Send onClick={send}>던지기</Send>
      </InputWrap>
    </CoinContainer>
  );
};

const Send = styled.button`
  border: none;
  outline: none;
  background-color: #82c91e;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:active {
    transform: scale(0.98);
  }
`;

const InputWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const NumberInput = styled.input`
  width: 250px;
  font-size: 28px;
  text-align: center;
  outline: none;
  border: none;
  border-bottom: 2px solid #444;
  padding-bottom: 5px;
`;

const Explanation = styled.p`
  font-size: 28px;
`;

const Img = styled.div`
  width: 30vw;
  height: 30vw;
  background-image: url(${({ img }: { img: string }) => img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const CoinContainer = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default InputSection;
