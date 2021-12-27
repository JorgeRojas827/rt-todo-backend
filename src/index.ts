import app from './app';

const port = parseInt(process.env.PORT || '4000');

app.listen(port, () => {
    console.log('Servidor abierto en el puerto 4000');
});
