export * from "./serial";

/**
 * Determines if a value is a number other than `NaN`
 * @param x
 */
export function isNumber(x: unknown): x is number {
	return typeof x === "number" && !Number.isNaN(x);
}

/**
 * Determines if a value is a finite number other than `NaN`
 * @param x
 */
export function isReal(x: unknown): x is number {
	return isNumber(x) && Number.isFinite(x);
}

/**
 * Rounds `x` to the nearest multiple of `n`
 * @param x the number to round
 * @param n the multiple to round to
 */
export function roundToMultiple(x: number, n: number): number {
	return Math.floor(x / n) * n;
}

/**
 * Rounds `x` to the nearest even number
 * @param x
 */
export function roundToEven(x: number): number {
	return roundToMultiple(x, 2);
}

// https://minershaven.fandom.com/wiki/Cash_Suffixes#List_of_Cash_Suffixes
export const suffixes: Array<
	[
		repeated: [
			ending: string,
			symbol: string,
			first?: string,
			firstSymbol?: string,
		],
		prefixes: Array<[long: string, short: string]>,
	]
> = [
	[
		["illion", "", "thousand", "k"],
		[
			["", ""],
			["m", "M"],
			["b", "B"],
			["tr", "T"],
			["quadr", "qd"],
			["quint", "Qn"],
			["sext", "sx"],
			["sept", "Sp"],
			["oct", "O"],
			["non", "N"],
		],
	],
	[
		["decillion", "D"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tre", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["sex", "sx"],
			["sept", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["vigintillion", "V"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tres", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["ses", "s"],
			["septem", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["trigintillion", "T"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tres", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["ses", "s"],
			["septen", "Sp"],
			["octo", "O"],
			["noven", "N"],
		],
	],
	[
		["quadragintillion", "qg"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tres", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["ses", "s"],
			["septen", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["quinquagintillion", "Qg"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tres", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["ses", "s"],
			["septen", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["sexagintillion", "Sx"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tres", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["se", "s"],
			["septen", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["septuagintillion", "Sp"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tre", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["se", "s"],
			["septen", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["octogintillion", "O"],
		[
			["", ""],
			["un", "u"],
			["duo", "d"],
			["tre", "t"],
			["quattuor", "qd"],
			["quin", "Qn"],
			["sex", "sx"],
			["septem", "Sp"],
			["octo", "O"],
			["novem", "N"],
		],
	],
	[
		["onagintillion", "N"],
		[
			["n", ""],
			["unn", "u"],
			["duon", "d"],
			["tren", "t"],
			["quattuorn", "qd"],
			["quinn", "Qn"],
			["sen", "sn"],
			["septen", "Sp"],
			["octon", "O"],
			["novem", "N"],
		],
	],
	[
		["centillion", "CT"],
		[
			["", ""],
			["un", "u"],
		],
	],
];

export function toSuffix(x: number, shortNotation = false): string {
	const power = Math.log10(x);
	const order = Math.floor(power);
	const order3 = Math.floor(order / 3);
	// 0-999,999.999
	if (order3 < 1) return x.toLocaleString();

	const order30 = Math.floor(order3 / 10);
	const suffix = suffixes[order30];
	if (suffix) {
		const [[ending, symbol, first = ending, firstSymbol = symbol], prefixes] =
			suffix;
		const index = order3 - order30 * 10 - 1;
		const [long, short] = prefixes[index]!;
		const n = roundToMultiple(x / 10 ** (order3 * 3), 0.001);

		if (shortNotation) {
			if (index === 0) return `${n} ${firstSymbol}`;
			return `${n} ${short}${symbol}`;
		}

		if (index === 0) return `${n} ${first}`;
		return `${n} ${long}${ending}`;
	}

	return x.toString();
}