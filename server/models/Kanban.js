const mongoose = require("mongoose");
const { Schema } = mongoose;

const attachmentSchema = Schema(
  {
    name: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

const commentSchema = Schema(
  {
    name: String,
    img: String,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const assignedToSchema = Schema(
  {
    title: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

const kanbanSchema = new Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    labels: {
      type: [String],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    description: String,
    dueDate: {
      type: Date,
    },
    attachments: [attachmentSchema],
    comments: [commentSchema],
    assignedTo: [assignedToSchema],
    coverImage: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kanban", kanbanSchema);
