"use client";
import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js'; // Import Tesseract

export default function NewListing() {
    const [imageURL, setImageURL] = useState(null);
    const [extractedText, setExtractedText] = useState(''); // Initialize as an empty string
    const [username, setUsername] = useState('Username'); // State for username
    const [circleColor, setCircleColor] = useState('bg-gray-400'); // State for circle color
    const [isAnonymous, setIsAnonymous] = useState(false); // State to track anonymous mode
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageURL(e.target.result);
                extractTextFromImage(e.target.result); // Extract text after image is loaded
            };
            reader.readAsDataURL(file);
        }
    };

    const extractTextFromImage = async (imageDataURL) => {
        try {
            const { data: { text } } = await Tesseract.recognize(imageDataURL, 'eng');
            setExtractedText(text.trim()); // Set extracted text, trim to remove any leading/trailing whitespace
        } catch (error) {
            console.error('Error during text extraction:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleTitleChange = (event) => {
        setExtractedText(event.target.value); // Update the extractedText (which is also the title value) when the user types
    };

    const toggleAnonymous = () => {
        if (isAnonymous) {
            // Revert back to original profile
            setUsername('Username');
            setCircleColor('bg-gray-400');
        } else {
            // Switch to anonymous profile
            setUsername('Anonymous');
            setCircleColor('bg-black');
        }
        setIsAnonymous(!isAnonymous); // Toggle the anonymous state
    };

    const postToMarketplace = () => {
        const listingData = {
            title: extractedText, // Title from OCR or manual input
            price: price, // Price input by the user
            description: description, // Description input by the user
            imageURL: imageURL, // The data URL of the uploaded image
            username: isAnonymous ? 'Anonymous' : username // Username, based on anonymous mode
        };
    
        // This is where you could potentially send the data to a server or another service
        console.log('Formatted Listing Data:', listingData);
    };


    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL);
        };
    }, [imageURL]);

    return (
        <div className="bg-gray-300 min-h-screen">
            {/* "Create a Listing" Title */}
            <div className="pt-12 ml-20">
                <h2 className="text-3xl font-semibold">Create a KnickKnack Listing</h2>
            </div>

            <div className="flex justify-between pt-10 ml-20">
                {/* Image Upload Box */}
                <div
                    className="max-w-xl max-h-xl h-auto w-full bg-gray-400 flex flex-col justify-center items-center text-6xl rounded-lg text-white overflow-hidden cursor-pointer px-2"
                    onClick={handleClick}
                >
                    {imageURL ? (
                        <img src={imageURL} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center">
                            <span>+</span>
                            <span className="text-base text-gray-300 mt-2">Upload an Image to Generate a Title</span> {/* Text under the plus sign */}
                        </div>
                    )}
                    <input
                        type="file"
                        id="fileUpload"
                        name="fileUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                </div>

                {/* Text Input Fields and Profile Placeholder */}
                <div className="max-w-xl w-full mr-36">
                    {/* Existing Fields */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-xl font-bold">Listing Title:</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="w-full h-10 rounded-lg bg-gray-400" 
                            value={extractedText}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-xl font-bold">Price (USD):</label>
                        <input type="number" id="price" name="price" className="w-full h-10 rounded-lg bg-gray-400" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-xl font-bold">Description:</label>
                        <textarea id="description" name="description" rows="8" className="w-full rounded-lg bg-gray-400 appearance-none border-none"></textarea>
                    </div>

                    {/* Profile Photo Placeholder, Username, and Toggle Button */}
                    <div className="flex items-center mt-6">
                        <div className={`w-20 h-20 ml-4 mb-8 ${circleColor} rounded-full mr-4`}></div> {/* Circle Placeholder with dynamic color */}
                        <span className="text-2xl mb-8 mr-4">{username}</span> {/* Dynamic Username */}
                        <button 
                            onClick={toggleAnonymous} 
                            className="px-4 py-2 ml-36 bg-gray-400 mb-8 text-white rounded-lg"
                        >
                            {isAnonymous ? 'Show Profile' : 'Go Anonymous'} {/* Toggle Button Text */}
                        </button>
                    </div>

                    <button
                        onClick={postToMarketplace}
                        className="absolute bottom-4 right-4 px-6 py-2 bg-blue-500 text-white rounded-md">Post to Marketplace
                    </button>
                </div>
            </div>
        </div>
    );
}
