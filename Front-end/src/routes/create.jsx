import { useState } from 'react';
import {Link} from "react-router-dom";

function Create () {
    // Makes name/description/author variables and fills them with empty string
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [createMessage, setCreateMessage] = useState('');

    // Logic to send the filled input fields to the database
    const handleCreate = async () => {
        // Fetch the back-end
        const response = await fetch("http://localhost:8000/animals", {
            //Picks method (post)
            method: "POST",
            //Sends accept json headers so it accepts json
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            // Put the actual information of the input field into the body for the back-end to pick up.
            body: JSON.stringify({
                "name": name,
                "description": description,
                "author": author,
            }),
        });

        // Checks if the response is sent successfully (optional, future me can remove this if you want)
        if (response.ok) {
            console.log('Animal created successfully!');
            setCreateMessage('Animal created successfully');
        } else {
            console.error('Failed to create animal');
        }
    };

    return (
        // Creates input field and on the button press it sends the information given in the fields (that automatically update bc the variables have a useState)
        // The e.target.value is needed to change the current value of the variable. It's just something react does.
        <section className="flex flex-row items-center justify-center mt-28">
            <div className="shadow-lg rounded-lg bg-blue-400 border-0 p-20 justify-around">
                <p className="text-amber-50 font-bold text-2xl mb-8">{createMessage}</p>
                <label>
                    <p className="text-amber-50 text-lg font-bold"> Name of Animal</p>
                    <input className="w-60 h-8 pl-2  mb-2 rounded"
                        type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />

                <label>
                    <p className="text-amber-50 text-lg font-bold"> Description of animal</p>
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

                <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4  mt-8 mr-4 rounded"
                    onClick={handleCreate}>Create Animal
                </button>

                <Link to={`/`}>
                    <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Overview</button>
                </Link>
            </div>
        </section>
    );
}

export default Create;
