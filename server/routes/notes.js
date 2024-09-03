const express = require("express");
const router = express.Router();
const { createNote, getNotesByUserId, updateNote, removeNote } = require("../controllers/notes");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post("/followup_note/add_note", results, isAuthenticated, createNote);
router.get("/followup_note/get_notes_by_user_id", results, isAuthenticated, getNotesByUserId);
router.put("/followup_note/update_note/:noteId", results, isAuthenticated, updateNote);
router.delete("/followup_note/remove_note/:noteId", results, isAuthenticated, removeNote);

module.exports = router;
