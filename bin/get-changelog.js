const fs = require('fs');
const path = require('path');

(function () {
	const reduceChange = (res, el) => {
		res = res + `\n- ${el.section}: ${el.text.trim()}`;
		return res;
	};

	const getChangelog = (argArr) => {
		const arr = Array.isArray(argArr) ? argArr[0].split('\n') : [];
		const changeArray = arr
			.map((change) => {
				const matchArr = change.match(
					/^([a-z\-]+)\t([a-z0-9\-.]+)\(([a-z0-9\-.]+)\)\s?:([a-z0-9\-\.\s\S\[\]]+)$/i,
				);
				if (matchArr) {
					return {
						author: matchArr[1],
						section: matchArr[3],
						text: matchArr[4],
						type: matchArr[2],
					};
				}
			})
			.filter((el) => el && el.author !== 'CI');

		const bugs = changeArray.filter((el) => el && el.type === 'fix');
		const features = changeArray.filter((el) => el && el.type === 'feat');
		const otherChanges = changeArray.filter(
			(el) => el && !['fix', 'feat'].includes(el.type),
		);
		let resStr = '';
		if (bugs && bugs.length) {
			resStr = resStr + '\n#### Bug fixes:\n';
			resStr = resStr + bugs.reduce(reduceChange, '');
		}
		if (features && features.length) {
			resStr = resStr + '\n#### New Features:\n';
			resStr = resStr + features.reduce(reduceChange, '');
		}
		if (otherChanges && otherChanges.length) {
			resStr = resStr + '\n#### Other Changes:\n';
			resStr = resStr + otherChanges.reduce(reduceChange, '');
		}
		if (resStr) {
			resStr = '# Changelog:\n\n' + resStr + '\n';
		}
		return resStr;
	};

	const readTemplate = path.resolve(__dirname, '..', 'CHANGELOG_TEMPLATE.md');

	fs.readFile(readTemplate, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		const newContent = data.replace(
			'# Changelog:',
			getChangelog(process.argv.slice(2)),
		);

		const writeToFile = path.resolve(
			__dirname,
			'..',
			'changelogs',
			'CHANGELOG.md',
		);
		fs.writeFile(writeToFile, newContent, (err) => {
			if (err) {
				console.error(err);
			}
		});
		const historyFile = path.resolve(
			__dirname,
			'..',
			'changelogs',
			`CHANGELOG-${new Date()
				.toLocaleDateString('en-EN', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
				})
				.replace(/\//g, '.')}.md`,
		);
		fs.writeFile(historyFile, newContent, (err) => {
			if (err) {
				console.error(err);
			}
		});
	});
})();
