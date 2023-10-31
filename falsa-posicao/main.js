function getFormValues() {
	let equation = document.getElementById('equation').value;
	let a = Number(document.getElementById('a').value);
	let b = Number(document.getElementById('b').value);
	false_position(equation, a, b);
}

function false_position(equation, a, b) {
	let epsilon = 0.00001;
	let interaction = 0;
	let results = [];

	while (b - a > epsilon && interaction < 101) {
		let fa = solve(a, equation);
		let fb = solve(b, equation);
		let xk = (a * fb - b * fa) / (fb - fa);
		let fxk = solve(xk, equation);

		let result = {
			k: interaction,
			a: a,
			b: b,
			fa: fa,
			fb: fb,
			xk: xk,
			fxk: fxk,
		};

		results.push(result);

		if ((fxk > 0 && fa < 0) || (fa > 0 && fxk < 0)) {
			b = xk;
		} else {
			a = xk;
		}

		interaction++;
	}
	console.log(results);
	drawTable(results);
}

function solve(value, equation) {
	return math.eval(equation.replace(/[xy]+/g, value));
}
//x^4-8*x^3-35*x^2+450*x-1001

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
