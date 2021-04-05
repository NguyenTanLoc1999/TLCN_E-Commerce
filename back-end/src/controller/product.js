const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");

exports.createProduct = (req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const { name, price, description, category,productPictures, quantity, createdBy } = req.body;
  //let productPictures = [];
  if(!productPictures) return res.status(400).json({msg: "No image upload"})
  // if (req.files.length > 0) {
  //   productPictures = req.files.map((file) => {
  //     return { img: file.filename };
  //   });
  // }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};


exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};