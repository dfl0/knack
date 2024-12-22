"use server"

import crypto from "crypto"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import getCurrentSession from "@/app/actions/getcurrentsession"

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
  },
})

const getSignedURL = async () => {
  const session = await getCurrentSession()
  if (!session.user) return null

  // file key could also inclulde file type or object type in the future
  const generateFileKey = (bytes = 32) => {
    const array = new Uint8Array(bytes)
    crypto.getRandomValues(array)
    return [...array].map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: generateFileKey(),
  })

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  })

  return signedURL
}

export default getSignedURL
