function getFormValues() {
	let equation = document.getElementById('equation').value;
	let a = Number(document.getElementById('a').value);
	let b = Number(document.getElementById('b').value);
	bisection(equation, a, b);
}

function bisection(equation, a, b) {
	let epsilon = 0.00001;
	let interaction = 0;
	let midpoint = 0;
	let results = [];

	while (b - a > epsilon && interaction < 51) {
		midpoint = (a + b) / 2;
		let y_m = solve(midpoint, equation);
		let y_a = solve(a, equation);
		let y_b = solve(b, equation);

		let result = {
			k: interaction,
			a: a,
			b: b,
			fa: y_a,
			fb: y_b,
			xk: midpoint,
			fxk: y_m,
		};
		results.push(result);

		if ((y_m > 0 && y_a < 0) || (y_m < 0 && y_a > 0)) {
			b = midpoint;
		} else {
			a = midpoint;
		}

		interaction++;
	}

	drawTable(results);
	return midpoint;
}

function solve(value, equation) {
	return math.eval(equation.replace(/[xy]+/g, value));
}

function drawTable(results) {
	let table = document.getElementById('result');
	table.innerHTML = '';
	let row;

	results.reverse();
	results.filter(function (result) {
		row = table.insertRow(0);
		row.insertCell(0).appendChild(document.createTextNode(result.k));
		row.insertCell(1).appendChild(document.createTextNode(result.a));
		row.insertCell(2).appendChild(document.createTextNode(result.b));
		row.insertCell(3).appendChild(document.createTextNode(result.fa));
		row.insertCell(4).appendChild(document.createTextNode(result.fb));
		row.insertCell(5).appendChild(document.createTextNode(result.xk));
		row.insertCell(6).appendChild(document.createTextNode(result.fxk));
	});
	row = table.insertRow(0);
	row.insertCell(0).appendChild(document.createTextNode('k'));
	row.insertCell(1).appendChild(document.createTextNode('a'));
	row.insertCell(2).appendChild(document.createTextNode('b'));
	row.insertCell(3).appendChild(document.createTextNode('f(a)'));
	row.insertCell(4).appendChild(document.createTextNode('f(b)'));
	row.insertCell(5).appendChild(document.createTextNode('xk'));
	row.insertCell(6).appendChild(document.createTextNode('f(xk)'));
}
