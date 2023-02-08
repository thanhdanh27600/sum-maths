import {AppProps} from "next/app";

import "../styles/global.css";
// import i18n (needs to be bundled ;))
import "../lang/i18n";

function MyApp({Component, pageProps}: AppProps) {
	return (
		<>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="anonymous"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
				rel="stylesheet"
			/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
