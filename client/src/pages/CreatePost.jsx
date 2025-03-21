import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(false);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [UIformData, setUIFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  console.log("UIformData", UIformData);

  const quillRef = useRef(null);
  const navigate = useNavigate();

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

      const res = await fetch("api/post/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setimageUploadError(data.error);
      }
      setimageUploadProgress(false);
      setUIFormData({ ...UIformData, image: data.imageUrl });
    } catch (error) {
      setimageUploadError("image upload failed");
      setimageUploadProgress(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UIformData),
      });
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
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
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
          />
          <Select
            onChange={(e) =>
              setUIFormData({ ...UIformData, category: e.target.value })
            }
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
        {UIformData.image && (
          <img
            src={UIformData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Write Something"
          className="h-72 mb-12"
          onChange={(value) => {
            setUIFormData({ ...UIformData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
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
