import '@app/globals.css';
import { ibm_plex_sans} from '@app/fonts';

export const metadata = {
  title: "App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ibm_plex_sans.className}>{children}</body>
    </html>
  );
}
