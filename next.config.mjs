/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	rewrites: () => [
		{		
			source: "/api/:path*",
			destination: "/:path*",
		}, 
	],
	env: {
		NEXT_PUBLIC_GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
	},
	output: "standalone",
	reactStrictMode: false,
  };
  
  export default nextConfig;
  