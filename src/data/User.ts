import { Document, model, Model, Schema } from 'mongoose';

export interface User
{
    currentGameId:string;
    hexcolor:string;
}

export interface UserModel extends User, Document
{

}

export const UserSchema:Schema = new Schema(
    {
        currentGameId:String,
        hexcolor:String,
    },
    {
        toJSON:
        {
            transform:(doc: any, ret: any, options: any) =>
            {
                // no id sent to client.
                delete ret._id;
                return ret;
            },
        },
    },
);

export const UserModelObject:Model<UserModel> = model<UserModel>('User', UserSchema);
