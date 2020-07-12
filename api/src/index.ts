import express, {NextFunction, Request, Response} from 'express';
import * as albumController from './controllers/albumController';

import startAlbumLoader from './newAlbumLoad';

require('dotenv').config();

const app = express();


//Cors filter
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/album', albumController.getAlbums);
app.get('/album/:album', albumController.getAlbum);
app.get('/album/:album/image/:size?/:image', albumController.getAlbumImage);

app.listen(process.env.PORT, function () {
    console.debug(`App listening on port ${process.env.PORT}!`);
    startAlbumLoader();
});