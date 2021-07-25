import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosStar, IoMdCart } from "react-icons/io";
import { BiMoney } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import { addToCart } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import formatPrice from "../../utils/formatPrice";
import useSelectImage from "./hooks/useSelectImage";
import Breadcrumb from "../../components/UI/Breadcrumb";
import Container from "../../components/Container";
import VerticalImages from "../../components/containers/ProductDetail/VerticalImages/VerticalImages";
import "./style.css";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { selected, handleSelectImage } = useSelectImage({
    images: product?.productDetails?.productPictures ?? [],
  });

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  const breadcrumbs = [
    {
      id: "home",
      label: "Home",
      href: "#",
    },
    {
      id: "men",
      label: "Men",
      href: "#",
    },
    {
      id: "casual-shirts",
      label: "Casual Shirts",
      href: "#",
    },
    {
      id: "product-name",
      label: product.productDetails?.name ?? "",
      href: "#",
    },
  ];

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <Container>
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <VerticalImages
              images={product.productDetails.productPictures}
              selectedImage={selected}
              handleSelectImage={handleSelectImage}
            />
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(selected?.img ?? "")} //return img when selected null or undefined
                  alt="thumb"
                />
              </div>

              {/* action buttons */}
              <div className="flexRow">
                <MaterialButton
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<IoMdCart />}
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/cart`);
                  }}
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div className="rightSide">
            {/* home > category > subCategory > productName */}
            <Breadcrumb breadcrumbs={breadcrumbs} />
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="extraOffer">
                <span>Extra</span>
                <BiMoney />
                4500 off
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  <span>{formatPrice(product.productDetails.price)}</span>
                </span>
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                <p className="productDescription">
                  <span className="productDescription__title">Description</span>
                  <span className="productDescription__content">
                    {product.productDetails.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ProductDetailsPage;
