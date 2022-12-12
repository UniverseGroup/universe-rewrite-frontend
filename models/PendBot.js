import mongoose from "mongoose";

const PendBotSchema = new mongoose.Schema({
    botid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: false
    },
    deny: {
        type: Boolean,
        default: false
    },
    denyReason : {
        type: String,
        default: ""
    },
    pending: {

        type: Boolean,
        default: true
    },
    submitTime: {
        type: String,
        default: Date.now().toString()
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.models.PendBot || mongoose.model("PendBot", PendBotSchema);