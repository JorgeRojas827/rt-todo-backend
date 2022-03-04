import {S3} from '@aws-sdk/client-s3';

const s3Client= new S3({region: 'us-east-1', credentials: {
    accessKeyId: process.env.ACCESSKEY!,
    secretAccessKey: process.env.SECRETKEY!
}});

export { s3Client };