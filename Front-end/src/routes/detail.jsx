import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Detail() {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:8000/animals/${id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });
                const data = await response.json();
                setAnimal(data);

                // Fills the variables with the current info from the DB or an empty string if it's undefined
                setName(data.name || '');
                setDescription(data.description || '');
                setAuthor(data.author || '');
            } catch (error) {
                console.error('Error fetching animal data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/animals/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                console.log('Animal successfully deleted');
                setName('');
                setDescription('');
                setAuthor('');
                setDeleteMessage('Animal deleted successfully');
            } else {
                console.error('Failed to delete animal data');
            }
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="flex items-center justify-center mt-28 flex-wrap">
            <div className="shadow-lg rounded-lg bg-blue-400 border-0 p-16 justify-around">
                <p className="text-amber-50 font-bold text-2xl mb-8">{deleteMessage}</p>

                <p className="text-amber-50 font-bold text-lg mb-1">Animal: {name}</p>
                <p className="text-amber-50 font-bold text-lg mb-1">Description: {description}</p>
                <p className="text-amber-50 font-bold text-lg mb-1">Author: {author}</p>

                <div className="flex justify-around mt-8">
                    <Link to={`/update/${animal.id}`}>
                        <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-4 rounded">
                            Edit
                        </button>
                    </Link>

                    <button
                        onClick={() => handleDelete(animal.id)}
                        className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-4 rounded">
                        Delete
                    </button>

                    <Link to={`/`}>
                        <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Overview</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Detail;
