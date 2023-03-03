import {NumberInputRange} from "../types/numberSumsInput";

const wait = (time: number) =>
	new Promise((resolve, _) => setTimeout(resolve, time));

export const isSetdistinct = (set: number[]) => {
	return new Set(set).size < set.length;
};

function getPermutations(
	array: number[],
	size: number,
	options: {
		distinct: boolean;
		isEven?: boolean;
		from?: number;
		to?: number;
	}
) {
	function p(t: number[], i: number) {
		if (t[0] === 0 && !options.from) {
			return;
		}
		if (t.length === size) {
			if (options.isEven === true && t[t.length - 1] % 2 !== 0) {
				return;
			}
			if (options.isEven === false && t[t.length - 1] % 2 === 0) {
				return;
			}
			let toPush = t.reduce(
				(prev, cur, i) => prev + cur * 10 ** (t.length - i - 1),
				0
			);
			if (t.includes(0) && options.from) {
				toPush = toPush * 10;
			}
			total = Array.from(new Set([...total, toPush]));
			return;
		}
		if (i >= array.length) {
			return;
		}
		for (let j = 0; j < array.length; j++) {
			if (!!options.from && t.length > 0 && array[j] < t[t.length - 1]) {
				continue;
			}
			if (options.distinct && t.includes(array[j])) {
				continue;
			}
			p(t.concat(array[j]), i + 1);
		}
	}
	var total: number[] = [];
	p([], 0);
	return {total};
}

const preprocessData = (data: Partial<NumberInputRange>) => {
	let arr = data.set
		.toString()
		.split(",")
		.map((a) => parseInt(a))
		.sort();
	if (!data.distinct) {
		arr = Array.from(new Set(arr));
	}
	return arr;
};

export function calculateSumOfAllNumber<T extends Partial<NumberInputRange>>(
	data: T
) {
	const arr = preprocessData(data);
	const k = +data.k;
	let allSumPermutation: ReturnType<typeof getPermutations> = {
		total: [],
	};

	allSumPermutation = getPermutations(arr, k, {
		distinct: !!data.from ? true : data.distinct,
		isEven: data.isEven,
		from: data.from,
		to: data.to,
	});

	return allSumPermutation;
}

export const calculatePermutationRange = (
	data: Partial<NumberInputRange>,
	permutationRange,
	allSumPermutation: {total: number[]},
	eventEmitter: any
) => {
	const arr = preprocessData(data);
	const k = +data.k;

	let curSumPermutation = allSumPermutation;
	let startFrom = permutationRange.start;

	for (let j = k; j <= arr.length; j++) {
		curSumPermutation = getPermutations(arr, j, {
			distinct: true,
			isEven: data.isEven,
			from: data.from,
			to: data.to,
		});
		allSumPermutation.total = [
			...allSumPermutation.total,
			...curSumPermutation.total,
		];
	}
	const step = 100;
	const len = allSumPermutation.total.length;
	allSumPermutation.total
		.slice(startFrom, Math.min(startFrom + step, len))
		.map((p, i) => {
			const eachP = getPermutations(
				p
					.toString()
					.split("")
					.map((p) => parseInt(p)),
				k,
				{distinct: data.distinct}
			);
			permutationRange[p] = eachP;
			eventEmitter.emit("process", (startFrom + i) / len);
		});

	permutationRange.start = Math.min(startFrom + step, len);

	if (permutationRange.start === len) {
		console.log("DONE");
		return "done";
	}
	console.log("PENDING");
	return "pending";
};

export const factorial = (a: number) => {
	const f = [];
	function calculate(n: number) {
		if (n == 0 || n == 1) return 1;
		if (f[n] > 0) return f[n];
		return (f[n] = calculate(n - 1) * n);
	}
	return calculate(a);
};

// nCk
export const calculateCombination = (k: number, n: number) => {
	if (k < 0 || n < 0 || k > n) {
		return 0;
	}
	const numerator = factorial(n);
	const denominator = factorial(k) * factorial(n - k);
	return numerator / denominator;
};

export const calculateCombinationRange = (k: number, len: number) => {
	let i = k;
	let result = 0;
	for (i; i <= len; i++) {
		result += calculateCombination(i, len);
	}
	return result;
};
