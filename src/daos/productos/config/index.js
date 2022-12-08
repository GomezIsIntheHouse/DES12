
const getProductModule = async () => {
    const dataCore = process.env.DATACORE;
    
    if (dataCore == "MEMORY") {
      const ModuleSource = await import(
        "../../productos/productoDaoMem.js"
      );
      return ModuleSource.default;
    } else if (dataCore == "FS") {
      const ModuleSource = await import("../../productos/productoDaoArchivo.js");
      return ModuleSource.default;
    } else if( dataCore == "MONGO"){
        const ModuleSource = await import("../../productos/productoDaoMongo.js");
        return ModuleSource.default;
    }else if( dataCore == "FIREBASE"){
        const ModuleSource = await import("../../productos/productoDaoFirebase.js");
        return ModuleSource.default;
    }
  };



const ProductService = async () => {
    const ProductsClass = await getProductModule();
    const productService = new ProductsClass();
    console.log(productService.getAllProducts());
  };
  
  export default ProductService;