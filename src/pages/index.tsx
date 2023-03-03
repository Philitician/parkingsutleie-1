import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <h1>Velkommen! Her er det enkelt å leie parkeringsplass!</h1>
    </>
  );
};

export default Home;
