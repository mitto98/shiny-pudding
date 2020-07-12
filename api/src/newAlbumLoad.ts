import Album from "./types/Album";
import {getAlbumsList} from "./albumUtils";

let isWorking = false;

async function runAlbumsCompression(albums: Album[]) {

    for (const album of albums) {

        if (!album.isCompressed()) {
            album.createCompressedTree();
        }

        for (const photo of await album.getUncompressedPhotos()) {

            if (photo.isCompressed())
                break;

            await photo.compress();
        }
    }
}

function scanTimerCallback() {

    if (isWorking) {
        return;
    }

    const {MEDIA_FOLDER_NAME} = process.env;
    const albums = getAlbumsList(MEDIA_FOLDER_NAME || '');

    //start promise
    if (albums.length) {
        isWorking = true;
        runAlbumsCompression(albums).then(() => {
            isWorking = false;
        });
    }
}

export default function () {
    const {SCAN_INTERVAL} = process.env;
    const scanInterval: number = parseInt(SCAN_INTERVAL || '10000');
    setInterval(scanTimerCallback, scanInterval);
}
