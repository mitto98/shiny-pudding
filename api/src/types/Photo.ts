import path from "path";
import { promisify } from "util";
import * as fs from "fs";
import Compressor from "./Compressor";

const SIZES = [0, 20, 100, 250, 500];

const sizeOf = promisify(require("image-size"));

export default class Photo {
  imagePath: string;
  compressedAlbumPath: string;
  aspectRatio?: number;

  constructor(
    private albumPath: string,
    public album: string,
    public name: string
  ) {
    this.imagePath = path.join(albumPath, name);
    this.compressedAlbumPath = path.join(process.cwd(), "cache", album);
  }

  isCompressed(): boolean {
    return fs.existsSync(path.join(this.compressedAlbumPath, "0", this.name));
  }

  async compress(): Promise<any> {
    if (this.isCompressed()) return;

    console.debug(`Compressing ${this.name}`);

    const compressor = new Compressor(
      this.imagePath,
      this.compressedAlbumPath,
      this.name
    );

    const processes = SIZES.map((s) => compressor.compress(s));

    await Promise.all(processes);
  }

  getSizePath(size: string): string {
    if (!size) return this.imagePath;
    else if (size == "slim")
      return path.join(this.compressedAlbumPath, "0", this.name);
    return path.join(this.compressedAlbumPath, size, this.name);
  }

  async loadImageProperties() {
    const dimension = await sizeOf(this.imagePath);
    this.aspectRatio = dimension.width / dimension.height;
    console.debug(
      this.name,
      dimension.width,
      dimension.height,
      this.aspectRatio
    );
    // .then(dimensions => { console.debug(dimensions.width, dimensions.height); })
    // .catch(err => console.error(err));
  }
}
