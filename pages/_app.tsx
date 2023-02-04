import React from "react";
import {AppProps} from "next/app";

import "../styles/global.css";

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
			<Component {...pageProps} />;
		</>
	);
}

export default MyApp;
