import { NextPage } from "next";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface props {
  f: number;
  b: number;
}

const CoinRes: NextPage<props> = ({ f, b }: props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  let myLineChart: Chart<"pie", number[], string>;

  const createBarChart = () => {
    if (canvasEl && canvasEl.current) {
      const ctx = canvasEl.current.getContext("2d");

      if (ctx) {
        myLineChart = new Chart(ctx, {
          type: "pie", //doughnut
          data: {
            labels: ["앞면", "뒷면"],
            datasets: [
              {
                label: "확률",
                data: [f, b],
                backgroundColor: ["#d3f9d8", "#dbe4ff"],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
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
            <th>앞면</th>
            <th>뒷면</th>
            <th>총합</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{f}</td>
            <td>{b}</td>
            <td>{f + b}</td>
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
  width: 500px;
  margin: 0;
`;

export const getServerSideProps = (context: any) => {
  return {
    props: {
      f: parseInt(context.query.f),
      b: parseInt(context.query.b),
    },
  };
};

export default CoinRes;
