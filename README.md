# gatsby-source-product-markdown

A Gatsby source plugin for [product markdown](https://github.com/escaladesports/product-markdown-spec) files.

## Install

With npm:

```bash
npm install --save gatsby-source-product-markdown
```

With Yarn:

```bash
yarn add gatsby-source-product-markdown
```

## Implement

Basic usage:

```javascript
// ./gatsby-config.js
module.exports = {
	plugins: [
		'gatsby-source-product-markdown'
	]
}
```

With custom options:

```javascript
// ./gatsby-config.js
module.exports = {
	plugins: [
		{
			resolve: 'gatsby-source-product-markdown',
			options: {
				path: './src/markdown/products/**/*.md'
			}
		}
	]
}
```

## Usage

```javascript
export const pageQuery = graphql`
	query ProductById($id: String!) {
		productMarkdown(productId: { eq: $id }){
			id
			name
		}
	}
`
```

## Notes

- Product variants will be automatically unpacked.
- When querying your data, the `id` property will be changed to `productId` to differentiate between the product ID that's in your markdown file and the ID that GraphQL uses.