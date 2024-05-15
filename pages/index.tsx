import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Form from "../components/form";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <Head>
        <title>Test Frontend</title>
        <meta name="description" content="Test Frontend App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    </>
  );
}
