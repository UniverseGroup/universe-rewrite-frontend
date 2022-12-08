import mongoose from "mongoose";

const PendBotSchema = new mongoose.Schema({
    submitid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
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
    _id:false
},{ timestamps: true });

export default mongoose.models.PendBot || mongoose.model("PendBot", PendBotSchema);