import clsx from "clsx";
import {
	DetailedHTMLProps,
	ForwardedRef,
	forwardRef,
	InputHTMLAttributes,
} from "react";

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {}

export const Input = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLInputElement>) => {
		return (
			<input
				{...props}
				ref={ref}
				className={clsx(
					"block h-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus-visible:outline-blue-500 dark:border-blue-600 dark:bg-blue-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
					props.className
				)}
			/>
		);
	}
);
