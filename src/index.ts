import express from "express"
import { authRouter } from "./routers";

class Server{
    private app: express.Application;
    private authRoute: authRouter;

    constructor () {
        this.app = express();
        this.authRoute = new authRouter();
        this.configuration();
        this.routers();
    }

    public configuration(){
        this.app.use(express.json());
    }
    
    public routers(){    
        this.app.use('/api/user/', this.authRoute.router);
    }
    
    public start(){
        this.app.listen(3000, () => {
            console.log("Server running on port 3000")
        });
    }
}

const server = new Server();
server.start();
