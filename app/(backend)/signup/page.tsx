import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/tailAdmin/signupForm";
import { getUserData } from "@/constants/admin/userData";
import { revalidateUser } from "@/constants/revalidate/route";

export const metadata: Metadata = {
  title: "Sign Up",
};

async function Page() {
  const user = await getUserData();

  if (user && user.length > 0) {
    redirect("/signin");
  } else {
    return (
      <div>
        <SignUpForm />
      </div>
    );
  }
}

export default Page;
