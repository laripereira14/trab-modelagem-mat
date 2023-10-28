function getFormValues() {
	let equation = document.getElementById('equation').value;
	let a = Number(document.getElementById('a').value);
	newtonRaphson(equation, a);
}

function newtonRaphson(equation, a) {
	let epsilon = 0.00001;
	let interaction = 0;
	let derivative = math.derivative(equation, 'x').toString();
	let results = [];

	do {
		let fa = solve(a, equation);
		let derivativeFa = solve(a, derivative);
		let xk = a - fa / derivativeFa;
		let fxk = solve(xk, equation);

		let result = {
			k: interaction,
			a: a,
			fa: fa,
			derivativeFa: derivativeFa,
			xk: xk,
			fxk: fxk,
		};
		results.push(result);
		interaction++;

		a = xk;
	} while ([...results].pop().fxk > epsilon && interaction < 51);

	drawTable(results);
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
		row.insertCell(2).appendChild(document.createTextNode(result.fa));
		row.insertCell(3).appendChild(document.createTextNode(result.derivativeFa));
		row.insertCell(4).appendChild(document.createTextNode(result.xk));
		row.insertCell(5).appendChild(document.createTextNode(result.fxk));
	});
	row = table.insertRow(0);
	row.insertCell(0).appendChild(document.createTextNode('k'));
	row.insertCell(1).appendChild(document.createTextNode('a'));
	row.insertCell(2).appendChild(document.createTextNode('f(a)'));
	row.insertCell(3).appendChild(document.createTextNode("f'(a)"));
	row.insertCell(4).appendChild(document.createTextNode('xk'));
	row.insertCell(5).appendChild(document.createTextNode('f(xk)'));
}
