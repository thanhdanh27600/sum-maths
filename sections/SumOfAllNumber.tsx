import {forwardRef, LegacyRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {
	calculateSumOfAllNumber,
	isSetdistinct,
} from "../logics/calculateSumOfAllNumber";
import {NumberInput} from "../types/numberSumsInput";

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
		};

		const [result, setResult] = useState(undefined);

		const errorSet = errors.set?.message;
		const errorK = errors.k?.message;

		return (
			<main ref={ref}>
				<p className="text-2xl font-bold">
					Dạng 1: Tổng các số có k chữ số được lập thành từ tập có n chữ số
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
					<div className="mt-2">
						<p className="mb-2 text-lg">
							{"Tập n phần tử, viết dạng 1,2,3...n"}
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
							watch("set")?.toString().split(",")?.length || 0
						} phần tử`}</p>{" "}
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
									const maxLength =
										watch("set").toString().split(",")?.length || 0;
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
							<input
								id="checkbox-k-dif"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 cursor-pointer"
								{...register("distinct")}
							/>
							<label
								htmlFor="checkbox-k-dif"
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
