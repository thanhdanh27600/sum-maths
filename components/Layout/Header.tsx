import {LanguageSelect} from "../LanguageSelect";

export const Header = () => {
	return (
		<header>
			<div className="flex justify-end">
				<LanguageSelect />
			</div>
		</header>
	);
};
