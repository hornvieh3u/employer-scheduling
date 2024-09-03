const asyncHandler = require("express-async-handler");

const { MenuData } = require("../models/index/index");

// @desc Create a New Menu
// @route POST /{prefix}/nlm/menu
// @access Private
exports.createMenu = asyncHandler(async (req, res) => {
  const { id, isMainMenu, mainMenuId, title, icon, navLink } = req.body;
  const { user } = req;

  // Check if menu already exist
  const idExist = await MenuData?.findOne({ id });
  const titleExist = await MenuData?.findOne({ title });

  if (idExist) {
    res.status(400);
    throw new Error("Menu Item with this id already exist!");
  }
  if (titleExist) {
    res.status(400);
    throw new Error("Menu Item with this Title already exist!");
  }

  // Generate Menu Id
  const menuId = title.toLowerCase().replace(" ", "_");

  //   Create Menu Item
  const menu = await MenuData?.create({
    userId: user._id,
    id: menuId,
    isMainMenu,
    mainMenuId,
    title,
    icon,
    navLink,
  });

  if (menu) {
    res.status(200).json({
      _id: menu._id,
      userId: menu.userId,
      id: menu.id,
      isMainMenu: menu.isMainMenu,
      mainMenuId: menu.mainMenuId,
      title: menu.title,
      icon: menu.icon,
      navLink: menu.navLink,
    });
  } else {
    res.status(400);
    throw new Error("Invalid given data");
  }
});

// @desc Get Admins
// @route GET /{prefix}/nlm/admin
// @access Private
exports.getMenu = asyncHandler(async (req, res) => {
  try {
    const menuData = await MenuData.find();

    if (menuData) {
      return res.status(200).json(menuData);
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
