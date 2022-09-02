import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "../components/head/head";
import { modeType } from "../interface/mode";
import InputSection from "../components/inputSection/inputSection";

const Home: NextPage = () => {
  const [mode, setMode] = useState<modeType>("coin");

  const changeMode = (newMode: modeType) => {
    setMode(newMode);
  };

  return (
    <MainPage>
      <Head mode={mode} changeMode={changeMode} />
      <InputSection mode={mode} />
    </MainPage>
  );
};

const MainPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default Home;
