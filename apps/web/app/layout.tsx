import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Niagara Auto Finder - Get Pre-Approved for Your Next Car',
  description: 'Get pre-approved for financing without a hard credit pull. Find your next car with flexible payment options.',
  openGraph: {
    title: 'Niagara Auto Finder - Get Pre-Approved for Your Next Car',
    description: 'Get pre-approved for financing without a hard credit pull. Find your next car with flexible payment options.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            color: #1f2937;
            background-color: #ffffff;
          }
          
          body {
            line-height: 1.6;
          }
          
          a {
            color: #2563eb;
            text-decoration: none;
          }
          
          a:hover {
            text-decoration: underline;
          }
          
          button {
            cursor: pointer;
            font-family: inherit;
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.2s;
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          input, select, textarea {
            font-family: inherit;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            font-size: 1rem;
          }
          
          input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #374151;
          }
          
          fieldset {
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          legend {
            padding: 0 0.5rem;
            font-weight: 600;
            color: #1f2937;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          .hero {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            color: white;
            padding: 4rem 1rem;
            text-align: center;
            margin-bottom: 3rem;
          }
          
          .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          
          .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
          }
          
          .grid {
            display: grid;
            gap: 2rem;
            margin: 2rem 0;
          }
          
          .grid-2 {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          
          .grid-3 {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .card {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1.5rem;
            background: #f9fafb;
            transition: all 0.2s;
          }
          
          .card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transform: translateY(-2px);
          }
          
          .card h3 {
            margin-bottom: 0.5rem;
            color: #1f2937;
          }
          
          .card p {
            color: #6b7280;
            font-size: 0.95rem;
          }
          
          .stat {
            text-align: center;
            padding: 1.5rem;
          }
          
          .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 0.5rem;
          }
          
          .stat-label {
            color: #6b7280;
            font-size: 0.95rem;
          }
          
          .testimonial {
            border-left: 4px solid #2563eb;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
          }
          
          .testimonial-text {
            font-style: italic;
            color: #374151;
            margin-bottom: 0.5rem;
          }
          
          .testimonial-author {
            font-weight: 600;
            color: #1f2937;
            font-size: 0.9rem;
          }
          
          .cta-button {
            background-color: #10b981;
            color: white;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 0.5rem;
            display: inline-block;
            margin-top: 1rem;
          }
          
          .cta-button:hover {
            background-color: #059669;
            text-decoration: none;
          }
          
          .primary-button {
            background-color: #2563eb;
            color: white;
          }
          
          .primary-button:hover {
            background-color: #1d4ed8;
          }
          
          .secondary-button {
            background-color: #e5e7eb;
            color: #1f2937;
          }
          
          .secondary-button:hover {
            background-color: #d1d5db;
          }
          
          header {
            background-color: #ffffff;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }
          
          header nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          header h1 {
            font-size: 1.5rem;
            color: #2563eb;
            margin: 0;
          }
          
          header a {
            margin-left: 2rem;
            color: #6b7280;
            font-weight: 500;
          }
          
          header a:hover {
            color: #2563eb;
          }
          
          footer {
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            padding: 2rem 1rem;
            margin-top: 4rem;
            text-align: center;
            color: #6b7280;
            font-size: 0.9rem;
          }
          
          .form-group {
            margin-bottom: 1.5rem;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
          }
          
          .checkbox-group input {
            margin-top: 0.25rem;
            width: auto;
          }
          
          .checkbox-group label {
            margin-bottom: 0;
          }
          
          .trust-badges {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
            flex-wrap: wrap;
          }
          
          .badge {
            text-align: center;
            font-size: 0.85rem;
            color: #6b7280;
          }
          
          .badge-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

