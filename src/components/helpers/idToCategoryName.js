const idToCategoryName = (id) => {
	const map = {
		'1': 'Agriculture, environment, fisheries',
		'2': 'Arts, culture and entertainment',
		'3': 'Business, industry and trade',
		'4': 'Economics and finance',
		'5': 'Education, language and training',
		'6': 'Employment and labour',
		'7': 'Government, Parliament and politics',
		'8': 'Health and safety',
		'9': 'Indigenous affairs',
		'10': 'Information and communications',
		'11': 'International affairs and defence',
		'12': 'Law, justice and rights',
		'13': 'Science and technology',
		'14': 'Social affairs and population'
	};
	return map[id];
};

export default idToCategoryName;
