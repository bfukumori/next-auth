import { useContext } from "react"
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext"
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <h1>dashboard:{user?.email}</h1>

      <button onClick={signOut}>Sign-Out</button>
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  console.log(response.data)
  return {
    props: {}
  }
});