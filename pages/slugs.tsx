import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ListForm from "../components/listForm";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function Slug() {
  return (
    <>
      <Head>
        <title>Test Frontend</title>
        <meta name="description" content="Test Frontend App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ListForm />
      </QueryClientProvider>
    </>
  );
}
