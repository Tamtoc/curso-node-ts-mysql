import express, { Application } from 'express';

import userRouter from '../routes/user';

import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();

        // Definir las rutas de la aplicación
        this.routes();
    }

    async dbConnection() {

        try {

            await db.authenticate();
            console.log('db online');
            
        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parceo del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static( 'public' ) );

    }

    routes() {

        this.app.use( this.apiPaths.users, userRouter );

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server runnig on port ' + this.port );
        });
    }

}

export default Server;