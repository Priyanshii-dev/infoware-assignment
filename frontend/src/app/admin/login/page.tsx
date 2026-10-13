import { AuthForm } from "@/features/auth/components/AuthForm";

export default function AdminLoginPage() {
  return <AuthForm redirectTo="/admin" loginOnly />;
}
