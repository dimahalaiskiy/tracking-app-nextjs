"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      message
      username
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await login({ variables: { username, password } });
      if (data?.login?.message === "Logged in") {
        router.push("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white font-sans">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-2">
          <span className="text-3xl font-extrabold text-black select-none">⏱️</span>
        </div>
        <span className="text-3xl font-extrabold tracking-tight text-black">Tracker</span>
      </div>
      <form onSubmit={handleLogin} className="bg-white border border-black/10 shadow-lg p-10 rounded-2xl w-96 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2 text-center text-black tracking-tight">Sign in to your account</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-black/20 p-3 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all text-base shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-black/20 p-3 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all text-base shadow-sm"
            required
          />
        </div>
        {error && <div className="text-black text-sm border border-red-400 bg-white p-2 rounded-lg text-center">{error}</div>}
        <button type="submit" className="border border-black text-black py-3 rounded-lg bg-white hover:bg-black hover:text-white transition-colors font-semibold text-base shadow-sm mt-2" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
