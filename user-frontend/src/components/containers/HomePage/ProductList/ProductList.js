import React from "react";
import Container from "../../../Container";
import ProductItem from "../ProductItem";
import randomNumber from "../../../../utils/randomNumber";
import "./styles.css";

const ProductList = (props) => {
  const { products } = props;

  return (
    <Container>
      <div className="gridContainer">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            slug={product.slug}
            img={product.productPictures[0]?.img ?? ""}
            name={product.name}
            price={product.price}
            rate={randomNumber(1000, 10000)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
