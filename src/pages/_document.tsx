// document.tsx is a special file in Next.js that allows you to customize the <html> and <body> tags.

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-slate-800 text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
