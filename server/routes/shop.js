const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const shop = require("../controllers/shop");

router.post("/createShop", isAuthenticated, results, shop.createShop);
router.get("/list_of_all_shop", isAuthenticated, results, shop.shopByUser);
router.get("/shop_by_id/:Id", isAuthenticated, results, shop.getShopById);
router.put("/shop_update_by_id/:Id", isAuthenticated, results, shop.update);
router.delete("/shop_delete_by_id/:Id", isAuthenticated, results, shop.delete);

module.exports = router;
