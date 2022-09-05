import { NextPage } from "next";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface props {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
}

const DiceRes: NextPage<props> = ({
  one,
  two,
  three,
  four,
  five,
  six,
}: props) => {
  const sum = one + two + three + four + five + six;
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  let myLineChart: Chart<"bar", number[], string>;

  const createBarChart = () => {
    if (canvasEl && canvasEl.current) {
      const ctx = canvasEl.current.getContext("2d");

      if (ctx) {
        myLineChart = new Chart(ctx, {
          type: "bar", //doughnut
          data: {
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [
              {
                label: "확률",
                data: [one, two, three, four, five, six],
                backgroundColor: [
                  "#ffa8a8",
                  "#d3f9d8",
                  "#ffdeeb",
                  "#c5f6fa",
                  "#fff3bf",
                  "#dbe4ff",
                ],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      }
    }
  };

  const reThorw = () => {
    router.push("/");
  };

  useEffect(() => {
    createBarChart();
    return () => {
      myLineChart.destroy();
    };
  }, []);

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>총합</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{one}</td>
            <td>{two}</td>
            <td>{three}</td>
            <td>{four}</td>
            <td>{five}</td>
            <td>{six}</td>
            <td>{sum}</td>
          </tr>
        </tbody>
      </Table>
      <Canvas>
        <canvas id="myChart" ref={canvasEl} />
      </Canvas>
      <ReThrow onClick={reThorw}>다시 던지러 가기</ReThrow>
    </Page>
  );
};

const Table = styled.table`
  border: 1px solid #202020;
  border-collapse: collapse;
  margin: 50px 0 30px 0;

  th,
  td {
    border: 1px solid #202020;
    padding: 5px 30px;
    font-size: 20px;
    text-align: center;
    white-space: nowrap;
  }
`;

const ReThrow = styled.button`
  margin-top: 50px;
  border: none;
  outline: none;
  background-color: #82c91e;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  color: white;
  border-radius: 5px;

  &:active {
    transform: scale(0.98);
  }
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Canvas = styled.div`
  position: relative;
  width: 900px;
`;

export const getServerSideProps = (context: any) => {
  return {
    props: {
      one: parseInt(context.query.one),
      two: parseInt(context.query.two),
      three: parseInt(context.query.three),
      four: parseInt(context.query.four),
      five: parseInt(context.query.five),
      six: parseInt(context.query.six),
    },
  };
};

export default DiceRes;
