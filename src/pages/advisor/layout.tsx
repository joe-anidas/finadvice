import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Groq Chat App</title>
        <meta name="description" content="A fast AI chat experience" />
      </Head>
      <div>{children}</div>
    </>
  );
}
