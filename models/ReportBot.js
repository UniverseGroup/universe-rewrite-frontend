import mongoose from "mongoose";

const ReportBotSchema = new mongoose.Schema({
    botid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now().toString(),
    },
});

export default mongoose.models.ReportBot || mongoose.model("ReportBot", ReportBotSchema);