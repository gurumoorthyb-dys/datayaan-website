import { marked } from 'marked';

/**
 * Process Strapi rich text content to ensure proper HTML structure
 * Uses 'marked' to parse Markdown into HTML
 */
export function processRichText(htmlContent: string): string {
    if (!htmlContent) return '';

    // If the content already has HTML tags (like from CKEditor), return as is
    // But be careful, sometimes Markdown can contain HTML. 
    // If it starts with <p>, <ul>, <ol>, <div>, it's likely HTML.
    if (htmlContent.trim().match(/^<(p|ul|ol|div|h[1-6]|blockquote)/)) {
        return htmlContent;
    }

    try {
        // Configure marked options if needed
        // breaks: true converts single line breaks to <br>
        return marked.parse(htmlContent, { breaks: true }) as string;
    } catch (error) {
        console.error("Error parsing markdown:", error);
        return htmlContent;
    }
}
