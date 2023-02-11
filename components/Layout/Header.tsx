import {LanguageSelect} from "../LanguageSelect";

export const Header = () => {
	return (
		<header>
			<div className="flex justify-end mb-4">
				<LanguageSelect />
			</div>
		</header>
	);
};
