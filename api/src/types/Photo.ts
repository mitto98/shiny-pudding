import path from "path";
// import gm from "gm";
import {promisify} from "util";
import * as fs from "fs";
import {resizeAndCompressImage} from "../utils/imageCompressionUtils";

const sizeOf = promisify(require('image-size'));

export default class Photo {
  imagePath: string;
  compressedAlbumPath: string;
  aspectRatio?: number;

  constructor(private albumPath: string,
              public album: string,
              public name: string) {
    this.imagePath = path.join(albumPath, name);
    this.compressedAlbumPath = path.join(process.cwd(), 'cache', album);
  }

  isCompressed(): boolean {
    return fs.existsSync(path.join(this.compressedAlbumPath, '0', this.name));
  }

  async compress(): Promise<any> {
    if (this.isCompressed())
      return;

    console.debug(`Compressing ${this.name}`);
    return await Promise.all([
      resizeAndCompressImage(0, this.imagePath, this.compressedAlbumPath, this.name).then(() => console.debug(`Finished compressing ${this.name} with height=${0}`)),
      resizeAndCompressImage(20, this.imagePath, this.compressedAlbumPath, this.name).then(() => console.debug(`Finished compressing ${this.name} with height=${20}`)),
      resizeAndCompressImage(100, this.imagePath, this.compressedAlbumPath, this.name).then(() => console.debug(`Finished compressing ${this.name} with height=${100}`)),
      resizeAndCompressImage(250, this.imagePath, this.compressedAlbumPath, this.name).then(() => console.debug(`Finished compressing ${this.name} with height=${250}`)),
      resizeAndCompressImage(500, this.imagePath, this.compressedAlbumPath, this.name).then(() => console.debug(`Finished compressing ${this.name} with height=${500}`)),
    ])
  }

  getSizePath(size: string):string {
    if (!size)
      return this.imagePath
    else if (size == "slim")
      return path.join(this.compressedAlbumPath, '0', this.name)
    return path.join(this.compressedAlbumPath, size, this.name);
  }

  async loadImageProperties() {
    const dimension = await sizeOf(this.imagePath);
    this.aspectRatio = dimension.width/dimension.height
    console.debug(this.name, dimension.width, dimension.height, this.aspectRatio);
    // .then(dimensions => { console.debug(dimensions.width, dimensions.height); })
    // .catch(err => console.error(err));
  }
}
