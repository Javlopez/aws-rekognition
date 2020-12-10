import { model, Schema, connect } from 'mongoose'

const connectToDatabase = async () => await connect(
    process.env.DB_CONNECTION_STRING || '',
    {
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true
    }
)

const PictureSchema = new Schema({
    filename: String,
    mimeType: String,
    bucket: String,
    contentType: String,
    location: String,
    etag: String
})

const PictureModel = new model("Picture", PictureSchema)

export { connectToDatabase, PictureModel }
