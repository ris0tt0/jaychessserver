import { Document, model, Model, Schema } from 'mongoose';

export interface ChessGameMove
{
    light:string;
    dark:string;
}

export interface ChessGameMoveModel extends ChessGameMove, Document
{

}

export interface ChessGameModel extends ChessGame, Document
{

}

export interface ChessGame
{
    darkPlayerId:string;
    lightPlayerId:string;
    isGameComplete:boolean;
    isDarkTurn:boolean;
    moves:ChessGameMove[];
}

export const ChessGameSchema:Schema = new Schema(
    {
        darkPlayerId:String,
        isDarkTurn:Boolean,
        isGameComplete:Boolean,
        lightPlayerId:String,
        moves:Array,
    },
);

export const ChessGameModelObject:Model<ChessGameModel> = model<ChessGameModel>('ChessGame', ChessGameSchema);
