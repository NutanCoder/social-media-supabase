import CreatePost from "../components/createPost";

function CreatePostPage() {
  return (
    <div className="pt-5">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create Post Page
      </h2>
      <CreatePost />
    </div>
  );
}

export default CreatePostPage;
