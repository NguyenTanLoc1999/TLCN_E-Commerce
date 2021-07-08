import React from "react";
import Rating from "../../../UI/Rating";
import Price from "../../../UI/Price";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../../../urlConfig";
import "./styles.css";

const ProductItem = (props) => {
  const { id, slug, img, name, price, rate } = props;

  return (
    <Link
      to={`/${slug}/${id}/p`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "#000",
      }}
      className="productItem"
    >
      <div className="productItem__image">
        <img src={generatePublicUrl(img)} alt="" />
      </div>
      <div className="productItem__info">
        <div className="productItem__name" style={{ margin: "10px 0" }}>
          {name}
        </div>
        <div>
          <Rating value="4.3" />
          &nbsp;&nbsp;
          <span
            style={{
              color: "#777",
              fontWeight: "500",
              fontSize: "12px",
            }}
          >
            {`(${rate})`}
          </span>
        </div>
        <Price value={price} />
      </div>
    </Link>
  );
};

export default ProductItem;
