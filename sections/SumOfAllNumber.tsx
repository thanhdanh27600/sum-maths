import mixpanel from "mixpanel-browser";
import { forwardRef, LegacyRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
	calculateSumOfAllNumber,
	isSetdistinct,
} from "../logics/calculateSumOfAllNumber";
import { NumberInput } from "../types/numberSumsInput";
import { MIX_PANEL_EVENT } from "../utils/constants";

// DANG 1

export const SumOfAllNumber = forwardRef(
	(props, ref: LegacyRef<HTMLElement>) => {
		const {
			register,
			handleSubmit,
			formState: {errors},
			watch,
		} = useForm<NumberInput>();

		const onSubmit: SubmitHandler<NumberInput> = (data) => {
			const result = calculateSumOfAllNumber(data);
			setResult(result);
			mixpanel.track(MIX_PANEL_EVENT.CALCULATE_1, {data});
		};

		const {t} = useTranslation("common");

		const [result, setResult] = useState(undefined);

		const errorSet = errors.set?.message;
		const errorK = errors.k?.message;

		return (
			<main ref={ref}>
				<p className="text-2xl font-bold text-red-600">{t("head1")}</p>
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
							className={errorK && "!border-red-500"}
						/>
						<p className="text-red-400">{errorK}</p>
					</div>

					<div className="mt-2">
						<div className="flex items-center w-fit">
							<input
								id="checkbox-k-dif"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
								{...register("distinct")}
							/>
							<label
								htmlFor="checkbox-k-dif"
								className="ml-2 text-sm font-medium text-gray-900 cursor-pointer "
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
						<div className="mt-2">{t("totalNum", {n: result.total.length})}</div>
						<div className="text-xl font-bold mt-2 border-2 border-solid border-red-500 w-fit p-2">
							{t("total")} : {result.total.reduce((prev, cur) => prev + cur, 0)}
						</div>
					</>
				)}
			</main>
		);
	}
);
