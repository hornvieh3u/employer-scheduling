const { Product, Shop } = require("../models/index/index");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  const productDetails = req.body;
  const shopId = req.params.shopId;
  const userId = req.user._id;
  try {
    productDetails.userId = userId;
    const productObj = new Product(productDetails);
    await productObj.save(async (err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      } else if (data) {
        let result = await Shop.updateOne(
          {
            _id: mongoose.Types.ObjectId(shopId),
            userId: mongoose.Types.ObjectId(userId),
            shopCategory: "product",
          },
          { $push: { products: data._id } }
        );
        if (result.modifiedCount > 0) {
          return res.send({
            msg: "product created successfully",
            success: true,
          });
        } else {
          return res.send({ msg: "product not created", success: false });
        }
      }
    });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.productInfo = (req, res) => {
  const productId = req.params.productId;
  try {
    Product.find({ _id: mongoose.Types.ObjectId(productId), isDeleted: false }).exec(
      (err, data) => {
        if (err) {
          res.send({ msg: "product  not found", success: false });
        } else {
          res.send({ data, success: true });
        }
      }
    );
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.productUpdate = async (req, res) => {
  const productData = req.body;
  const productId = req.params.productId;
  try {
    Product.updateOne({ _id: productId }, { $set: productData }).exec(async (err, data) => {
      if (err) {
        res.send({
          msg: err,
          success: false,
        });
      } else {
        if (data.modifiedCount > 0) {
          return res.send({
            msg: "product updated succesfully",
            success: false,
          });
        }
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.Id;
  try {
    let delete_product = await Product.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    if (delete_product.modifiedCount > 0) {
      return res.send({ msg: "product deleted successfully", success: true });
    } else {
      return res.send({ msg: "product not deleted", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
