'use strict';

module.exports = function getSampleData (examples){

	var list = [	
		{
			text  : 'First Funny Video from Compilation:', 
			link  : 'player/' . examples[0].id,
			title : examples[0].title
		},
		{
			text  : 'Second Funny Video from Compilation:', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
		{
			text  : 'Third Funny Video from Compilation:', 
			link  : 'player/' . examples[2].id,
			title : examples[2].title
		},
		
	];


	return list;
};		