import { readFileSync, readdirSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default (folderPath: string = __dirname) => {
	const files = readdirSync(folderPath);
	const yamlFiles = files.filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'));
	const configs = yamlFiles.map((file) => {
		const filePath = join(folderPath, file);
		return yaml.load(readFileSync(filePath, 'utf8')) as Record<string, any>;
	});
	return Object.assign({}, ...configs);
};
