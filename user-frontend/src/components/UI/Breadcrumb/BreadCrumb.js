import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./styles.css";

const Breadcrumb = (props) => {
  const { breadcrumbs } = props;

  if (!Array.isArray(breadcrumbs)) return null;

  return (
    <div className="breed">
      <ul>
        {breadcrumbs.map(({ id, label, href }, index) => (
          <li key={id}>
            <a href={index < breadcrumbs.length - 1 ? href : "#"}>{label}</a>
            {index < breadcrumbs.length - 1 && <IoIosArrowForward />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
