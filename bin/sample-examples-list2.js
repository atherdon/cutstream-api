'use strict';

module.exports = function getSampleData (examples){
// console.log(examples);
	var list = [	
		{
			text  : 'Jaime sneezed and got', 
			link  : 'player/' + examples[0].id,
			title : examples[0].title
		},
		{
			text  : 'Jamie loses big pot', 
			link  : 'player/' + examples[1].id,
			title : examples[1].title
		},
		{
			text  : 'AA - QQ - AK - Jamie really mad', 
			link  : 'player/' + examples[2].id,
			title : examples[2].title
		},
		{
			text  : 'Previous hand Break Down', 
			link  : 'player/' + examples[3].id,
			title : examples[3].title
		},
		{
			text  : '1/17 chanses to win - Call on the River', 
			link  : 'player/' + examples[4].id,
			title : examples[4].title
		},
		{
			text  : 'Final table and famous Jamie face!', 
			link  : 'player/' + examples[5].id,
			title : examples[5].title
		},
	];


	return list;
};		