require('dotenv').config()

import AWS from 'aws-sdk'
import { Types } from 'mongoose'

const rekognition = new AWS.Rekognition({region: process.env.AWS_REGION})
const collectionName = 'my-rekognition-collection'

async function listCollections(){
    return new Promise((resolve, reject) => {
        rekognition.listCollections((err, collections) => {
            if (err) {
                return reject(err)
            }
            return resolve(collections)
        })
    })
}

async function createCollection(collectionName) {
    return new Promise((resolve, reject) => {
        rekognition.createCollection({CollectionId: collectionName}, (err, data) => {
            if (err) {
                return reject(err)
            }

            return resolve(data)
        })
    })
}

async function initialise() {
    AWS.config.region = process.env.AWS_REGION
    const collections = await listCollections()
    const hasCollections = collections && collections.CollectionIds && collections.CollectionIds.length
    const collectionIds = hasCollections ? collections.CollectionIds:[]
    const hasCollection = collectionIds.find(c => c === collectionName)

    if (!hasCollection) {
        await createCollection(collectionName)
    }
}

async function addImageToCollection(bucket, pictureId, s3Filename) {
    return new Promise((resolve, reject) => {
        rekognition.indexFaces(
            {
                CollectionId: collectionName,
                ExternalImageId: pictureId,
                Image: {
                    S3Object: {
                        Bucket:  bucket,
                        Name: s3Filename
                    }
                }
            },
            err => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            }
        )
    })
}

export { initialise, addImageToCollection }

