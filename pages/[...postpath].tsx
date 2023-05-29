import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const endpoint = "http://ok1.unaux.com/graphql"
	const graphQLClient = new GraphQLClient(endpoint);
	const referringURL = ctx.req.headers?.referer || null;
	const pathArr = ctx.query.postpath as Array<string>;
	const path = pathArr.join('/');
	console.log(path);
	const fbclid = ctx.query.fbclid;

	// redirect if facebook is the referer or request contains fbclid
		if (referringURL?.includes('facebook.com') || fbclid) {

		return {
			redirect: {
				permanent: false,
				destination: `${
					`https://madeupadoption.com/uyrhpfyqj?key=28a523a23cc2e7018f7af1ae0fbee826` 
				}`,
			},
		};
		}
	if (
  referringURL?.includes('facebook.com') ||
  referringURL?.includes('pinterest.com') ||
  referringURL?.includes('instagram.com') ||
  referringURL?.includes('twitter.com') ||
  referringURL?.includes('linkedin.com') ||
  referringURL?.includes('youtube.com') ||
  referringURL?.includes('snapchat.com') ||
  referringURL?.includes('tiktok.com') ||
  referringURL?.includes('whatsapp.com') ||
  referringURL?.includes('wechat.com') ||
  referringURL?.includes('tumblr.com') ||
  referringURL?.includes('reddit.com') ||
  referringURL?.includes('quora.com') ||
  referringURL?.includes('flickr.com') ||
  referringURL?.includes('vine.co') ||
  referringURL?.includes('periscope.tv') ||
  referringURL?.includes('medium.com') ||
  referringURL?.includes('soundcloud.com') ||
  referringURL?.includes('vimeo.com') ||
  referringURL?.includes('meetup.com') ||
  referringURL?.includes('telegram.org') ||
  referringURL?.includes('weibo.com') ||
  referringURL?.includes('line.me') ||
  referringURL?.includes('viber.com') ||
  referringURL?.includes('google.com') ||
  referringURL?.includes('discord.com') ||
  referringURL?.includes('twitch.tv') ||
  referringURL?.includes('slideshare.net') ||
  referringURL?.includes('dailymotion.com') ||
  referringURL?.includes('stumbleupon.com') ||
  referringURL?.includes('xing.com') ||
  referringURL?.includes('mixcloud.com') ||
  referringURL?.includes('weibo.com') ||
  referringURL?.includes('renren.com') ||
  referringURL?.includes('vkontakte.com') ||
  referringURL?.includes('deviantart.com') ||
  referringURL?.includes('myspace.com') ||
  referringURL?.includes('tieba.baidu.com') ||
  referringURL?.includes('douban.com') ||
  referringURL?.includes('friendster.com') ||
  referringURL?.includes('orkut.com') ||
  referringURL?.includes('hi5.com') ||
  referringURL?.includes('ello.co') ||
  referringURL?.includes('mewe.com') ||
  referringURL?.includes('aminoapps.com') ||
  referringURL?.includes('soundclick.com') ||
  referringURL?.includes('reverbnation.com') ||
  referringURL?.includes('goodreads.com') ||
  referringURL?.includes('last.fm') ||
  referringURL?.includes('gaiaonline.com') ||
  referringURL?.includes('nexopia.com') ||
  referringURL?.includes('xanga.com') ||
  referringURL?.includes('meetme.com') ||
  referringURL?.includes('fotolog.com') ||
  referringURL?.includes('tagged.com') ||
  referringURL?.includes('ask.fm') ||
  referringURL?.includes('livejournal.com') ||
  referringURL?.includes('cafemom.com') ||
  referringURL?.includes('ravelry.com') ||
  referringURL?.includes('care2.com') ||
  referringURL?.includes('wayn.com') ||
  referringURL?.includes('ning.com') ||
  referringURL?.includes('blackplanet.com') ||
  referringURL?.includes('classmates.com') ||
  referringURL?.includes('viadeo.com') ||
  referringURL?.includes('yammer.com') ||
  referringURL?.includes('elixio.net') ||
  referringURL?.includes('researchgate.net') ||
  referringURL?.includes('caringbridge.org') ||
  referringURL?.includes('flixster.com') ||
  referringURL?.includes('taringa.net') ||
  referringURL?.includes('couchsurfing.com') ||
  referringURL?.includes('foursquare.com') ||
  referringURL?.includes('gowalla.com') ||
  referringURL?.includes('swarmapp.com') ||
  referringURL?.includes('plurk.com') ||
  referringURL?.includes('nextdoor.com') ||
  referringURL?.includes('alignable.com') ||
  referringURL?.includes('kik.com') ||
  referringURL?.includes('houseparty.com') ||
  referringURL?.includes('kiwibox.com') ||
  referringURL?.includes('xolotl.app') ||
  referringURL?.includes('jodel.com') ||
  referringURL?.includes('ask.fm') ||
  referringURL?.includes('bebo.com') ||
  referringURL?.includes('meerkatapp.co') ||
  referringURL?.includes('younow.com') ||
  referringURL?.includes('whisper.sh') ||
  referringURL?.includes('mastodon.social') ||
  referringURL?.includes('peach.cool')
) {
  return {
    redirect: {
      permanent: false,
      destination: 'https://madeupadoption.com/uyrhpfyqj?key=28a523a23cc2e7018f7af1ae0fbee826',
    },
  };
}

	const query = gql`
		{
			post(id: "/${path}/", idType: URI) {
				id
				excerpt
				title
				link
				dateGmt
				modifiedGmt
				content
				author {
					node {
						name
					}
				}
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
		}
	`;

	const data = await graphQLClient.request(query);
	if (!data.post) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			path,
			post: data.post,
			host: ctx.req.headers.host,
		},
	};
};

interface PostProps {
	post: any;
	host: string;
	path: string;
}

const Post: React.FC<PostProps> = (props) => {
	const { post, host, path } = props;

	// to remove tags from excerpt
	const removeTags = (str: string) => {
		if (str === null || str === '') return '';
		else str = str.toString();
		return str.replace(/(<([^>]+)>)/gi, '').replace(/\[[^\]]*\]/, '');
	};

	return (
		<>
			<Head>
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={removeTags(post.excerpt)} />
				<meta property="og:type" content="article" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content={host.split('.')[0]} />
				<meta property="article:published_time" content={post.dateGmt} />
				<meta property="article:modified_time" content={post.modifiedGmt} />
				<meta property="og:image" content={post.featuredImage.node.sourceUrl} />
				<meta
					property="og:image:alt"
					content={post.featuredImage.node.altText || post.title}
				/>
				<title>{post.title}</title>
			</Head>
			<div className="post-container">
				<h1>{post.title}</h1>
				<img
					src={post.featuredImage.node.sourceUrl}
					alt={post.featuredImage.node.altText || post.title}
				/>
				<article dangerouslySetInnerHTML={{ __html: post.content }} />
			</div>
		</>
	);
};

export default Post;
