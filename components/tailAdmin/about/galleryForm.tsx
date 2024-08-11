"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { revalidateGallery } from "@/constants/revalidate/route";
import { ParamsType } from "@/types/types";
import { useRouter } from "next/navigation";
import { FaImage, FaImages } from "react-icons/fa";

const gallerySchema = z.object({
  files: z
    .custom<FileList>((files) => files instanceof FileList)
    .refine((files) => files.length > 0, {
      message: "At least one file must be uploaded",
    }),
});

type galleryFormData = z.infer<typeof gallerySchema>;

function GalleryForm({
  gallery,
  isUpdate,
}: {
  gallery?: { id: string; imgs: string[] };
  isUpdate?: boolean;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<galleryFormData>({
    resolver: zodResolver(gallerySchema),
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFileChange = (files: FileList) => {
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages(imageUrls);
  };

  const onSubmit = async (data: galleryFormData) => {
    const files = Array.from(data.files);

    try {
      const formData = new FormData();
      if (isUpdate) {
        files.forEach((file, index) => {
          formData.append(`file_${index}`, file);
          gallery?.imgs.push(`/uploads/about/gallery/${file.name}`);
        });

        await axios.put(`/api/gallery/${gallery?.id}`, {
          imgs: gallery?.imgs,
        });
        revalidateGallery();
        formData.append("targetDIR", `about/gallery`);

        const res = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error(await res.text());
        reset({
          files: undefined,
        });

        setSelectedImages([]);
        router.push("/admin/about");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const imgs: string[] = [];

        files.forEach((file, index) => {
          formData.append(`file_${index}`, file);
          imgs.push(`/uploads/about/gallery/${file.name}`);
        });

        await axios.post(`/api/gallery/`, {
          imgs: imgs,
        });
        revalidateGallery();
        formData.append("targetDIR", `about/gallery`);

        const res = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(await res.text());

        reset({
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
    const index = gallery?.imgs.indexOf(location) || 0;
    if (index > -1) {
      // only splice array when item is found
      gallery?.imgs.splice(index, 1); // 2nd parameter means remove one item only
    }
    try {
      // console.log(gallery, location);
      const res = await axios.put(`/api/gallery/${gallery?.id}`, {
        imgs: gallery?.imgs,
      });
      await axios.delete(`/api/upload`, {
        data: { locations: [location] },
      });
      console.log("Response:", res.data);
      revalidateGallery();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteGallery() {
    try {
      axios
        .delete(`/api/upload`, {
          data: { locations: gallery?.imgs },
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .delete(`/api/gallery/${gallery?.id}`)
        .then((response) => {
          console.log(`${response}`);
          revalidateGallery();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
    router.push("/admin/about/");
  }

  return (
    <div>
      <h4 className="text-2xl font-semibold text-black mt-5">
        {isUpdate ? `Update` : `Add `} Gallery
      </h4>
      {isUpdate && (
        <div className="border border-stroke bg-black/20 px-7.5 py-6 shadow-default mt-5 overflow-auto">
          <div className="flex justify-between mb-5">
            <h1 className="text-2xl font-semibold text-black capitalize">
              Gallery Images
            </h1>
          </div>
          <div className="flex gap-5">
            {gallery?.imgs.map((image: string) => (
              <div
                key={image}
                className="flex flex-col gap-3 justify-center items-center"
              >
                <Image src={image} alt="img-home" width={150} height={150} />
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
            <div className="border-2 flex flex-col items-center p-3 min-h-[15.3rem] md:mb-0 mb-5 border-black/40 w-full">
              <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      type="file"
                      id="gallery"
                      multiple
                      ref={fileInputRef}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        e.target.files && handleFileChange(e.target.files);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="gallery"
                      className="capitalize flex justify-center items-center gap-2 rounded-md bg-rose-500 px-6 py-2 font-medium text-white hover:bg-opacity-90 cursor-pointer text-sm md:text-base"
                    >
                      <FaImages /> Select Gallery Images
                    </label>
                  </div>
                )}
              />
              {errors.files && <p>{errors.files.message}</p>}
              {/* Display the selected images */}
              {selectedImages.length > 0 ? (
                <div className="flex flex-wrap gap-5 mt-5 h-[20rem] overflow-auto">
                  {selectedImages.map((img, index) => (
                    <div key={index} className="aspect-square lg:w-[23%] w-auto inline-block overflow-hidden">    
                      <Image
                        src={img}
                        width={150}
                        height={300}
                        className="w-full h-full object-cover"
                        alt={`Selected ${index}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center flex justify-center items-center gap-3 mt-5">
                  <FaImage />
                  <p>No Image Selected</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-5 mt-5">
            {isUpdate && (
              <button
                onClick={deleteGallery}
                className="capitalize flex rounded-md bg-rose-500 px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                Delete Gallery
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

export default GalleryForm;
