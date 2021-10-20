import express from "express"
import { baseRouter, authRouter } from "./routers";



class Server{
    private app: express.Application;
    private routes: Array<baseRouter> =[];

    constructor () {
        this.app = express();
        this.configuration();
        this.routers();

    }

    public configuration(){
        this.app.use(express.json());
    }
    
    public routers(){    
        this.routes.push(new authRouter(this.app));
    }
    
    public start(){
        this.app.listen(3000, () => {
            console.log("Server running on port 3000")
        });
    }
}

const server = new Server();
server.start();
