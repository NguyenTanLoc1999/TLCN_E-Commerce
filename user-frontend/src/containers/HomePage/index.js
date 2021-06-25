import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById, getProducts } from "../../actions";
import Rating from "../../components/UI/Rating";
import Price from "../../components/UI/Price";
import { Link } from "react-router-dom";
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MenuHeader from '../../components/MenuHeader'
import { generatePublicUrl } from "../../urlConfig";

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        {product.products.map((product) => (
          <Link
            to={`/${product.slug}/${product._id}/p`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "#000",
            }}
            className="productContainer"
          >
            <div className="productImgContainer" >
              <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
            </div>
            <div className="productInfo">
              <div style={{ margin: "10px 0" }}>{product.name}</div>
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
                  (3353)
                </span>
              </div>
              <Price value={product.price} />
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
};


export default HomePage