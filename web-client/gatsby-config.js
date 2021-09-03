module.exports = {
  siteMetadata: {
    siteUrl: 'https://thewatsonwedding.com',
    title: 'The Watson Wedding',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'www.thewatsonwedding.com',
        region: 'us-east-1', // Required for Lambda@Edge to function
      },
    },
  ],
};
