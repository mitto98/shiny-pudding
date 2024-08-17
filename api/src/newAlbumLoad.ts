import Album from "./types/Album";

let isProcessing = false;

async function runAlbumsCompression(albums: Album[]): Promise<void> {
  for (const album of albums) {
    console.debug(`Album: ${album.name}`);
    if (!album.isCompressed()) album.createCompressedTree();

    const photos = await album.getPhotos();

    const processes = photos.map(async (photo) => {
      if (photo.isCompressed()) return;

      console.debug(
        `Image: ${photo.name} (compressed: ${photo.isCompressed()})`
      );

      await photo.compress();
    });

    await Promise.all(processes);
  }
}

function scanTimerCallback() {
  if (isProcessing) return;

  console.debug("Scanning for new albums");

  const { MEDIA_FOLDER_NAME } = process.env;
  const albums = Album.getAlbums(MEDIA_FOLDER_NAME || "");
  console.debug(`Found ${albums.length} albums`);

  //start promise
  if (albums.length) {
    isProcessing = true;
    runAlbumsCompression(albums).finally(() => {
      isProcessing = false;
      console.log();
    });
  }
}

export default function () {
  const { SCAN_INTERVAL } = process.env;
  const scanInterval: number = parseInt(SCAN_INTERVAL || "10000");
  setInterval(scanTimerCallback, scanInterval);
  scanTimerCallback();
}
