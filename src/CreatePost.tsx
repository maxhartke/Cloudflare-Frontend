import {
	AppProvider,
	Button,
	Card,
	Form,
	FormLayout,
	Layout,
	Page,
	TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { post } from "./post";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [username, setUsername] = useState("");
	const [content, setContent] = useState("");
	const [url, setUrl] = useState("");
	const userPost: post = {
		title: title,
		username: username,
		content: content,
		url: url,
	};
	const handleSubmit = async () => {
		try {
			const response = await fetch(
				"https://my-typescript-worker.hartke-max.workers.dev/",
				{
					method: "POST",
					body: JSON.stringify(userPost),
				}
			);
			const data = await response.text();
			console.log(data);
		} catch (err: any) {
			console.log(err);
		}
		setUsername("");
		setContent("");
		setTitle("");
		setUrl("");
		alert("Success");
	};
	const handleTitleChange = useCallback((value) => setTitle(value), []);
	const handleUsernameChange = useCallback((value) => setUsername(value), []);
	const handleContentChange = useCallback((value) => setContent(value), []);
	const handleUrlChange = useCallback((value) => setUrl(value), []);
	return (
		<AppProvider
			i18n={{}}
			theme={{
				colors: {
					surface: "#111213",
					onSurface: "#111213",
					interactive: "#2e72d2",
					secondary: "#111213",
					primary: "#3b5998",
					critical: "#d82c0d",
					warning: "#ffc453",
					highlight: "#5bcdda",
					success: "#008060",
					decorative: "#ffc96b",
				},
			}}
		>
			<Page>
				<Link style={{ textDecoration: "none" }} to="/">
					<Button>Back</Button>
				</Link>
				<div
					style={{
						marginTop: 45,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Layout>
						<Layout.AnnotatedSection
							id="Create Post Form"
							title="Create a Post"
							description="Fill out the following fields to create a post."
						>
							<Card sectioned>
								<Form onSubmit={handleSubmit}>
									<FormLayout>
										<TextField
											label="Title"
											value={title}
											onChange={handleTitleChange}
											autoComplete="off"
										/>
										<TextField
											label="User Name"
											value={username}
											onChange={handleUsernameChange}
											autoComplete="off"
										/>
										<TextField
											label="Content"
											value={content}
											onChange={handleContentChange}
											autoComplete="off"
										/>
										<TextField
											label="Image Url"
											value={url}
											onChange={handleUrlChange}
											autoComplete="off"
										/>
										<Button submit>Submit</Button>
									</FormLayout>
								</Form>
							</Card>
						</Layout.AnnotatedSection>
					</Layout>
				</div>
			</Page>
		</AppProvider>
	);
}
