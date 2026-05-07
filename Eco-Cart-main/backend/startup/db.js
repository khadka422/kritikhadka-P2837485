import mongoose from 'mongoose';

export default function () {
  mongoose
    .connect('mongodb://localhost/eco-cart')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));
}
