import Jimp from "jimp";
import path from "path";

export async function resizeAndCompressImage(height: number, src: string, albumPath: string, photoName: string): Promise<void> {
    console.debug(`Compressing ${photoName} with height=${height}`);

    const lenna = await Jimp.read(src);
    const pendingWrite = lenna.quality(80);
    if (height)
        pendingWrite.resize(Jimp.AUTO, height)

    await pendingWrite.write(path.join(albumPath, height.toString(), photoName));
}
