import { PutObjectCommandInput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { task } from '@prisma/client';
import { s3Client } from "./aws-sdk";

export const createBucket = async () => {
  console.log(s3Client.listBuckets({}));
    
  s3Client.createBucket({Bucket: "rt-todo"}, (err: any, data: any) => {
    if (err) {
      console.log("Error", err);
      } else {
      console.log("Success", data.Location);
      }
  })
}

export const uploadObject = async (fecha: string, datos: task[]) => {
    const params: PutObjectCommandInput = {
        Bucket: "rt-todo", // The name of the bucket. For example, 'sample_bucket_101'.
        Key: 'reporte-tareas-pendientes-' + fecha + '.txt', // The name of the object. For example, 'sample_upload.txt'.
        Body: JSON.stringify(datos, null, '\t'), // The content of the object. For example, 'Hello world!".
    };

    try {
      s3Client.putObject(params, (err: any, success: PutObjectCommandOutput | undefined) => {
        if (err) {
          console.log("Error", err);
          } else {
          console.log("Success upload ", success?.$metadata);
          }
      })
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );
      } catch (err) {
        console.log("Error", err);
      }
}