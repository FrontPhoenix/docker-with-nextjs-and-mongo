import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");

  const getUserInfo = async () => {
    await fetch("/api/getprofile", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: any) => {
        setName(data.data.name);
        setLastName(data.data.lastName);
        setJob(data.data.job);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleEditUser = async () => {
    await fetch("/api/updateprofile", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastName,
        job,
      }),
    }).then(() => {
      getUserInfo();
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input value={job} onChange={(e) => setJob(e.target.value)} />
        <button onClick={handleEditUser}>Edit</button>
      </main>
    </>
  );
}
