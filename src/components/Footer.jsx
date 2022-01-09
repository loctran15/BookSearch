import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        &copy; {new Date().getFullYear()} Copyright:{"  "}{" "}
        <a href="https://github.com/loctran15/"> Loc Tran</a>
      </p>
    </div>
  );
}
