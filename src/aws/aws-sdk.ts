import {S3} from '@aws-sdk/client-s3';

const s3Client= new S3({region: 'us-east-1', credentials: {
    accessKeyId: 'AKIA46CZA5EPN5SFTZEW',
    secretAccessKey: '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'
}});

export { s3Client };