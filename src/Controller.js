import express from 'express';
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import Log from "./Log.js";
import UrlShortenerModule from "./modules/url-shortener/UrlShortenerModule.js";

const console = new Log("Controller");

class Controller {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());

        this.modules = [
            new UrlShortenerModule(),
        ];
    }

    setRoutes() {
        for (let module of this.modules) {
            module.setRoutes(this.app);
            console.log('Initialized ' + module.constructor.name);
        }
    }

    async start(port = 3000) {
        let server = http.createServer(this.app);

        this.setRoutes();

        server.listen(port, () =>
            console.log(`HTTP server listening on port ${port}!`)
        );
    }
}

export default new Controller();
