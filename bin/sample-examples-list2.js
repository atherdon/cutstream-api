'use strict';

module.exports = function getSampleData (examples){

	var list = [	
		{
			text  : '1 Eastern Egg:', 
			link  : 'player/' . examples[0].id,
			title : examples[0].title
		},
		{
			text  : '2 Eastern Egg:', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
	];


	return list;
};		