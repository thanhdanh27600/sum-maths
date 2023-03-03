export type NumberInput = {
	set: number;
	distinct: boolean;
	k: number;
};

export type NumberInputEvenOdd = NumberInput & {
	isEven: boolean;
};

export type NumberInputRange = NumberInputEvenOdd & {
	from: number;
	to: number;
	calcProbs: boolean;
};
