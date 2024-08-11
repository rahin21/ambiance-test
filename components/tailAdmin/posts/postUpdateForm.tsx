"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { aboutType, postType } from "@/types/types";
import { useRouter } from "next/navigation";
import { revalidatePost } from "@/constants/revalidate/route";
import { FaImage, FaImages } from "react-icons/fa6";

const sliderSchema = z.object({
  key: z.string().min(2, "key must be at least 2 characters long"),
  title: z.string().min(2, "title must be at least 2 characters long"),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "Exactly one file must be uploaded",
    })
    .optional(),

  gallery: z
    .custom<FileList>((files) => files instanceof FileList)
    .refine((files) => files.length > 0, {
      message: "At least one file must be uploaded",
    })
    .optional(),
});

type PostUpdateFormData = z.infer<typeof sliderSchema>;

function PostUpdateForm({
  post,
  isUpdate,
}: {
  post?: postType;
  isUpdate?: boolean;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PostUpdateFormData>({
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
    setSelectedImagesGallery([...selectedImagesGallery, ...imageUrls]);
  };

  const onSubmit = async (data: PostUpdateFormData) => {
    const filesThumbnail = data.thumbnail;
    const filesGallery = data.gallery ? Array.from(data.gallery) : [];

    try {
      const formData = new FormData();
      const gallery: string[] = post?.gallery || [];
      let thumbnail = post?.thumbnail;

      if (filesThumbnail) {
        thumbnail = `/uploads/post/${filesThumbnail.name}`;
        formData.append(`file_0`, filesThumbnail || "");
        await axios.delete(`/api/upload`, {
          data: { locations: [post?.thumbnail] },
        });
      }
      filesGallery.map((file, index) => {
        if (file) {
          formData.append(`file_${index}`, file);
          gallery.push(`/uploads/post/${file.name}`);
        }
      });

      const res1 = await axios.put(`/api/post/${post?.id}`, {
        gallery: gallery,
        title: data.title,
        key: data.key,
        thumbnail: thumbnail,
      });
      revalidatePost();
      formData.append("targetDIR", "post");
      if (filesThumbnail) {
        const res = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });
        console.log(res1);
        if (!res.ok) throw new Error(await res.text());
      }
      reset({
        key: "",
        title: "",
        gallery: undefined,
        thumbnail: undefined,
      });

      setSelectedImagesGallery([]);
      setSelectedImagesThumbnail("");
      router.push("/admin/posts");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  async function deletePost() {
    try {
      await axios.delete(`/api/post/${post?.id}`).catch((error) => {
        console.error(error);
      });
      await axios.delete(`/api/upload`, {
        data: { locations: [post?.thumbnail, ...(post?.gallery || [])] },
      });
      revalidatePost();
    } catch (error) {
      console.log(error);
    }
    router.push("/admin/posts/");
  }

  async function deleteImages(location: string) {
    if (!post || !post.gallery) {
      console.error("Post or gallery is undefined");
      return;
    }

    const index = selectedImagesGallery.indexOf(location);
    if (index > -1) {
      selectedImagesGallery.splice(index, 1);
    }
    console.log(selectedImagesGallery);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    try {
      const res = await axios.put(`/api/post/${post.id}`, {
        title: post.title,
        key: post.key,
        thumbnail: post.thumbnail,
        gallery: selectedImagesGallery,
      });
      await axios.delete(`/api/upload`, {
        data: { locations: [location] },
      });
      // console.log("Response:", res.data);
    } catch (error) {
      console.log(error);
    }

    revalidatePost();
  }

  return (
    <div>
      <h4 className="text-2xl font-semibold text-black mb-4">
        Update post information
      </h4>
      <div className="rounded-sm border border-stroke shadow-default bg-black/20 p-5 gap-5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-5 mb-5">
            <div className="w-full">
              <label
                htmlFor="key"
                className="mb-3 block text-base font-medium text-black"
              >
                Post
              </label>
              <select
                {...register("key")}
                id="key"
                defaultValue={post?.key || "portfolio"}
                className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black text-lg outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              >
                <option value="portfolio">Portfolio</option>
              </select>
              {errors.key && <p>{errors.key.message}</p>}
            </div>
            <div className="w-full">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-black"
              >
                Title
              </label>
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
          <div className="lg:flex gap-5">
            <>
              <div className="border-2 flex flex-col items-center p-3 min-h-[15.3rem] border-black/40 w-full lg:mb-0 mb-5">
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
                        className="capitalize flex justify-center items-center gap-2 rounded-md lg:text-base text-xs bg-rose-500 px-6 py-2 font-medium text-white hover:bg-opacity-90 cursor-pointer "
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
                      width={250}
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
                        className="capitalize flex justify-center items-center gap-2 rounded-md bg-rose-500 px-6 py-2 lg:text-base text-xs font-medium text-white hover:bg-opacity-90 cursor-pointer"
                      >
                        <FaImages /> Select gallery images
                      </label>
                    </div>
                  )}
                />
                {errors.gallery && <p>{errors.gallery.message}</p>}

                {/* Display the selected gallery images */}
                <div className="flex flex-wrap gap-5 my-3">
                  {selectedImagesGallery.length > 0 ? (
                    selectedImagesGallery.map((img, index) => (
                      <div
                        key={img}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="aspect-square w-[10rem] overflow-hidden">
                          <Image
                            src={img}
                            width={150}
                            height={300}
                            alt={`Selected ${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteImages(img)}
                          className="flex rounded-md bg-rose-500 px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
                        >
                          Delete
                        </button>
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
              onClick={deletePost}
              className="capitalize flex rounded-md bg-rose-500 px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
            >
              Delete post
            </button>

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

export default PostUpdateForm;
