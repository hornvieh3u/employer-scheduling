const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const productController = require("../controllers/product");

// product routes
router.post("/product/add_product/:shopId", results, isAuthenticated, productController.create);
router.get(
  "/product/info_product/:productId",
  results,
  isAuthenticated,
  productController.productInfo
);
router.put(
  "/product/update_by_Id/:productId",
  results,
  isAuthenticated,
  productController.productUpdate
);
router.delete("/product/delete_product/:Id", isAuthenticated, results, productController.remove);
module.exports = router;
