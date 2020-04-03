import React from "react";

import "./table.css";

export default function Table({ headers, children, ...props }) {
  return (
    <table className="styledTable" {...props}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h + i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children.map((row, index) => (
          <tr key={"tableRow" + index}>
            {row.map((c, i) => (
              <td key={c + i}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
