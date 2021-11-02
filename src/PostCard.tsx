import { HeartFillIcon, HeartIcon, ShareIcon } from "@primer/octicons-react";
import { MediaCard, Spinner } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { post } from "./post";
import { useWindowDimensions } from "./Skeleton";

const PostCard = (props: { post: post }) => {
	const [like, setlike] = useState(true);
	const [isLoading, setisLoading] = useState(false);
	const { width } = useWindowDimensions();
	useEffect(() => {
		const imageToLoad = new Image();
		imageToLoad.src = props.post.url;
		imageToLoad.onload = () => {
			setisLoading(true);
		};
	}, [props.post.url]);

	return (
		<div style={{ width: width > 600 ? 600 : 350 }}>
			<MediaCard
				title={props.post.username + ":  " + props.post.title}
				description={props.post.content ?? "null"}
				size="small"
				portrait={true}
			>
				{isLoading ? (
					<img
						alt={props.post.title}
						onLoad={() => setisLoading(true)}
						width="600"
						height="400"
						style={{
							objectFit: "cover",
							objectPosition: "center",
						}}
						src={
							props.post.url ??
							"https://semantic-ui.com/images/wireframe/image.png"
						}
					/>
				) : (
					<div
						style={{
							width: width > 600 ? 600 : 350,
							height: width > 600 ? 400 : 200,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Spinner accessibilityLabel="Spinner example" size="large" />
					</div>
				)}

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "row",
						height: 40,
						marginTop: 15,
						marginBottom: -18,
						marginInline: 25,
					}}
				>
					{like ? (
						<div onClick={() => setlike(!like)}>
							<HeartIcon fill={"#24292E"} size={24} />
						</div>
					) : (
						<div onClick={() => setlike(!like)}>
							<HeartFillIcon fill={"#f00"} size={24} />
						</div>
					)}
					<div onClick={() => alert(props.post.url)}>
						<ShareIcon fill={"#24292E"} size={24}></ShareIcon>
					</div>
				</div>
			</MediaCard>
		</div>
	);
};

export default PostCard;
