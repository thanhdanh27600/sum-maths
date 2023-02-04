import clsx from "clsx";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {Loading} from "./Loading";
type ButtonColors = "blue";
type ButtonVariants = "filled" | "outlined";

export interface ButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	text?: string;
	color?: ButtonColors;
	variant?: ButtonVariants;
	loading?: boolean;
}

export const Button = (props: ButtonProps) => {
	const {
		text = "Button",
		color = "blue",
		variant = "filled",
		loading,
		...otherProps
	} = props;
	return (
		<button
			{...otherProps}
			className={clsx(
				"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all w-fit",
				props.className
			)}
		>
			<span
				className={clsx("flex min-h-[1.2rem] min-w-max", {
					"relative max-h-4 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900":
						variant === "outlined",
				})}
			>
				{props.loading ? <Loading className="!h-5 !w-5" /> : text}
			</span>
		</button>
	);
};
