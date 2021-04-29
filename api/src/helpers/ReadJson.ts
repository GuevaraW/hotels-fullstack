import fs, { PathLike } from 'fs';

const readJson = (jsonPath: PathLike) => {
	return fs.readFileSync(jsonPath, 'utf8');
};

export default readJson;
