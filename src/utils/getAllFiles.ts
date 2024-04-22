import fs from "fs";
import path from "path";

/**
 * 
 * @param directory direct path
 * @param foldersOnly 
 * @returns All files/folders names in directory
 */
function getAllFiles(directory: string, foldersOnly = false){
    let fileNames: string[] = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly && file.isDirectory()) {
            fileNames.push(filePath);
        }else if(file.isFile()){
            fileNames.push(filePath);
        }
    }

    return fileNames;
};

export default getAllFiles;