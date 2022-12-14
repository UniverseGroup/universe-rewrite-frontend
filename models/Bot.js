import mongoose from 'mongoose'

const BotSchema = new mongoose.Schema({
    botid: {
        type: String,
        required: true,
        unique: true
    },
    botdescription:{
        type: String,
        required: true,
    },
    owners: {
        type: Array,
        required: true,
    },
    banned:{
      type: Boolean,
      default: false
    },
    bannedreason:{
      type: String,
      default: ""
    },
    library:{
      type: String,
      required: true
    },
    name:{
        type: String,
        required: true,
    },
    prefix:{
        type: String,
        required: true,
    },
    token:{
        type: String,
        default: ""
    },
    trusted: {
        type: Boolean,
        default: false
    },
    guilds:{
        type:Number,
        default: 0
    },
    discordVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "online"
    },
    invite: {
        type: String,
        required: true
    },
    hearts: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true
    },
    premium: {
        type: Boolean,
        default: false
    },
    category: {
        type: Array,
        required: true
    },
    website: {
        type: String,
        default: ""
    },
    support: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        default: ""
    },
    banner:{
        type: String,
        default: null
    },
    badges:{
        type: Array,
        default: []
    },
    users:{
        type: Number,
        default: 0
    },
    locked:{
        type:Boolean,
        default: false
    },
    approved:{
        type:Boolean,
        default: false
    },

},)

export default mongoose.models.Bot || mongoose.model('Bot', BotSchema)