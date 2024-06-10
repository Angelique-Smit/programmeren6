import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Read() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:8000/animals", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAnimals(data);
                } else {
                    console.error('Failed to fetch animals data');
                }
            } catch (error) {
                console.error('Error fetching animals data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []); // Empty dependency array ensures useEffect runs only once

    if (loading) {
        return <p>Loading...</p>;
    }

    const showAnimals = animals.items.map((value) => (
        <div key={value.id}>
            <div className="flex items-center flex-col justify-center shadow-lg rounded-lg border-0 p-20 w-96 h-96 m-4 bg-gradient-to-b from-blue-500 to-blue-400">
                <p className="text-amber-50  self-start font-bold text-xl mb-4">Animal Name: </p>
                <p className="text-amber-50 font-bold text-lg mb-8">{value.name}</p>
                <Link to={`/detail/${value.id}`} className="flex items-center justify-center">
                    <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">View Details</button>
                </Link>
            </div>
        </div>
    ));

    return (
        <section className="flex flex-col items-center justify-center mt-16 ">
            <Link to={`/create`}>
                <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ">Create a new animal</button>
            </Link>
            <section className="flex items-center justify-center mt-16 flex-wrap">
                {showAnimals}
            </section>
        </section>
    );
}

export default Read;

