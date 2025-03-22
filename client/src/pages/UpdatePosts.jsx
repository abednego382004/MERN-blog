import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(false);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [UIformData, setUIFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  console.log(UIformData);

  const { postId } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        } else {
          setPublishError(null);
          setUIFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setimageUploadError("please select an image");
        return;
      }
      setimageUploadProgress(true);
      setimageUploadError(null);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/post/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setimageUploadError(data.error);
      }
      setimageUploadProgress(false);
      setUIFormData({ ...UIformData, Image: data.imageUrl });
    } catch (error) {
      setimageUploadError("image upload failed");
      setimageUploadProgress(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(UIformData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title request"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setUIFormData({ ...UIformData, title: e.target.value });
            }}
            value={UIformData.title}
          />
          <Select
            onChange={(e) =>
              setUIFormData({ ...UIformData, category: e.target.value })
            }
            value={UIformData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 borderteal-500 border-dotted p-3 ">
          <FileInput
            type="file"
            accept="/image*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            onClick={handleUploadImage}
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            {imageUploadProgress ? (
              <>
                <Spinner size="sm" className="mr-2" /> Uploading...
              </>
            ) : (
              "upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {UIformData.Image && (
          <img
            src={UIformData.Image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          value={UIformData.content}
          ref={quillRef}
          theme="snow"
          placeholder="Write Something"
          className="h-72 mb-12"
          onChange={(value) => {
            setUIFormData({ ...UIformData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
