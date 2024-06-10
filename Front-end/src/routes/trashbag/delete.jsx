import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Delete() {
    const { id } = useParams();

    useEffect(() => {
        (async () => {

                const response = await fetch(`http://localhost:8000/animals/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    console.log('Animal successfully deleted');
                } else {
                    console.error('Failed to delete animals data');
                }
        })();
    }, [id]);

    const message = (
        <div>
            <h2>Animal successfully deleted</h2>
            <p>Click on the button to go back to the overview!</p>
            <Link to={`/`}>
                <button>Back to overview</button>
            </Link>
        </div>
    );

    return (
        <section>
            {message}
        </section>
    );
}

export default Delete;
