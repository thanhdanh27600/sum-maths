import {forwardRef, LegacyRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {
	calculateSumOfAllNumber,
	isSetdistinct,
} from "../logics/calculateSumOfAllNumber";
import {NumberInputEvenOdd} from "../types/numberSumsInput";

// DANG 2

export const SumOfAllNumberEvenOdd = forwardRef(
	(props, ref: LegacyRef<HTMLElement>) => {
		const {
			register,
			handleSubmit,
			formState: {errors},
			watch,
		} = useForm<NumberInputEvenOdd>();

		const {t} = useTranslation("common");

		const onSubmit: SubmitHandler<NumberInputEvenOdd> = (data) => {
			const result = calculateSumOfAllNumber(data);
			setResult(result);
		};

		const [result, setResult] = useState(undefined);

		const errorSet = errors.set?.message;
		const errorK = errors.k?.message;

		const curSet = watch("set")?.toString().split(",");
		const curIsEven = !!watch("isEven");

		return (
			<main ref={ref}>
				<p className="text-2xl font-bold">{t("head2")}</p>
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
							className={errorSet && "!border-red-500"}
						/>
						<p className="text-sm text-gray-500 mt-1">
							{t("currentSetHasOddEven", {
								n1: curSet?.length || 0,
								n2:
									curSet?.filter((a) =>
										curIsEven ? parseInt(a) % 2 === 0 : parseInt(a) % 2 === 1
									).length || 0,
								n: curIsEven ? t("even") : t("odd"),
							})}
						</p>
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
									const maxLength = curSet?.length || 0;
									if (parseInt(k.toString()) > maxLength) {
										return t("maxNum", {n: maxLength});
									}
									return;
								},
							})}
							className={errorK && "!border-red-500"}
						/>
						<p className="text-red-400">{errorK}</p>
					</div>

					<div className="mt-2">
						<div className="flex items-center w-fit">
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									{...register("isEven")}
								/>
								<span className="mr-3 text-sm font-medium text-gray-900">
									{t("Odd")}
								</span>
								<div className="w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full after:translate-x-[3.25px] peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all " />
								<span className="ml-3 text-sm font-medium text-gray-900">
									{t("Even")}
								</span>
							</label>
						</div>
					</div>

					<div className="mt-2">
						<div className="flex items-center w-fit">
							<input
								id="checkbox-k-dif-2"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
								{...register("distinct")}
							/>
							<label
								htmlFor="checkbox-k-dif-2"
								className="ml-2 text-sm font-medium text-gray-900  cursor-pointer "
							>
								{t("kDif")}
							</label>
						</div>
					</div>
					<Button type="submit" text={t("result")} className="mt-2" />
				</form>

				{/* RESULT */}
				{result && (
					<>
						<textarea
							rows={10}
							className="mt-2 block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							disabled
							value={result.total.join("\n")}
						/>
						<div className="text-xl font-bold mt-4  border-2 border-solid border-red-500 w-fit p-2">
							{t("total")} : {result.total.reduce((prev, cur) => prev + cur, 0)}
						</div>
					</>
				)}
			</main>
		);
	}
);
