const Category = require('../models/category');
const slugify = require('slugify');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.addCategory = (req, res) => {
  console.log(req.body.name);
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name)
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  })
}

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
}

exports.updateCategories = async (req, res) => {
  const test = req.body;
  const updatedCategories = [];
  if (Array.isArray(test)) {
    for (let i = 0; i < test.length; i++) {
      const category = {
        name: test[i].name,
        type: test[i].type,
      };
      if (test[i].parentId !== "") {
        category.parentId = test[i].parentId;
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: test[i]._id },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories });
  }
  // else {
  //   const category = {
  //     name,
  //     type,
  //   };
  //   if (parentId !== "") {
  //     category.parentId = parentId;
  //   }
  //   const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
  //     new: true,
  //   });
  //   return res.status(201).json({ updatedCategory });
  // }
};
