import { getProcEnvNoFail } from "src/Support/Process";
import fs from 'fs';
import multer from "multer";

const uploadFolder = () => {
	const name = getProcEnvNoFail("UPLOAD_FOLDER_NAME");
	if (!fs.existsSync(name)) {
			fs.mkdirSync(name);
	}
	return name;
}

const storage = multer.diskStorage({
	destination: (_req, _file, callback) => {
			callback(null, uploadFolder());
	},
	filename: (_req, file, callback) => {
		let name = file.originalname.replace(/ /g, "_");

		function fileRename(name: string, path: string) {
			if (fs.existsSync(path)) {
				let nameSplit = name.split('.');
				let pathSplit = path.split('.');
				if (nameSplit.length >= 2) {
					nameSplit[nameSplit.length - 2] += '+';
				}
				if (pathSplit.length >= 2) {
					pathSplit[pathSplit.length - 2] += '+';
				}
				const nameFinal = nameSplit.join('.');
				const pathFinal = pathSplit.join('.');
				return fileRename(nameFinal, pathFinal);
			} else {
				return name
			}
		}
			const nameFinal = fileRename(name, uploadFolder() + '/' + name);
			callback(null, nameFinal);
	}
});

export default multer({ storage });
export { uploadFolder };