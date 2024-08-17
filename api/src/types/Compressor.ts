import Jimp from "jimp";
import path from "path";

export default class Compressor {
  src: string;
  albumPath: string;
  photoName: string;

  constructor(src: string, albumPath: string, photoName: string) {
    this.src = src;
    this.albumPath = albumPath;
    this.photoName = photoName;
  }

  async compress(height: number): Promise<void> {
    console.debug(`Compressing ${this.photoName} with height=${height}`);

    const lenna = await Jimp.read(this.src);
    const pendingWrite = lenna.quality(80);
    if (height) pendingWrite.resize(Jimp.AUTO, height);

    pendingWrite.write(
      path.join(this.albumPath, height.toString(), this.photoName)
    );

    console.debug(
      `Finished compressing ${this.photoName} with height=${height}`
    );
  }
}
