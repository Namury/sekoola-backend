import express from "express"
import { authRouter, tingkatanRouter, kelasRouter, siswaRouter, guruRouter, mataPelajaranRouter } from "./routers";
class Server{
    private app: express.Application;
    private authRoute: authRouter;
    private tingkatanRoute: tingkatanRouter;
    private kelasRoute: kelasRouter;
    private siswaRoute: siswaRouter;
    private guruRoute: guruRouter;
    private mataPelajaranRoute: mataPelajaranRouter;

    constructor () {
        this.app = express();
        this.authRoute = new authRouter();
        this.tingkatanRoute = new tingkatanRouter();
        this.kelasRoute = new kelasRouter();
        this.siswaRoute = new siswaRouter();
        this.guruRoute = new guruRouter();
        this.mataPelajaranRoute = new mataPelajaranRouter();
        this.configuration();
        this.routers();
    }

    public configuration(){
        this.app.use(express.urlencoded({extended: true}));
    }
    
    public routers(){    
        this.app.use('/api/auth/', this.authRoute.router);
        this.app.use('/api/tingkatan/', this.tingkatanRoute.router);
        this.app.use('/api/kelas/', this.kelasRoute.router);
        this.app.use('/api/siswa/', this.siswaRoute.router);
        this.app.use('/api/guru/', this.guruRoute.router);
        this.app.use('/api/mapel/', this.mataPelajaranRoute.router);
    }
    
    public start(){
        this.app.listen(3000, () => {
            console.log("Server running on port 3000")
        });
    }
}

const server = new Server();
server.start();
