import fs from "fs";
import path from "path";
import Photo from "./Photo";
import junk from "junk";
import {validFileName} from "../utils/FileUtils";

export default class Album {
  albumPath: string;
  compressedAlbumPath: string;

  constructor(private mediaFolderPath: string, public name: string) {
    this.albumPath = path.join(mediaFolderPath, this.name);
    this.compressedAlbumPath = path.join(process.cwd(), 'cache', this.name);
  }

  createCompressedTree() {
    console.debug(`Creating ${this.name} compressed tree folder`)
    fs.mkdirSync(this.compressedAlbumPath);
    fs.mkdirSync(path.join(this.compressedAlbumPath, '0'));
    fs.mkdirSync(path.join(this.compressedAlbumPath, '20'));
    fs.mkdirSync(path.join(this.compressedAlbumPath, '100'));
    fs.mkdirSync(path.join(this.compressedAlbumPath, '250'));
    fs.mkdirSync(path.join(this.compressedAlbumPath, '500'));
  }

  isCompressed(): boolean {
    return fs.existsSync(this.compressedAlbumPath);
  }

  async getPhotos(): Promise<Photo[]> {
    return fs.readdirSync(this.albumPath, {withFileTypes: true})
      .filter(file => validFileName(file.name))
      .map(photo => new Photo(this.albumPath, this.name, photo.name));
  }

  async getUncompressedPhotos(): Promise<Photo[]> {
    return fs.readdirSync(this.albumPath, {withFileTypes: true})
        .filter(file => validFileName(file.name))
        .map(photo => new Photo(this.albumPath, this.name, photo.name))
  }
}
