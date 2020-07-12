import fs from 'fs';
import path from 'path';
import Album from "./types/Album";
import {validFileName} from "./utils/FileUtils";

export function getAlbumsList(mediaFolder: string): Album[] {
  const directoryPath = path.join(process.cwd(), mediaFolder);
  return fs.readdirSync(directoryPath, {withFileTypes: true})
    .filter(file => file.isDirectory() && validFileName(file.name))
    .map(file => new Album(directoryPath, file.name))
}
