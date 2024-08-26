import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import LoginForm from "@/components/loginForm";
import { getUserData } from "@/constants/admin/userData";

export const metadata: Metadata = {
  title: "Login",
};

async function Page() {
  const user = await getUserData();

  const session = await getServerSession(authOptions);
  if (user < 1) {
    redirect("/signup");
  }
  if (!session?.user) {
    return <LoginForm />;
  } else {
    redirect("/admin");
  }
}

export default Page;
