


  const getCarritoModule = async () => {
    const dataCore = process.env.DATACORE;
    if (dataCore == "MEMORY") {
        const ModuleSource = await import(
          "../CarritoDaoMem.js"
        );
        return ModuleSource.default;
      } else if (dataCore == "FS") {
        const ModuleSource = await import("../CarritoDaoArchivo.js");
        return ModuleSource.default;
      } else if( dataCore == "MONGO"){
          const ModuleSource = await import("../CarritoDaoMongo.js");
          return ModuleSource.default;
      }else if( dataCore == "FIREBASE"){
          const ModuleSource = await import("../CarritoDatoFirebase.js");
          return ModuleSource.default;
      }
    };
  

 const CarritoService = async () => {
    const CarritoClass = await getCarritoModule();
    const carritoService = new CarritoClass();
    console.log(carritoService.getAllCarritos())
}

export default CarritoService;
  


   

  