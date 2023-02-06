import {useCallback, useRef} from "react";
import {useReactToPrint} from "react-to-print";
import {SumOfAllNumber} from "../../sections/SumOfAllNumber";
import {SumOfAllNumberEvenOdd} from "../../sections/SumOfAllNumberEvenOdd";
import DownloadIcon from "../icons/DownloadIcon";
import {Footer} from "./Footer";
import {Header} from "./Header";

const Layout = () => {
	const ref = useRef<HTMLDivElement>(null);
	const reactToPrintContent = useCallback(() => {
		return ref.current;
	}, [ref.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: `Taive-${new Date().toDateString()}`,
		removeAfterPrint: true,
		bodyClass: "px-8 m-4",
	});

	return (
		<div className="container max-w-7xl my-8 mx-auto border">
			<button
				onClick={handlePrint}
				title="Download"
				className="absolute text-blue-700/10 hover:text-blue-700/20 transition-colors"
			>
				<svg
					width="50"
					height="50"
					aria-hidden="true"
					className="scale-x-[-1] scale-y-[1] "
				>
					<path
						fill="currentColor"
						d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
					></path>
				</svg>
				<span className="absolute -translate-y-[2.75rem] -translate-x-[1.2rem] duration-300 text-blue-700">
					<DownloadIcon className="w-4 h-4" />
				</span>
			</button>
			<div className="px-5 lg:px-32 py-8">
				<Header />
				<div ref={ref} className="flex gap-4 flex-col">
					<SumOfAllNumber />
					<SumOfAllNumberEvenOdd />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
