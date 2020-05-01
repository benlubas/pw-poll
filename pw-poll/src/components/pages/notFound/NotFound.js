import React, { useRef } from "react";

import "./notFound.css";

export default function NotFound() {
  const ref = useRef(null);
  return (
    <div className="nf-wrapper">
      <div ref={ref} className="nf-text">
        404: Page Not Found
      </div>
    </div>
  );
}
