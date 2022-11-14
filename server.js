const http = require('./app')
const PORT = process.env.PORT || 3000
http.listen(PORT, ()=>console.log(`Server up and running on port ${PORT}`))
