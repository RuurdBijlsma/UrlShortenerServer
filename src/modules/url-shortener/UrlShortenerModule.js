import ApiModule from "../../ApiModule.js";
import urls from '../../../res/url-shortener/shortened-urls.json' assert {type: "json"};


export default class UrlShortenerModule extends ApiModule {
    constructor() {
        super();
    }

    setRoutes(app) {
        app.get('/:urlId', async (req, res) => {
            const id = req.params.urlId;
            console.log("URL SHORTENER: URL ID =", id);
            if(urls.hasOwnProperty(id)) {
                const url = urls[id];
                res.writeHead(301, {
                    Location: url
                }).end();
            } else {
                res.status(404).send("Not found");
            }
        });
    }
}
