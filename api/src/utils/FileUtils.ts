import junk from "junk";

export function validFileName(fileName: string): boolean {
    return junk.not(fileName) && /^[^.].*/.test(fileName);
}
