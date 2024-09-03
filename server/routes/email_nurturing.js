const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const { upload } = require("../lib/upload");
const { admin_category_list, addcategory, updateCategory, removeCategory } = require("../controllers/emailNurturingCategory")
const { add_template, remove_template, update_template, single_tem_update_status, all_email_list, swap_template, multipal_temp_remove } = require("../controllers/nurturingTemplate")
const { list_folders, create_folder, list_template, update_folder, delete_folder } = require("../controllers/emailNurturingFolder")
router.get("/Alltemplate/:adminId", isAuthenticated, all_email_list)

//template
router.post("/add_template/:adminId/:folderId", isAuthenticated, upload.array('attachments'), add_template) //add Templete
router.put("/update_template/:adminId/:templateId", isAuthenticated, upload.array('attachments'), update_template) //update Templete
router.delete("/remove_template/:adminId/:templateId", isAuthenticated, remove_template)
router.delete("/multipal_remove_template/:adminId/:folderId", isAuthenticated, multipal_temp_remove)


router.put("/swap_templete/:adminId/:templateId", isAuthenticated, swap_template)
router.put("/marks_as_star/:adminId/:tempId", isAuthenticated, single_tem_update_status) //single template status update



router.get("/category_list/:adminId", isAuthenticated, admin_category_list)
router.post("/addCategory/:adminId", isAuthenticated, addcategory)
router.put("/edit_category/:adminId/:categoryId", isAuthenticated, updateCategory)
router.delete("/remove_category/:adminId/:categoryId", isAuthenticated, removeCategory)



router.get("/list_all_folder/:adminId", isAuthenticated, list_folders)
router.get("/list_template/:adminId/:folderId", isAuthenticated, list_template)
router.post("/create_folder/:adminId/:catId", isAuthenticated, create_folder)
router.put("/update_folder/:adminId/:folderId", isAuthenticated, update_folder)
router.delete("/delete_folder/:adminId/:folderId", isAuthenticated, delete_folder)

module.exports = router;
