import {AppProps} from "next/app";

import mixpanel from "mixpanel-browser";
import "../styles/global.css";
// import i18n (needs to be bundled ;))
import "../lang/i18n";
import {
	isProduction,
	MIX_PANEL_EVENT,
	MIX_PANEL_TOKEN,
} from "../utils/constants";

function MyApp({Component, pageProps}: AppProps) {
	if (!MIX_PANEL_TOKEN) {
		console.log("Mix panel Not found");
	} else {
		mixpanel.init(MIX_PANEL_TOKEN, {
			debug: !isProduction,
			loaded: function () {
				if (typeof location === "undefined") return;
				if (location.pathname === "/") {
					mixpanel.track(MIX_PANEL_EVENT.HOME);
				}
			},
			ignore_dnt: isProduction,
		});
		console.log(
			"Mix panel loaded",
			!isProduction ? MIX_PANEL_TOKEN : undefined
		);
	}
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
