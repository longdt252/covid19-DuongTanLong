import React, { useEffect, useState } from "react";
import summaryApi from "../../api/summaryApi";
import "./styles.css";
import NumberFormat from "react-number-format";

function SummaryList() {
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await summaryApi.getAll();
        setSummary(data.Global);
      } catch (error) {
        console.log("Failed:", error.message);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="summary">
      <div className="summary__totalConfirmed">
        <p className="summary__title">Người nhiễm toàn cầu</p>
        <p className="summary__new">
          Ca mới:{" "}
          <span>
            <NumberFormat
              value={summary.NewConfirmed}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </p>
        <p className="summary__total">
          Tổng ca:{" "}
          <span className="clr--blue">
            <NumberFormat
              value={summary.TotalConfirmed}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </p>
      </div>
      <div className="summary__totalRecovered">
        <p className="summary__title">Người đã chữa khỏi toàn cầu</p>
        <p className="summary__new">
          Ca mới:{" "}
          <span>
            <NumberFormat
              value={summary.NewRecovered}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </p>
        <p className="summary__total">
          Tổng ca:{" "}
          <span className="clr--green">
            {" "}
            <NumberFormat
              value={summary.TotalRecovered}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </p>
      </div>
      <div className="summary__totalDeaths">
        <p className="summary__title">Người mất toàn cầu</p>
        <p className="summary__new">
          Ca mới:{" "}
          <span>
            {" "}
            <NumberFormat
              value={summary.NewDeaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </p>
        <p className="summary__total">
          Tổng ca:{" "}
          <span className="clr--red">
            {" "}
            <NumberFormat
              value={summary.TotalDeaths}
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </p>
      </div>
    </div>
  );
}

export default SummaryList;
