import React, { useState } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../supabaseClient';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'

function CreatePost() {
  const [file, setFile] = useState(null); // Store selected file
  const [imageUrl, setImageUrl] = useState(null); // Store uploaded image URL
  const [formData, setFormData] = useState({}); // Store form data
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isUploading, setIsUploading] = useState(false); // Disable button during upload
  const [publishError , setPublishError] = useState(null)

  const navigate = useNavigate()


  // IMAGE UPLOAD FUNCTIONALITY VERY IMPORTANT 
  const handleUploadImage = async () => {
    try {
      if (!file) {
        console.error('Please select an image');
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;
      setIsUploading(true); // Disable the button
      setUploadProgress(0); // Reset progress

      // Simulate progress manually, since Supabase doesn't support real-time progress updates
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval); // Stop simulating progress
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload the file to Supabase
      const { data, error: uploadError } = await supabase.storage
        .from('Images') // Your bucket name
        .upload(fileName, file);

      clearInterval(interval); // Ensure simulation stops on completion
      setUploadProgress(100); // Complete progress

      if (uploadError) {
        console.error('Image upload failed:', uploadError.message);
        setUploadProgress(0); // Reset progress on error
        setIsUploading(false); // Enable button
        return;
      }

      console.log('Image uploaded successfully:', data);

      // Generate the public URL for the uploaded image
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from('Images')
        .getPublicUrl(fileName); // Use 'fileName' directly since it's stored in the root of the bucket

      if (urlError) {
        console.error('Failed to generate public URL:', urlError.message);
        setIsUploading(false); // Enable button
        return;
      }

      console.log('Public URL:', publicUrlData.publicUrl); // Log the correct public URL

      // Set the public URL in the state to display the image
      setImageUrl(publicUrlData.publicUrl);
      setFormData({ ...formData, image: publicUrlData.publicUrl }); // Add image URL to form data
    } catch (error) {
      console.error('Unexpected Error:', error.message);
    } finally {
      setIsUploading(false); // Re-enable the button after upload
    }
  };

  const handlePublishAllData = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/post/create',{
        method:'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();

      if(!res.ok) {
        setPublishError(data.message)
        return
      }

      if(res.ok) {
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something Went Wrong')
    }
  }








  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handlePublishAllData}>
        {/* Title and Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type="text" placeholder="Title" required id="title" className="flex-1" onChange={(e) => setFormData({...formData, title:e.target.value})}/>
          <Select onChange={(e) => setFormData({...formData, category:e.target.value})}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React Js</option>
          </Select>
        </div>

        {/* File Upload Section */}
        <div className="flex gap-4 flex-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={isUploading} // Disable input during upload
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={isUploading} // Disable button during upload
          >
            {isUploading ? (
              <div style={{ width: 50, height: 50 }}>
                {isUploading && (
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${uploadProgress}%`}
                  />
                )}
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {/* Display Uploaded Image */}
       

        {/* Display the Image in FormData */}
        {formData.image && (
          <div className="my-4">
            <p></p>
            <img src={formData.image} alt="Uploaded" className="w-full h-72 object-cover" />
          </div>
        )}

        {/* Rich Text Editor */}
        <ReactQuill theme="snow" placeholder="Write Something..." className="h-72 mb-12" required 
        onChange={(value) => {
          setFormData({...formData, content:value});
        }}
        />

        {/* Publish Button */}
        <Button type="submit" gradientDuoTone="purpleToPink" outline className='mb-12
        '>
          Publish
        </Button>
        {
          publishError && <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        }
      </form>
    </div>
  );
}

export default CreatePost;
