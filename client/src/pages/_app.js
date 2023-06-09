import MainLayout from "@/components/layout/MainLayout";
import { Web3Provider } from "@/web3/Web3Provider";
import "../styles/globals.css";
export default function App({ Component, pageProps }) {
  //to make method labels from abi method name(camel case to sentence)
  // String.prototype.toSentence = function () {
  //   function camelToSentence(camelCase) {
  //     return camelCase
  //       .replace(/([A-Z])/g, " $1")
  //       .split(" ")
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(" ");
  //   }
  //   return camelToSentence(this);
  // };
  return (
    <Web3Provider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Web3Provider>
    // <DrizzleProvider>
    //   <Component {...pageProps} />
    // </DrizzleProvider>
  );
}
