import Head from "next/head";
import Layout from "../components/Layout/";

const IndexPage = () => {
	const description = "Phạm Thanh Phương | Phạm Thanh Danh";

	const title = "Maths Utilities";
	const imageUrl =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJwtm1B-26IZO2xE3bIq4a_F_A3bLzdAUQQ&usqp=CAU";
	const social = {
		url: "https://cabri.com/",
	};

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href={imageUrl} />
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				{/* <!-- Primary Meta Tags --> */}
				<meta name="title" content={title} />
				<meta name="description" content={description} />

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content={social.url} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={imageUrl} />

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={social.url} />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />
				<meta property="twitter:image" content={imageUrl} />
			</Head>
			<Layout />
		</>
	);
};

export default IndexPage;
