import Animal from './model.js';
import express from 'express';
import { faker } from '@faker-js/faker';
import createPagination from './pagination.js';

const router = express.Router();

// define the home page route
    //Get everything from the database
    router.get('/', async (req, res) => {
        const acceptJson = req.accepts('application/json');

        if (!acceptJson) {
            res.status(400).json({ message: 'Not Acceptable' });
            return;
        }

        try {
            const animals = await Animal.find();
            const total = animals.length;
            const start = parseInt(req.query.start) || 1;
            const limit = parseInt(req.query.limit) || animals.length;

            const paginatedAnimals = animals.slice(start - 1, start - 1 + limit).map(animal => ({
                id: animal.id,
                name: animal.name,
                description: animal.description,
                author: animal.author,
                _links: {
                    //`${req.protocol}://${req.get('host')}/animals/${animal.id}`
                    self: {href: `http://145.24.222.70:8000/animals/${animal.id}`},
                    collection: {href: `http://145.24.222.70:8000/animals`}
                }
            }));

            const pagination = createPagination(total, start, limit, paginatedAnimals);

            res.json(pagination);
        } catch (error) {
            return res.status(404).json({
                message: "Not found"
            });
        }

    });


    router.post('/', async (req, res) => {
        try {
            //Putting body in right category
            if (!req.body.name || !req.body.description || !req.body.author) {
                return res.status(400).json({
                    message: "Cannot upload empty fields"
                })
            }

            await Animal.create({
                name: req.body.name,
                description: req.body.description,
                author: req.body.author
            });

            return res.status(201).json({
                message: "Created Animal"
            });
        }
        catch {
            //error code
            return res.status(400).json({
                message: "Could not upload to database"
            })
        }
    });

//Detail pagina
    //Get specific animal
    router.get('/:id', async (req, res) => {
        const acceptJson = req.accepts('json');
        if (!acceptJson) {
            res.status(400).json({ message: 'Not Acceptable' });
            return;
        }
        try {
            const { id } = req.params;
            const animal = await Animal.findById(id);

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            const fullAnimal = {
                id: animal.id,
                name: animal.name,
                description: animal.description,
                author: animal.author,
                _links: {
                    self: { href: `http://145.24.222.70:8000/animals/${animal.id}` },
                    collection: { href: `http://145.24.222.70:8000/animals` }
                }
            };

            return res.json(fullAnimal);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    });

    //Update the specific animal
    router.put('/:id', async (req, res) => {
        try {
            // Gets the id
            const { id } = req.params;

            // If the id is empty or does not exist, it gives an error message
            if (!id) {
                return res.status(404).json({ message: 'Id not found' });
            }

            if (!req.body.name || !req.body.description || !req.body.author) {
                return res.status(400).json({
                    message: "Cannot update with empty fields"
                });
            }

            // Finds the animal by ID and update its details.
            const updatedAnimal = await Animal.findByIdAndUpdate(
                id,
                {
                    name: req.body.name,
                    description: req.body.description,
                    author: req.body.author
                },
                { new: true } // To return the updated document
            );

            // If the animal with the given ID doesn't exist
            if (!updatedAnimal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            // Sends success message with updated animal details
            return res.status(200).json({
                message: "Animal successfully updated",
                animal: updatedAnimal
            });

        } catch (res) {
            return res.status(500).json({ message: 'Failed to update animal' });
        }
    });


    //Delete specific animal
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            // If there is no given id or the id is invalid
            if (!id) {
                return res.status(404).json({ message: 'Invalid or missing ID' });
            }

            // Finds the animal by ID and removes it
            const deletedAnimal = await Animal.findByIdAndDelete(id);
            if (!deletedAnimal) {
                // If the animal with the given ID was not found
                return res.status(400).json({ message: 'Animal not found' });
            }

            // Success message with deleted animal information
            return res.status(204).json({ message: 'Animal deleted successfully', deletedAnimal });
        } catch (error) {
            // Error message for server-related issues
            return res.status(500).json({ message: 'Failed to delete animal', error: error.message });
        }
    });



// Seeder
router.post('/seed', async (req, res) => {
    try {
        if (req.body?.METHOD === 'SEED') {
            for (let i = 0; i < 20; i++) {

                await Animal.create({
                    name: faker.lorem.sentence({min: 10, max: 20}),
                    description: faker.lorem.paragraph(2),
                    author: faker.lorem.sentence({min: 3, max: 20})
                })
            }
            return res.json({
                message: "Data verstuurd"
            })
        }
    }
    catch {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

//Options to allow methods for certain routes
    router.options('/', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, Content-Type');
        res.header('Allow', 'GET, POST, OPTIONS');
        res.sendStatus(200);
    });

    router.options('/:id', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, Content-Type');
        res.header('Allow', 'GET, PUT, DELETE, OPTIONS');
        res.sendStatus(200);
    });

// export the router
export default router;
