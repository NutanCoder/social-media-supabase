import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";

interface PostInput {
  title: string;
  content: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .update(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-iamges")
    .getPublicUrl(filePath);
  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) throw new Error(error.message);
  return data;
};

function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({ post: { title, content }, imageFile: selectedFile });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image" className="block mb-2 font-medium">
          Upload Image:
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          className="w-full border border-white/10 bg-transparent rounded"
          required
          onChange={handleFileChange}
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
      {isError && <p className="text-red-500">Error Creating Post...</p>}
    </form>
  );
}

export default CreatePost;
