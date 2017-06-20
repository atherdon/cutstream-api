'use strict';

module.exports = function getSampleData (examples){

	var list = [	
		{
			text  : 'Jaime sneezed and got', 
			link  : 'player/' . examples[0].id,
			title : examples[0].title
		},
		{
			text  : 'Jamie loses big pot', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
		{
			text  : 'AA - QQ - AK - Jamie really mad', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
		{
			text  : 'Previous hand Break Down', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
		{
			text  : '1/17 chanses to win - Call on the River', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
		{
			text  : 'Final table and famous Jamie face!', 
			link  : 'player/' . examples[1].id,
			title : examples[1].title
		},
	];


	return list;
};		