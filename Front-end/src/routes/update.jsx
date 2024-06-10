import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Update = () => {
    // Gets Id from the parameters from in the URL
    const { id } = useParams();

    // Initiate variables/constants
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        //Gets the data corresponding with the given ID, async function with a const response that includes nessecary headers.
        (async () => {
            try {
                const response = await fetch(`http://localhost:8000/animals/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();

                // Fills the variables with the current info from the DB or an empty string if it's undefined
                setName(data.name || '');
                setDescription(data.description || '');
                setAuthor(data.author || '');

            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        })();
    }, [id]);

    // Function to handle updating the animal data
    const handleUpdate = async () => {
            // Send a PUT request to update the animal data
            const response = await fetch(`http://localhost:8000/animals/${id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "description": description,
                    "author": author,
                }),
            });

            // Check if the update was successful
            if (response.ok) {
                console.log('Animal updated successfully!');
                setUpdateMessage('Animal editted successfully');
            } else {
                console.error('Failed to update animal');
            }
    };

    // JSX rendering of the update form
    return (
        <section className="flex flex-row items-center justify-center mt-28">
            <div className="shadow-lg rounded-lg bg-blue-400 border-0 p-20 justify-around">
                <p className="text-amber-50 font-bold text-2xl mb-8">{updateMessage}</p>
                <label>
                    <p className="text-amber-50 text-lg font-bold"> Name </p>
                    <input className="w-60 h-8 pl-2  mb-2 rounded"
                        type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />

                <label>
                    <p className="text-amber-50 text-lg font-bold"> Description </p>
                    <input className="w-60 h-8 pl-2  mb-2 rounded"
                        type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />

                <label>
                    <p className="text-amber-50 text-lg font-bold"> Author </p>
                    <input className="w-60 h-8 pl-2  mb-2 rounded"
                        type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>
                <br />

                <div className="mt-8">
                    <button onClick={handleUpdate}
                            className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">
                        Edit Animal
                    </button>

                    <Link to={`/`}>
                        <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Overview</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Update;
