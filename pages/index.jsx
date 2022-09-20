import Head from 'next/head';
import Sidebar from '../components/sidebar';
import SideFilter from '../components/sideFilter';
import PostPreview from '../components/postPreview';
import BlogPreview from '../components/blogPreview';
import AddPost from '../components/modal/addPost';

import style from '../styles/Home.module.scss';

const Homepage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={style.left}>
				<SideFilter />
			</div>
			<div className={style.right}>
				<PostPreview image="/assets/images/temp/tempPlace.jpg" description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores.' />
				<PostPreview description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur placeat consectetur itaque? A, sint voluptates amet minus quam nam distinctio sunt impedit quasi natus omnis itaque dolorum consectetur mollitia asperiores.'/>
				<BlogPreview />
				<PostPreview image="/assets/images/temp/tempPlace.jpg"/>
				<PostPreview image="/assets/images/temp/tempPlace.jpg"/>
				<PostPreview image="/assets/images/temp/tempPlace.jpg"/>
				<PostPreview image="/assets/images/temp/tempPlace.jpg"/>
				<PostPreview image="/assets/images/temp/tempPlace.jpg"/>
				// TODO AddPost modal still in progress by Klara V.
				<AddPost openModal={false}/>
			</div>
		</>
	)
}

export default Homepage;