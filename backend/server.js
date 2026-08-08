import app from './index.js';
const PORT = 8000;

app.listen(PORT , () => {
    console.log(`The express app is listening to port ${PORT}`);
})