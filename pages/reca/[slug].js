// pages/reca/[slug].js

import fs from 'fs';
import path from 'path';

const ProductPage = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export async function getStaticPaths() {
    // Return an empty array for infinite slugs
    return {
        paths: [],
        fallback: 'blocking' // Set fallback to 'blocking' to pre-render pages on demand
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'public', `reca.html`);

    try {
        // Read the HTML file from the public directory
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        return {
            props: {
                htmlContent
            }
        };
    } catch (err) {
        console.error('Error reading HTML file:', err);
        return {
            notFound: true // Return a 404 page if the HTML file is not found
        };
    }
}

export default ProductPage;
