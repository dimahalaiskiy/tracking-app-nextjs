import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const HEALTH_CHECK = gql`
  query HealthCheck {
    healthCheck { username }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export function useAuth() {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(HEALTH_CHECK, { fetchPolicy: "network-only" });
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const logout = async () => {
    await logoutMutation({ context: { fetchOptions: { credentials: "include" } } });
    router.replace("/login");
  };

  // If not logged in, redirect
  if (!loading && (!data?.healthCheck?.username || error)) {
    router.replace("/login");
  }

  return {
    user: data?.healthCheck,
    loading,
    logout,
    refetch,
  };
} 