export default function Home() {
  return "home";
}
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/token-kit",
      permanent: true,
    },
  };
}
