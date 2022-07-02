const {Router} = require('express');
const router = Router();

//SDK mercadopago
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN_MP } = process.env;

//agrega credenciales
mercadopago.configure({
    access_token: ACCESS_TOKEN_MP
});

router.post('/', (req, res) => {
    
//cosas que deberia recibir por body
    const id_orden = /* req.body */ 1 
    const carrito = req.body/* [
        {title: 'GTA V', quantity: 1, price: 1000},
        {title: 'God of War', quantity: 1, price:  5000},
        {title: 'NFS Heat', quantity: 1, price: 2000},
    ]; */

//cosas que requiere MP de tu respectiva compra
    const items_mp = carrito.map(e => ({
        title: e.title,
        unit_price: e.price,
        quantity: 1
    }));

//objeto de preferencia
let preference = {
    items: items_mp, //el carrito solo con los datos importantes
    external_reference: `${id_orden}`, //el id de cada orden
    payment_methods: {
        excluded_payment_types:[
            {
                id: 'atm' //excluir el metodo de pago
            }
        ],
        installments: 3 //cuotas
    },
    "back_urls": {
        "success": "http://localhost:3000/home",
        "failure": "http://localhost:3000/home",
        "pending": "http://localhost:3000/home"
    },
};

mercadopago.preferences.create(preference)

.then(function(response){
    // console.info('respondio')
    global.init_point = response.body.init_point
    // console.log(response.body)
    res.json({ init_point: global.init_point })//lo que devolvemos al front
})
.catch(function(error){
    console.log(error)
});
});

module.exports = router;