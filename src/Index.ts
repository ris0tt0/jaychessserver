import { EventEmitter } from 'events';
import Logger from 'js-logger';
import { MOVE, RestApi } from './api';
import { DataBase } from './database';

class Main
{
    constructor(
        private gameemitter:EventEmitter,
    )
    {
        Logger.info('Main::constructor();');

        this.gameemitter.on(MOVE,this.onRestApiMove);
    }

    private onRestApiMove = (move:string) =>
    {
        Logger.info('Main::onRestApiMove ' + move);
    }
}

Logger.useDefaults();

const database = new DataBase('mongodb://localhost/chessgame');
const restapi = new RestApi();

const m = new Main( restapi);
