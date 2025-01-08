"use server"

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

import getCurrentSession from "@/app/actions/getcurrentsession"

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
  },
})

const deleteObjectWithKey = async (objectKey) => {
  const session = await getCurrentSession()
  if (!session.user) return false

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: objectKey,
  })

  await s3.send(deleteObjectCommand)

  return true
}

export default deleteObjectWithKey
