import { createServerFn } from '@tanstack/react-start'

import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";
import { Resource } from 'sst';
import { z } from 'zod';
import { formatText, formatTextSchema } from './format';


const shareData = z.object({
    text: z.string().min(1),
})
export const createShare = createServerFn()
    .inputValidator(shareData)
    .handler(async ({ data }) => { 
        const formattedText = await formatText({ data: { text: data.text } })
        const client = new DynamoDBClient({});
        const shareId = nanoid();
        await client.send(
            new PutItemCommand({
              TableName: Resource.ShareTable.name,
              Item: {
                shareId: { S: shareId },
                rawData: { S: data.text },
                formattedData: { S: JSON.stringify(formattedText) },
              },
            })
          );
        return shareId;
    })

export const getShare = createServerFn()
    .inputValidator(z.object({
        shareId: z.string().min(1),
    }))
    .handler(async ({ data }) => {
        const client = new DynamoDBClient({});
        const result = await client.send(new GetItemCommand({
            TableName: Resource.ShareTable.name,
            Key: { shareId: { S: data.shareId } },
        }));
        if (!result.Item) return null;
        return {
            shareId: result.Item.shareId.S!,
            rawData: result.Item.rawData.S!,
            formattedData: formatTextSchema.parse(JSON.parse(result.Item.formattedData.S!)),
        };
    })