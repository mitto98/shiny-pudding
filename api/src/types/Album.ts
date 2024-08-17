import fs from "fs";
import path from "path";
import Photo from "./Photo";
import { validFileName } from "../utils";

export default class Album {
  albumPath: string;
  compressedAlbumPath: string;

  constructor(private mediaFolderPath: string, public name: string) {
    this.albumPath = path.join(mediaFolderPath, this.name);
    this.compressedAlbumPath = path.join(process.cwd(), "cache", this.name);
  }

  static getAlbums(mediaFolder: string): Album[] {
    const directoryPath = path.join(process.cwd(), mediaFolder);
    return fs
      .readdirSync(directoryPath, { withFileTypes: true })
      .filter((file) => file.isDirectory() && validFileName(file.name))
      .map((file) => new Album(directoryPath, file.name));
  }

  createCompressedTree() {
    console.debug(`Creating ${this.name} compressed tree folder`);
    fs.mkdirSync(this.compressedAlbumPath);
    fs.mkdirSync(path.join(this.compressedAlbumPath, "0"));
    fs.mkdirSync(path.join(this.compressedAlbumPath, "20"));
    fs.mkdirSync(path.join(this.compressedAlbumPath, "100"));
    fs.mkdirSync(path.join(this.compressedAlbumPath, "250"));
    fs.mkdirSync(path.join(this.compressedAlbumPath, "500"));
  }

  isCompressed(): boolean {
    return fs.existsSync(this.compressedAlbumPath);
  }

  async getPhotos(): Promise<Photo[]> {
    return fs
      .readdirSync(this.albumPath, { withFileTypes: true })
      .filter((file) => validFileName(file.name))
      .map((photo) => new Photo(this.albumPath, this.name, photo.name));
  }
}
