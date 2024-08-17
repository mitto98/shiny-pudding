import { Request, Response } from "express";
import path from "path";
import Album from "../types/Album";
import Photo from "../types/Photo";

export async function getAlbums(req: Request, res: Response) {
  const albums = Album.getAlbums(process.env.MEDIA_FOLDER_NAME || "");
  const albumResponse = [];

  for (const album of albums) {
    albumResponse.push({
      name: album.name,
      cover: (await album.getPhotos())[0].name,
    });
  }

  res.send(albumResponse);
}

export async function getAlbum(req: Request, res: Response) {
  const { MEDIA_FOLDER_NAME } = process.env;
  const albumPath = path.join(process.cwd(), MEDIA_FOLDER_NAME || "");
  const album = new Album(albumPath, req.params.album);
  console.debug(`[Pudding] Requested album ${album.name}`);
  const photos = await album.getPhotos();

  // console.debug("Photos: ",photos);

  for (const photo of photos) {
    await photo.loadImageProperties();
  }

  try {
    res.send({
      name: album.name,
      images: photos.map((p) => ({
        album: p.album,
        name: p.name,
        aspectRatio: p.aspectRatio,
      })),
    });
  } catch (e) {
    res.status(404).send(e);
  }
}

// /image/:name originale non compressa
// /image/slim/:name originale compressa
// /image/:size/:name originale compressa grossa :size

export async function getAlbumImage(req: Request, res: Response) {
  const { album, image, size } = req.params;
  const { MEDIA_FOLDER_NAME } = process.env;
  console.debug(`Requested photo ${album}/${size}/${image}`);
  const pic = new Photo(
    path.join(process.cwd(), MEDIA_FOLDER_NAME || "", album),
    album,
    image
  );
  try {
    res.sendFile(pic.getSizePath(size));
  } catch (e) {
    res.status(404).send(e);
  }
}

export default { getAlbums, getAlbum, getAlbumImage };
