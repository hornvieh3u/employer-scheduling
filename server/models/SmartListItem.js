const mongoose = require("mongoose");
const schema = mongoose.Schema;


const smartListItemSchema = new schema(
  {
    title: {
        type: String,
    },
    userId: {
      type: String,
      index: true,
    },
    listId: {
      type: String,
    },
    contactType: {
        type: Array,
        default: []
    },
    customInfo: {
        type: Array,
        default: []
    },
    afterCamp: {
        type: Array,
        default: []
    },
    membershipInfo: {
        type: Array,
        default: []
    },
    creteria: {
        type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("smartListItem", smartListItemSchema);
