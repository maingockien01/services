import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
readdirSync(__dirname, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name)
	.filter((subdirectory) => subdirectory !== 'node_modules')
	.map((subdirectory) => {
		const graphqlDirectoryPath = join(__dirname, subdirectory);
		const commonDirectoryPath = join(__dirname, 'common');
		const outputFilePath = join(process.cwd(), '../shared/dtos', `${subdirectory}.ts`);

		try {
			unlinkSync(outputFilePath);
		} catch (error) {
			console.log(`File ${outputFilePath} does not exist`);
		}

		definitionsFactory.generate({
			typePaths: [`${graphqlDirectoryPath}/**/*.graphql`, `${commonDirectoryPath}/**/*.graphql`],
			path: outputFilePath,
			outputAs: 'interface',
			emitTypenameField: true,
		});
	});
