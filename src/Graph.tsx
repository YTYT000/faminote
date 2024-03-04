import { useEffect, useRef, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

const Graph = () => {
  const chartRef = useRef(null);

  // グラフの表示期間の設定
  const [graphPeriod, setGraphPeriod] = useState(30);

  // 今日から指定した期間の日付とランダムな体重データを生成
  const dates = Array.from({ length: graphPeriod }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }).reverse();

  const weights = Array.from({ length: graphPeriod }, () =>
    parseFloat((Math.random() * (30.0 - 28.0) + 28.0).toFixed(1))
  );

  useEffect(() => {
    let myChart: Chart | null = null;

    if (chartRef.current) {
      const config: ChartConfiguration = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "体重(kg)",
              data: weights,
              fill: false,
              borderColor: "#ffa065", // 線の色
              tension: 0.1,
            },
          ],
        },
        options: {
          animation: {
            duration: 0,
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: "#505050", // ラベルの色
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "#EFEAE6", // x軸のグリッド線
              },
              ticks: {
                color: "#505050", // x軸の目盛り
              },
            },
            y: {
              min: 10, // y軸の最小値
              max: 50, // y軸の最大値
              grid: {
                color: "#EFEAE6", // y軸のグリッド線
              },
              ticks: {
                color: "#505050", // y軸の目盛り
              },
            },
          },
        },
        plugins: [
          {
            id: "custom_canvas_background_color",
            beforeDraw: (chart) => {
              const ctx = chart.canvas.getContext("2d")!;
              ctx.save();
              ctx.globalCompositeOperation = "destination-over";
              ctx.fillStyle = "white";
              const yAxis = chart.scales["y"];
              const xAxis = chart.scales["x"];
              ctx.fillRect(
                xAxis.left,
                yAxis.top,
                xAxis.width,
                yAxis.bottom - yAxis.top
              );
              ctx.restore();
            },
          },
        ],
      };
      myChart = new Chart(chartRef.current, config);
    }
    // クリーンアップ関数を返す
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartRef, dates, weights]);

  return (
    <div className="graphPage page SpContentsMargin">
      <div className="graphPage__headingWrap page__headingWrap">
        <h2 className="graphPage__heading page__heading">体重グラフ</h2>
        <div className="graphPage__buttonWrap">
          <button
            className={`button graphPage__button ${
              graphPeriod === 30
                ? "graphPage__button--orange"
                : "graphPage__button--white"
            } graphPage__button--monthly`}
            onClick={() => setGraphPeriod(30)}
          >
            一か月ごと
          </button>
          <button
            className={`button graphPage__button ${
              graphPeriod === 7
                ? "graphPage__button--orange"
                : "graphPage__button--white"
            } graphPage__button--weekly`}
            onClick={() => setGraphPeriod(7)}
          >
            一週間ごと
          </button>
        </div>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graph;
