import {
	NumberInput,
	NumberInputEvenOdd,
	NumberInputRange,
} from "../types/numberSumsInput";

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
		if (t[0] === 0) {
			return;
		}
		if (t.length === size) {
			if (options.isEven === true && t[t.length - 1] % 2 !== 0) {
				return;
			}
			if (options.isEven === false && t[t.length - 1] % 2 === 0) {
				return;
			}
			permutation.push(t);
			total.push(
				t.reduce((prev, cur, i) => prev + cur * 10 ** (t.length - i - 1), 0)
			);
			return;
		}
		if (i >= array.length) {
			return;
		}
		for (let j = 0; j < array.length; j++) {
			if (!!options.from && array[j] < t[t.length - 1]) {
				continue;
			}
			if (options.distinct && t.includes(array[j])) {
				continue;
			}
			p(t.concat(array[j]), i + 1);
		}
	}
	var total: number[] = [];
	var permutation: number[][] = [];
	p([], 0);
	return {permutation, total};
}

export function calculateSumOfAllNumber<T extends Partial<NumberInputRange>>(
	data: T
) {
	console.log("data", data);
	let arr = data.set
		.toString()
		.split(",")
		.map((a) => parseInt(a));
	if (!data.distinct) {
		arr = Array.from(new Set(arr));
	}
	const k = +data.k;
	const allSumPermutation = getPermutations(arr, k, {
		distinct: data.distinct,
		isEven: data.isEven,
		from: data.from,
		to: data.to,
	});
	let permutationRange = {};
	if (!!data.from) {
		allSumPermutation.total.forEach((p) => {
			const eachP = getPermutations(
				p
					.toString()
					.split("")
					.map((p) => parseInt(p)),
				k,
				{distinct: data.distinct}
			);
			permutationRange[p] = eachP;
		});
	}
	console.log("permutationRange", permutationRange);
	return {...allSumPermutation, permutationRange};
}
