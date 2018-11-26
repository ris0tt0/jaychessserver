import Logger from 'js-logger';
import mongoose from 'mongoose';
import { ChessGameModelObject } from './data/ChessGame';

export class DataBase
{
    constructor(
        public url:string)
    {
        Logger.info('DataBase::constructor() url:' + this.url);
        mongoose.connect( this.url);
        const db = mongoose.connection;
        // db.on('error', )
        db.once('open', () =>
        {
            Logger.info('DataBase open:' + this.url);
            const game = new ChessGameModelObject();
        });
    }
}
