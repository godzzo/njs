'use strict'

function parse(data, headRow, typeRow) {
	const list = data.split(/\n/);

	if (!headRow) {
		headRow = list[0];
		list.shift();
	}

	if ( typeRow && typeof(typeRow) == "boolean" ) {
		typeRow = list[0];
		list.shift();
	}

	const head = headRow.split(/\t/);
	const types = (typeRow)? typeRow.split(/\t/): [];

	const recs = [];
	
	list.forEach( (element) => {
		const vals = element.split(/\t/);
		const rec = {};
	
		head.forEach(function(name, idx) {
			let value = vals[idx];
			const type = types[idx];

			if (type == "int") {
				value = parseInt(value);
			} else if (type == "float") {
				value = parseFloat(value);
			}

			rec[name] = value;
		});
		
		recs.push(rec);
	} );
	
	return recs;
}

module.exports = {
	parse
};
