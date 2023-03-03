import {forwardRef, LegacyRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {
	calculateCombination,
	calculateCombinationRange,
	calculatePermutationRange,
	calculateSumOfAllNumber,
	isSetdistinct,
} from "../logics/calculateSumOfAllNumber";
import {NumberInputRange} from "../types/numberSumsInput";

// DANG 3

let allSumPermutation: {total: number[]} = {total: []};
let permutationRange = {start: 0};
let globalData = {} as NumberInputRange;

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
eventEmitter.on("process", (percent) => {
	console.log("percent", percent);
});

export const SumOfAllNumberRange = forwardRef(
	(props, ref: LegacyRef<HTMLElement>) => {
		const {
			register,
			handleSubmit,
			formState: {errors},
			watch,
		} = useForm<NumberInputRange>();

		const {t} = useTranslation("common");

		const [result, setResult] = useState(undefined);
		const [total, setTotal] = useState(0);
		const [submited, setSubmitted] = useState(0);

		const renderDisplay = () => {
			let ith = 1;
			let localTotal = [];
			const display = Object.entries(permutationRange)
				.map((e, i) => {
					let totalEachArr = Array.from(new Set((e[1] as any).total));
					let totalEach = totalEachArr.reduce(
						(prev: number, next: number) => prev + next,
						0
					) as number;
					if (totalEach < globalData.from || totalEach > globalData.to) {
						return "";
					}
					localTotal.push(totalEach);
					return `${ith++}. ${t("Set")} \{${e[0]
						.toString()
						.split("")
						.sort()
						.join(",")}\} ${t("total2", {
						n1: totalEach,
						n2: totalEachArr.join("\n \t"),
					})}`;
				})
				.filter((a) => !!a)
				.join("\n");
			if (!display) {
				setResult(t("noSetFound"));
			} else {
				setResult(display);
			}
			setTimeout(() => {
				if (total !== 0 && total === localTotal.length) {
					allSumPermutation = {total: []};
					permutationRange = {start: 0};
					globalData = {} as NumberInputRange;
					setSubmitted(0);
				}
			}, 0);
			setTotal(localTotal.length);
		};

		const onSubmit: SubmitHandler<NumberInputRange> = (data) => {
			globalData = data;
			globalData.isEven = undefined;
			allSumPermutation = calculateSumOfAllNumber(globalData);

			const status = calculatePermutationRange(
				globalData,
				permutationRange,
				allSumPermutation,
				eventEmitter
			);
			renderDisplay();
			if (status === "done") {
				allSumPermutation = {total: []};
				permutationRange = {start: 0};
				globalData = {} as NumberInputRange;
				setSubmitted(0);
				return;
			}
			setSubmitted(1);
		};

		const onContinue = () => {
			const status = calculatePermutationRange(
				globalData,
				permutationRange,
				allSumPermutation,
				eventEmitter
			);
			if (status === "done") {
				allSumPermutation = {total: []};
				permutationRange = {start: 0};
				globalData = {} as NumberInputRange;
				setSubmitted(0);
				return;
			} else {
				setSubmitted((s) => s + 1);
				renderDisplay();
			}
		};

		const errorSet = errors.set?.message;
		const errorK = errors.k?.message;
		const errorFrom = errors.from?.message;
		const errorTo = errors.to?.message;

		return (
			<main ref={ref}>
				<p className="text-2xl font-bold">{t("head3")}</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
					<div className="mt-2">
						<p className="mb-2 text-lg">{t("setInputLabel")}</p>
						<Input
							placeholder={t("pleaseInputSet")}
							{...register("set", {
								validate(set) {
									if (set.toString().trim().length === 0) {
										return t("pleaseInputSet");
									}
									if (!/^[0-9](,[0-9])*$/.test(set.toString())) {
										return t("invalidSet");
									}
									if ((set.toString().split(",")?.length || 0) > 10) {
										return t("maxLimitSet", {n: 10});
									}
									let parsed = set
										?.toString()
										.split(",")
										.map((a) => parseInt(a));
									if (!!parsed.length && isSetdistinct(parsed)) {
										return t("duplicateElements");
									}
									return;
								},
							})}
							disabled={submited > 0}
							className={errorSet && "!border-red-500"}
						/>
						<p className="text-sm text-gray-500 mt-1">
							{t("currentSetHas", {
								n: watch("set")?.toString().split(",")?.length || 0,
							})}
						</p>{" "}
						<p className="text-red-400">{errorSet}</p>
					</div>

					<div className="mt-2">
						<p className="mb-2 text-lg">{t("inputK")}</p>
						<Input
							placeholder={t("pleaseInputNum")}
							{...register("k", {
								validate(k) {
									if (k.toString().trim().length === 0) {
										return t("pleaseInputNum");
									}
									if (!/^[0-9]*[1-9][0-9]*$/.test(k.toString())) {
										return t("invalidNum");
									}
									const maxLength =
										watch("set").toString().split(",")?.length || 0;
									if (parseInt(k.toString()) > maxLength) {
										return t("maxNum", {n: maxLength});
									}
									return;
								},
							})}
							disabled={submited > 0}
							className={errorK && "!border-red-500"}
						/>
						<p className="text-red-400">{errorK}</p>
					</div>

					<div className="mt-2">
						<p className="mb-2 text-lg">{t("sumInRange")}</p>
						<div className="flex justify-between gap-4">
							<div className="flex flex-col w-full">
								<div className="flex w-full gap-4 items-center">
									<p className="">{t("from")}</p>
									<Input
										placeholder={t("pleaseInputNum")}
										{...register("from", {
											validate(from) {
												if (from.toString().trim().length === 0) {
													return t("pleaseInputNum");
												}
												if (!/^[0-9]*[1-9][0-9]*$/.test(from.toString())) {
													return t("invalidNum");
												}
												return;
											},
										})}
										disabled={submited > 0}
										className={errorFrom && "!border-red-500"}
									/>
								</div>
								<p className="ml-9 text-red-400">{errorFrom}</p>
							</div>
							<div className="flex flex-col w-full">
								<div className="flex w-full gap-4 items-center">
									<p className="">{t("to")}</p>
									<Input
										placeholder={t("pleaseInputNum")}
										{...register("to", {
											validate(to) {
												if (to.toString().trim().length === 0) {
													return t("pleaseInputNum");
												}
												if (!/^[0-9]*[1-9][0-9]*$/.test(to.toString())) {
													return t("invalidNum");
												}
												return;
											},
										})}
										disabled={submited > 0}
										className={errorTo && "!border-red-500"}
									/>
								</div>
								<p className="ml-12 text-red-400">{errorTo}</p>
							</div>
						</div>
					</div>

					<div className="mt-2">
						<div className="flex items-center w-fit">
							<input
								id="checkbox-k-dif-3"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
								disabled={submited > 0}
								{...register("distinct")}
							/>
							<label
								htmlFor="checkbox-k-dif-3"
								className="ml-2 text-sm font-medium text-gray-900  cursor-pointer "
							>
								{t("kDif")}
							</label>
						</div>
					</div>
					<div className="mt-2">
						<div className="flex items-center w-fit">
							<input
								id="checkbox-k-dif-4"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
								disabled={submited > 0}
								{...register("calcProbs")}
							/>
							<label
								htmlFor="checkbox-k-dif-4"
								className="ml-2 text-sm font-medium text-gray-900  cursor-pointer"
							>
								{t("calcProbs")}
							</label>
						</div>
					</div>
					{submited === 0 && (
						<Button
							type="submit"
							text={!!result ? t("recalculate") : t("result")}
							className="mt-2"
						/>
					)}
				</form>

				{submited > 0 && (
					<div>
						{t("calculating", {n: submited})}
						<Button
							type="button"
							text={t("continue")}
							className="ml-2"
							onClick={onContinue}
						/>
					</div>
				)}

				{/* RESULT */}
				{result && (
					<textarea
						rows={10}
						className="mt-2 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
						disabled
						value={result}
					/>
				)}

				{submited > 0 && (
					<div>
						<Button
							type="button"
							text={t("stopCalc")}
							className=" bg-red-500 mt-4"
							onClick={() => {
								setTimeout(() => {
									allSumPermutation = {total: []};
									permutationRange = {start: 0};
									globalData = {} as NumberInputRange;
									setSubmitted(0);
									setResult('')
									setTotal(0)
								}, 0);
							}}
						/>
					</div>
				)}


				{total > 0 && (
					<div className="text-xl font-bold mt-4 border-2 border-solid border-red-500 w-fit p-2">
						{t("hasTotalSet", {n: total})}
					</div>
				)}
				{total > 0 && watch("calcProbs") && !errorSet && !errorK && (
					<div className="text-xl font-bold mt-4 border-2 border-solid w-fit p-2">
						{t("probs", {
							n: `${total}/${calculateCombinationRange(
								parseInt(watch("k").toString() || "0"),
								watch("set").toString().split(",")?.length || 0
							)} = ${
								total /
								calculateCombinationRange(
									parseInt(watch("k").toString() || "0"),
									watch("set").toString().split(",")?.length || 0
								)
							}`,
						})}
					</div>
				)}
			</main>
		);
	}
);
