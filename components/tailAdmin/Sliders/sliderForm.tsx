"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { revalidateSlider } from "@/constants/revalidate/route";
import { ParamsType } from "@/types/types";
import { useRouter } from "next/navigation";
import { FaImage, FaImages } from "react-icons/fa";

const sliderSchema = z.object({
  key: z.string().min(2, "Key must be at least 2 characters long"),
  files: z
    .custom<FileList>((files) => files instanceof FileList)
    .refine((files) => files.length > 0, {
      message: "At least one file must be uploaded",
    }),
});

type SliderFormData = z.infer<typeof sliderSchema>;

function SliderForm({
  params,
  imgs,
  isUpdate,
}: {
  params: ParamsType;
  imgs: string[];
  isUpdate?: boolean;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SliderFormData>({
    resolver: zodResolver(sliderSchema),
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const key = params.key;
  const router = useRouter();

  const handleFileChange = (files: FileList) => {
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages(imageUrls);
  };

  const onSubmit = async (data: SliderFormData) => {
    const files = Array.from(data.files);

    try {
      const formData = new FormData();
      if (isUpdate) {
        files.forEach((file, index) => {
          formData.append(`file_${index}`, file);
          imgs.push(`/uploads/slider/${data.key}/${file.name}`);
        });

        await axios.put(`/api/slider/${key}`, {
          key: data.key,
          img: imgs,
        });
        revalidateSlider();
        formData.append("targetDIR", `slider/${data.key}`);

        const res = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error(await res.text());
        reset({
          key: "",
          files: undefined,
        });

        setSelectedImages([]);
        router.push("/admin/sliders");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const imgs: string[] = [];

        files.forEach((file, index) => {
          formData.append(`file_${index}`, file);
          imgs.push(`/uploads/slider/${data.key}/${file.name}`);
        });

        await axios.post(`/api/slider/`, {
          key: data.key,
          img: imgs,
        });
        revalidateSlider();
        formData.append("targetDIR", `slider/${data.key}`);

        const res = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(await res.text());

        reset({
          key: "",
          files: undefined,
        });

        setSelectedImages([]);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  async function deleteImages(location: string) {
    const index = imgs.indexOf(location);
    if (index > -1) {
      // only splice array when item is found
      imgs.splice(index, 1); // 2nd parameter means remove one item only
    }
    try {
      const res = await axios.put(`/api/slider/${key}`, {
        key: key,
        img: imgs,
      });
      await axios.delete(`/api/upload`, {
        data: { locations: [location] },
      });
      console.log("Response:", res.data);
      revalidateSlider();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSlider() {
    try {
      axios
        .delete(`/api/slider/${key}`)
        .then((response) => {
          console.log(`${response}`);
          revalidateSlider();
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .delete(`/api/delete-dir`, {
          data: { dir: `/uploads/slider/${key}` },
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
    router.push("/admin/sliders/");
  }

  return (
    <div>
      <h4 className="text-2xl font-semibold text-black">
        {isUpdate ? `Update` : `Add `} Slider
      </h4>
      {isUpdate && (
        <div className="border border-stroke bg-black/20 px-7.5 py-6 shadow-default mt-5">
          <div className="flex justify-between mb-5">
            <h1 className="text-2xl font-semibold text-black capitalize">
              {key} slider
            </h1>
          </div>
          <div className="flex gap-5 overflow-auto">
            {imgs.map((image: string) => (
              <div
                key={image}
                className="flex flex-col gap-3 justify-center items-center mb-3"
              >
                <div className="aspect-square w-40 inline-block overflow-hidden">
                  <Image
                    src={image}
                    alt="img-home"
                    width={1500}
                    height={1500}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isUpdate && (
                  <button
                    type="button"
                    onClick={() => deleteImages(image)}
                    className="flex rounded-md bg-rose-500 px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-sm border border-stroke shadow-default bg-black/20 p-5 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex items-end gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="key"
                className="mb-3 block text-base font-medium text-black"
              >
                Slider{" "}
              </label>
              <select
                {...register("key")}
                id="key"
                defaultValue={key || "home"}
                className="w-full rounded-lg bg-white border-[1.5px] text-lg border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              >
                <option value="home">Home</option>
                <option value="news">News</option>
                <option value="contact">Contact</option>
              </select>
              {errors.key && <p>{errors.key.message}</p>}
            </div>

            <div className="w-full md:max-w-fit">
              <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <div>
                    <label
                      htmlFor="sliders"
                      className="my-5 block text-base font-medium text-black">
                      Slider Image
                    </label>
                    <input
                      type="file"
                      id="sliders"
                      multiple
                      ref={fileInputRef}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        e.target.files && handleFileChange(e.target.files);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="sliders"
                      className="capitalize flex justify-center items-center gap-2 rounded-md bg-rose-500 px-6 py-2 font-medium text-white hover:bg-opacity-90 cursor-pointer text-sm md:text-base"
                    >
                      <FaImages /> Select images for Sliders
                    </label>
                  </div>
                )}
              />
              {errors.files && <p>{errors.files.message}</p>}
            </div>
          </div>

          {/* Display the selected images */}
          <div className="flex gap-5 ">
            {selectedImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={150}
                height={300}
                alt={`Selected ${index}`}
              />
            ))}
          </div>
          <div className="flex justify-end gap-5 mt-5">
            {isUpdate && (
              <button
                onClick={deleteSlider}
                className="capitalize flex rounded-md bg-rose-500 px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                Delete Slider
              </button>
            )}
            <button
              type="submit"
              className="rounded-md bg-black px-6 py-2  font-medium text-white hover:bg-opacity-90 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SliderForm;
