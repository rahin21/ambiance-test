
import DefaultLayout from "@/components/tailAdmin/Layouts/DefautlLayout";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin - Ambiance",
    template: "%s - Ambiance",
  },
  description: "Generated by create next app",
};

export default async function BackendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(session?.user){
  return (
    <html lang="en">
        <body>
      <DefaultLayout>
          {children}
      </DefaultLayout>
          </body>
    </html>
  );}
  else{
    redirect('/signin')
  }
}
