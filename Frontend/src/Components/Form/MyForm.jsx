import React, { useState } from 'react';

const MyForm = () => {

    let currUser = localStorage.getItem("currUser");
    if (currUser == "undefined") {
        currUser = {
            userName: ""
        }
    } else {
        currUser = JSON.parse(currUser)
    }

    const [formData, setFormData] = useState({
        raisedBy: currUser._id,
        latitude: '',
        longitude: '',
        description: '',
        img: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form data:', formData);

        fetch(`http://localhost:8080/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('currUser', JSON.stringify(data.currUser));
                let user = localStorage.getItem("currUser");
                console.log(JSON.parse(user));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <form className="space-y-4 my-[8vh]" onSubmit={handleSubmit}>
            {/* Raised By (assuming you have a separate User component/selection) */}
            <div className="flex flex-col">
                <label htmlFor="raisedBy" className="text-sm font-medium mb-2">Raised By</label>
                {/* Replace with your User component or selection logic */}
                <input
                    type="text"
                    id="raisedBy"
                    name="raisedBy"
                    value={formData.raisedBy}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Latitude */}
            <div className="flex flex-col">
                <label htmlFor="latitude" className="text-sm font-medium mb-2">Latitude</label>
                <input
                    type="number"
                    step="any"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* longitude */}
            <div className="flex flex-col">
                <label htmlFor="longitude" className="text-sm font-medium mb-2">Longitude</label>
                <input
                    type="number"
                    step="any"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Description */}
            <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 p-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Image */}
            <div className="flex flex-col">
                <label htmlFor="img" className="text-sm font-medium mb-2">Image URL (required)</label>
                <input
                    type="url"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    required
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
                Submit
            </button>
        </form>
    );
};

export default MyForm;
