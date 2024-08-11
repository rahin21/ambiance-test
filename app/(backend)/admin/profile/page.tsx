import { getUserData } from "@/constants/admin/userData";
import Image from "next/image";
import React from "react";

async function Profile() {
  const user = await getUserData();
  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="md:w-[60%] w-full rounded-lg border border-stroke bg-black/25 shadow-default">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black text-center sm:text-title-xl2">
              Profile
            </h2>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={user[0].avatar}
                alt="user"
                width={150}
                height={150}
                className="rounded-full border-2 border-black"
              />
              <div className="text-xl mt-5 text-black">
                <div className="flex gap-4 ">
                  <h3 className="font-semibold">Name: </h3>
                  <p>{user[0].name}</p>
                </div>
                <div className="flex gap-4 ">
                  <h3 className="font-semibold">Email: </h3>
                  <p>{user[0].email}</p>
                </div>
                <div className="flex gap-4 ">
                  <h3 className="font-semibold">Phone: </h3>
                  <p>{user[0].phone}</p>
                </div>
                <div className="flex gap-4 ">
                  <h3 className="font-semibold">Role: </h3>
                  <p className="capitalize">{user[0].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
