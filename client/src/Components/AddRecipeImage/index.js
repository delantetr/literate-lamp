import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from  '../../utils/auth'
import { UPDATE_RECIPE_IMAGE } from '../../utils/mutations'; // Import your mutation

function RecipeImageUpload({ recipeId }) {
  const [image, setImage] = useState(null);
  const [updateRecipeImage] = useMutation(UPDATE_RECIPE_IMAGE, {context: { headers: {Authorization: `Bearer ${Auth.getToken()}` }}});

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (image) {
      console.log('Uploaded image:', image); // Log the uploaded image
      
      console.log('Mutation variables:', {
        updateRecipeImageId: recipeId,
        image: image,
      });
      try {

        await updateRecipeImage({
          variables: {
            updateRecipeImageId: recipeId,
            image: image
          }
        });

        // Successfully updated image
        console.log('Image uploaded successfully');
      } catch (error) {
        // Handle error
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No image selected');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
}

export default RecipeImageUpload;
