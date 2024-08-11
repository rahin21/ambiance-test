"use client";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { postType } from "@/types/types";
import { useRouter } from "next/navigation";
import { revalidatePost } from "@/constants/revalidate/route";
import { FaImage, FaImages } from "react-icons/fa6";

const sliderSchema = z.object({
  key: z.string().min(2, "key must be at least 2 characters long"),
  title: z.string().min(2, "title must be at least 2 characters long"),
  thumbnail: z.instanceof(File).refine((file) => file instanceof File, {
    message: "Exactly one file must be uploaded",
  }),

  gallery: z
    .custom<FileList>((files) => files instanceof FileList)
    .refine((files) => files.length > 0, {
      message: "At least one file must be uploaded",
    }),
});

type PostFormData = z.infer<typeof sliderSchema>;

function PostForm({ post }: { post?: postType }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PostFormData>({
    resolver: zodResolver(sliderSchema),
  });

  const [selectedImagesThumbnail, setSelectedImagesThumbnail] =
    useState<string>(post?.thumbnail || "");
  const [selectedImagesGallery, setSelectedImagesGallery] = useState<string[]>(
    post?.gallery || []
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleFileChangeThumbnail = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImagesThumbnail(imageUrl);
  };
  const handleFileChangeGallery = (files: FileList) => {
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    
    setSelectedImagesGallery(imageUrls);
  };

  const onSubmit = async (data: PostFormData) => {
    const filesThumbnail = data.thumbnail;
    const filesGallery = Array.from(data.gallery);

    try {
      const formData = new FormData();
      const gallery: string[] = [];

      formData.append(`file_0`, filesThumbnail);
      const thumbnail = `/uploads/post/${filesThumbnail.name}`;
      filesGallery.forEach((file, index) => {
        formData.append(`file_${index + 1}`, file);
        gallery.push(`/uploads/post/${file.name}`);
      });

      const res1 = await axios.post(`/api/post/`, {
        title: data.title,
        key: data.key,
        thumbnail: thumbnail,
        gallery: gallery,
      });
      revalidatePost();
      formData.append("targetDIR", "post");

      const res2 = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      console.log(res1);
      if (!res2.ok) throw new Error(await res2.text());

      reset({
        key: "",
        title: "",
        thumbnail: undefined,
        gallery: undefined,
      });

      setSelectedImagesGallery([]);
      setSelectedImagesThumbnail("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div>
      <h4 className="text-2xl font-semibold text-black mb-4">
        Add post information
      </h4>
      <div className="rounded-sm border border-stroke shadow-default bg-black/20 p-5 gap-5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="md:flex gap-5 mb-5">
            <div className="w-full">
              <label htmlFor="key" className="mb-3 block text-base font-medium text-black">Post</label>
              <select
                {...register("key")}
                id="key"
                defaultValue={post?.key|| "portfolio"}
                className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black text-lg outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              >
                <option value="portfolio">Portfolio</option>
              </select>
              {errors.key && <p>{errors.key.message}</p>}
            </div>
            <div className="w-full">
              <label htmlFor="title" className="mb-3 block text-base font-medium text-black">Title</label>
            <input
              {...register("title")}
              id="title"
              defaultValue={post?.title}
              type="text"
              placeholder="Title"
              className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            />
            {errors.title && <p>{errors.title.message}</p>}
            </div>
          </div>
          <div className="md:flex gap-5">
            <>
              <div className="border-2 flex flex-col items-center p-3 h-[18rem] md:mb-0 mb-5 border-black/40 w-full">
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        type="file"
                        id="thumbnail"
                        onChange={(e) => {
                          const file = e.target.files
                            ? e.target.files[0]
                            : null;
                          field.onChange(file);
                          file && handleFileChangeThumbnail(file);
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="thumbnail"
                        className="capitalize flex justify-center lg:text-base text-xs items-center gap-2 rounded-md bg-rose-500 px-6 py-2 font-medium text-white hover:bg-opacity-90 cursor-pointer "
                      >
                        <FaImage /> Select thumbnail image
                      </label>
                    </div>
                  )}
                />
                {errors.thumbnail && <p>{errors.thumbnail.message}</p>}

                {/* Display the selected thumbnail images */}
                <div className="flex flex-wrap gap-5 my-3">
                  {selectedImagesThumbnail.length > 0 ? (
                    <Image
                      src={selectedImagesThumbnail}
                      width={150}
                      height={300}
                      alt={`Selected image`}
                    />
                  ) : (
                    <div className="text-center flex justify-center items-center gap-3">
                      <FaImage />
                      <p>No Image Selected</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-2 flex flex-col items-center p-3 h-[18rem] overflow-auto border-black/40 w-full">
                <Controller
                  name="gallery"
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
                          e.target.files &&
                            handleFileChangeGallery(e.target.files);
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="gallery"
                        className="capitalize flex justify-center lg:text-base text-xs items-center gap-2 rounded-md bg-rose-500 px-6 py-2 font-medium text-white hover:bg-opacity-90 cursor-pointer"
                      >
                        <FaImages /> Select gallery images
                      </label>
                    </div>
                  )}
                />
                {errors.gallery && <p>{errors.gallery.message}</p>}

                {/* Display the selected gallery images */}
                
                <div className="flex flex-wrap justify-center gap-5 my-3">
                  {selectedImagesGallery.length > 0 ? (
                    selectedImagesGallery.map((img, index) => (
                      <div
                        key={img}
                        className="flex flex-col aspect-square overflow-hidden items-center gap-3"
                      >
                        <Image
                          src={img}
                          width={150}
                          height={300}
                          alt={`Selected ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center flex justify-center items-center gap-3">
                      <FaImage />
                      <p>No Image Selected</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          </div>
          <div className="flex justify-end gap-5 mt-5">
            <button
              type="submit"
              className="rounded-md bg-black px-6 py-2  font-medium text-white hover:bg-opacity-90 "
              disabled={isSubmitting || !isDirty}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
