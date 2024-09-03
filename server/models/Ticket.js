const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ticketName: {
      type: String,
      required: true,
    },
    reqName: {
      type: String,
      required: true,
    },
    reqEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    cc: [
      {
        type: String,
        required: false,
      },
    ],
    messages: [
      {
        type: new mongoose.Schema(
          {
            sender: {
              type: String, // This is Enum type : { 'agent_msg', 'requester_msg' }
              required: true,
            },
            msg: {
              type: String,
              required: false,
            },
            newTicketStatus: {
              type: String,
              required: false,
            },
            attachments: [
              {
                type: new mongoose.Schema({
                  fileName: {
                    type: String,
                    required: true,
                  },
                  size: {
                    type: String,
                    required: false,
                  },
                }),
              },
            ],
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ticket", TicketSchema);
