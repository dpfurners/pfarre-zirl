import useAuth from "../hooks/useAuth.tsx";

const Home = () => {
  const { auth } = useAuth();

  return (
    <section>
      <h1>Home</h1>
      <br />
      {auth.username ? (
        <p>You are logged in as {auth.roles}!</p>
      ) : (
        <p>You are not logged in!</p>
      )}
      <br />
    </section>
  );
};

export default Home;
