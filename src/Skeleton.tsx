import { MediaCard, SkeletonBodyText, SkeletonPage } from "@shopify/polaris";
import { useEffect, useState } from "react";

function getWindowDimensions() {
	const { innerWidth: width } = window;
	return {
		width,
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

const Skeleton = () => {
	const { width } = useWindowDimensions();
	return (
		<SkeletonPage title=" ">
			<div
				style={{
					width: width > 600 ? 600 : 350,
				}}
			>
				<MediaCard
					title={<SkeletonBodyText lines={4} />}
					description={""}
					portrait={true}
				>
					<div
						style={{
							width: width > 600 ? 600 : 350,
							height: width > 600 ? 400 : 200,
							backgroundColor: "#EBECED",
						}}
					></div>
				</MediaCard>
			</div>
		</SkeletonPage>
	);
};

export default Skeleton;
