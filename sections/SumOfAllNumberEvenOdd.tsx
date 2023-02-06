import {forwardRef, LegacyRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
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
				<p className="text-2xl font-bold">
					Dạng 2: Tổng các số chẵn/lẽ có k chữ số được lập thành từ tập có n chữ
					số
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
					<div className="mt-2">
						<p className="mb-2 text-lg">
							{"Tập có n chữ số, viết dạng 1,2,3...n"}
						</p>
						<Input
							placeholder="Vui lòng nhập tập hợp"
							{...register("set", {
								validate(set) {
									if (set.toString().trim().length === 0) {
										return "Vui lòng nhập tập hợp";
									}
									if (!/^[0-9](,[0-9])*$/.test(set.toString())) {
										return "Tập hợp không hợp lệ, hãy thử lại";
									}
									if ((set.toString().split(",")?.length || 0) > 10) {
										return "Tập hợp không vượt quá 10 phần tử";
									}
									let parsed = set
										?.toString()
										.split(",")
										.map((a) => parseInt(a));
									if (!!parsed.length && isSetdistinct(parsed)) {
										return "Tập hợp có số trùng nhau, hãy thử lại";
									}
									return;
								},
							})}
							className={errorSet && "!border-red-500"}
						/>
						<p className="text-sm text-gray-500 mt-1">{`Đang có: ${
							curSet?.length || 0
						} phần tử, trong đó có ${
							curSet.filter((a) =>
								curIsEven ? parseInt(a) % 2 === 0 : parseInt(a) % 2 === 1
							).length || 0
						} phần tử ${curIsEven ? "chẵn" : "lẻ"}`}</p>{" "}
						<p className="text-red-400">{errorSet}</p>
					</div>

					<div className="mt-2">
						<p className="mb-2 text-lg">
							{"Nhập k, với k là số các chữ số lấy từ tập trên"}
						</p>
						<Input
							placeholder="Vui lòng nhập số tự nhiên"
							{...register("k", {
								validate(k) {
									if (k.toString().trim().length === 0) {
										return "Vui lòng nhập số tự nhiên";
									}
									if (!/^[0-9]*[1-9][0-9]*$/.test(k.toString())) {
										return "Số không hợp lệ, hãy thử lại";
									}
									const maxLength = curSet?.length || 0;
									if (parseInt(k.toString()) > maxLength) {
										return "Số không vượt quá " + maxLength;
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
							<label
								htmlFor="checkbox-k-dif"
								className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer "
							>
								Lẻ
							</label>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									{...register("isEven")}
								/>
								<div className="w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 " />
								<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
									Chẵn
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
								className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer "
							>
								k chữ số khác nhau
							</label>
						</div>
					</div>
					<Button type="submit" text="Kết quả" className="mt-2" />
				</form>

				{/* RESULT */}
				{result && (
					<>
						<textarea
							rows={10}
							className="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							disabled
							value={result.total.join("\n")}
						/>
						<div className="text-xl font-bold mt-4">
							Tổng : {result.total.reduce((prev, cur) => prev + cur, 0)}
						</div>
					</>
				)}
			</main>
		);
	}
);
