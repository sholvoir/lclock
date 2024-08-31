import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>YourClock</title>
        <link rel="icon" type="image/png" sizes="192x192" href="/icon/tj-192.png"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/tj.svg"/>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="apple-touch-startup-image" href="/icon/icon-1024.png"/>
        <meta name="apple-mobile-web-app-title" content="MemWord"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="theme-color" content="#CBD5E1" media="(prefers-color-scheme: light)"/>
        <meta name="theme-color" content="#0F172A" media="(prefers-color-scheme: dark)"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+KR:wght@100..900&family=Noto+Sans+SC:wght@100..900&family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"/>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
