import { useSession, signOut, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Parkingsutleie</title>
        <meta
          name="description"
          content="Leie / Utleie av egen parkeringsplass!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center">
        <div className="flex max-w-6xl flex-1 flex-col gap-4 p-2">
          <Navbar />
          {children}
        </div>
      </main>
    </>
  );
};

// Navbar at the top of the page with logo, links, and auth buttons styled with tailwind
const Navbar = () => {
  return (
    <nav className="flex">
      <div className="flex flex-grow items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          Parking Rental
        </Link>
        {/* vertically centered link */}
        <LinkButton href="/find">Finn parkering</LinkButton>
        <LinkButton href="/register">Registrer parkeringsplass</LinkButton>
      </div>
      <AuthShowcase />
    </nav>
  );
};

// Styled button link for navbar
const LinkButton = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="rounded-md bg-white/5 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
    >
      {children}
    </Link>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Layout;
