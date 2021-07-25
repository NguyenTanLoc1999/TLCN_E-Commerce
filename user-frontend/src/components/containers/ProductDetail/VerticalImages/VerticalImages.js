import React from "react";
import { generatePublicUrl } from "../../../../urlConfig";
import "./styles.css";

const VerticalImages = (props) => {
  const { images, selectedImage, handleSelectImage } = props;

  return (
    <div className="verticalImageStack">
      {images.map((thumb) => (
        <div
          key={thumb._id}
          className={`thumbnail ${
            thumb._id === selectedImage?._id ? "current" : ""
          }`} //? operator 3 ngôi.
          onClick={() => handleSelectImage(thumb._id)}
        >
          <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
        </div>
      ))}
    </div>
  );
};

export default VerticalImages;
