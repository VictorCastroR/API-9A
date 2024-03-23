**IMPORTANTE**

PARA CREAR LAS TABLAS SE DEBE USAR LOS METODOS POST DE CADA RUTA, EN EL SIGUIENTE ORDEN:
1. http://localhost:3301/api/v1/role/crearTabla
2. http://localhost:3301/api/v1/profession/crearTabla
   4.1 Json para crear una profession
   {
   "nombre": "Albañil",
   "rubro": "Construccion / Detalles estructurales / Fechadas",
   "precioMin": 1000,
   "precioMax": 2500
   }
3. http://localhost:3301/api/v1/user/crearTabla
    2.1 Json para Crear users:
   {
   "fullName": "Victor Castro",
   "email": "vcastro@example.com",
   "password": "vcastro123",
   "phoneNumber": "123456789",
   "roleId": 3, // si no se manda este parametro se crea un consumer
   "professionId" : 1
   }
4. http://localhost:3301/api/v1/address/crearTabla
   3.1 Json para crear una address:
   {
   "street": "Calle Independencia 55",
   "city": "Guadalajara",
   "state": "Jalisco",
   "country": "Mexico",
   "postalCode": "44100",
   "UserId": 1
   }
5. http://localhost:3301/api/v1/contract/crearTabla
   5.1 Json para crear contracts 
