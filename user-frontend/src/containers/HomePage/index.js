import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions";
import Layout from "../../components/Layout";
import ProductList from "../../components/containers/HomePage/ProductList";

/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const products = product?.products ?? [];

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <ProductList products={products} />
    </Layout>
  );
};

export default HomePage;
