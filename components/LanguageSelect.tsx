import clsx from "clsx";
import {i18n} from "i18next";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Language} from "../lang/i18n";
import {DropdownIndicate} from "./icons/DropdownIndicate";
import {UsaIcon} from "./icons/UsaIcon";
import {VietnamIcon} from "./icons/VietnamIcon";

const LangugageIcon = {
	en: UsaIcon,
	vi: VietnamIcon,
};

const LanguageOptions = ({i18n, setOpen}: {i18n: i18n; setOpen: any}) => (
	<>
		{Object.keys(Language).map((lan) => {
			const Icon = LangugageIcon[lan];
			return (
				<li className="list-none ml-0" key={lan}>
					<button
						onClick={() => {
							i18n.changeLanguage(lan);
							setOpen(false);
						}}
						type="button"
						className="inline-flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<div className="inline-flex items-center">
							<Icon width={20} className="mr-2" />
							{Language[lan]}
						</div>
					</button>
				</li>
			);
		})}
	</>
);
export const LanguageSelect = () => {
	const {t, i18n} = useTranslation("common");
	const [open, setOpen] = useState(false);

	const currentLanguage = i18n.language;
	const Icon = LangugageIcon[currentLanguage];

	return (
		<div className="flex">
			<button
				onClick={() => {
					setOpen((prev) => !prev);
				}}
				className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 w-40"
				type="button"
			>
				<div className="flex w-full items-center gap-1">
					<Icon className="h-4" />
					{Language[currentLanguage]}
				</div>
				<DropdownIndicate />
			</button>
			<div
				className={clsx(
					"z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44 dark:bg-gray-700 absolute inset-x-auto m-0",
					open && "!block translate-y-[46px]"
				)}
			>
				<ul className="text-sm text-gray-900" aria-labelledby="states-button">
					<LanguageOptions i18n={i18n} setOpen={setOpen} />
				</ul>
			</div>
		</div>
	);
};
