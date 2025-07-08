/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const { isAuthenticated, connectedUser, isInitialized, isLoading } =
    useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push("/signin");
    }
  });
  if (!isInitialized) {
    return null;
  }
  if (isLoading) {
    return null;
  }

  return (
    <section>
      <h1>Dashboard</h1>
    </section>
  );
}
