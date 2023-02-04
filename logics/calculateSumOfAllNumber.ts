import {NumberInput} from "../types/numberSumsInput";

export const isSetdistinct = (set: number[]) => {
	return new Set(set).size < set.length;
};

function getPermutations(array: number[], size: number, distinct: boolean) {
	function p(t: number[], i: number) {
		if (t.length === size) {
			if (t[0] === 0) {
				return;
			}
			permutation.push(t);
			total.push(
				[...t].reverse().reduce((prev, cur, i) => prev + cur * 10 ** i, 0)
			);
			return;
		}
		if (i >= array.length) {
			return;
		}
		for (let j = 0; j < array.length; j++) {
			if (distinct && t.includes(array[j])) {
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

export const calculateSumOfAllNumber = (data: NumberInput) => {
	let arr = data.set
		.toString()
		.split(",")
		.map((a) => parseInt(a));
	if (!data.distinct) {
		arr = Array.from(new Set(arr));
	}
	const k = +data.k;
	console.log("arr", arr);
	console.log("k", k);
	const allSumPermutation = getPermutations(arr, k, data.distinct);
	console.log("allSumPermutation", allSumPermutation);
	return allSumPermutation;
};
