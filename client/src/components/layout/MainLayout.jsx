import Head from "next/head";
import Link from "next/link";
import styles from "./style.module.scss";
import { BsLinkedin, BsGithub, BsTelegram, BsMedium } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>WeiKit</title>
      </Head>
      <header className={styles["header"]}>
        <div className={styles["header-data"]}>
          <h1 className={styles["title"]}>WeiKit</h1>
          <nav className={styles["nav-bar"]}>
            <div className={styles["nav-link-box"]}>
              <Link className={styles["nav-link"]} href={"/token-kit"}>
                Token Kit
              </Link>
            </div>
            <div className={styles["nav-link-box"]}>
              <Link className={styles["nav-link"]} href={"/create-token"}>
                Create Token
              </Link>
            </div>
          </nav>
        </div>
        <div className={styles["nav-controllers"]}>
          <div className={styles["nav-controller"]}>Connect Wallet</div>
        </div>
      </header>
      <main className={styles["main"]}>{children}</main>
      <footer className={styles["footer"]}>
        <div className={styles["footer-nav-box"]}>
          <h2 className={styles["footer-nav-title"]}>WeiKit</h2>

          <div className={styles["footer-nav"]}>
            <Link className={styles["footer-nav-link"]} href={"/create-token"}>
              Create Token
            </Link>
            <Link className={styles["footer-nav-link"]} href={"/token-kit"}>
              Token Kit
            </Link>
          </div>
        </div>
        <div className={styles["footer-social"]}>
          <h3 className={styles["footer-social-title"]}>
            Developed by <br /> Soroush Jaberi
          </h3>
          <div className={styles["footer-social-items"]}>
            <div className={styles["footer-social-items-item"]}>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/in/soroosh-jaberi/"}
              >
                <BsLinkedin />
              </Link>
            </div>
            <div className={styles["footer-social-items-item"]}>
              <Link target="_blank" href={"https://github.com/sorooshjaberi/"}>
                <BsGithub />
              </Link>
            </div>
            <div className={styles["footer-social-items-item"]}>
              <Link target="_blank" href={"https://t.me/soroushjb"}>
                <BsTelegram />
              </Link>
            </div>
            <div className={styles["footer-social-items-item"]}>
              <Link target="_blank" href={"https://medium.com/@sorooshjaberi"}>
                <BsMedium />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default MainLayout;
