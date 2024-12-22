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

  const fileKey = crypto.randomBytes(32).toString("hex")  // could also inclulde file type or object type in the future

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
  })

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  })

  return signedURL
}

export default getSignedURL
