class Validations {

    // check, value is empty
    isEmpty(value) {
        if ( value === undefined || value === null || value === "" ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
        ) {
          return true;
        } else {
          return false;
        }
    }

    // Validation to create nft
    createNFT(object) {
      let errors = {}
  
      if(this.isEmpty(object.name)) {
        errors.name = 'Name is required';
      } else if(object.name.length > 20) {
        errors.name = 'Name should be less than 20 characters';
      }
      
      if(this.isEmpty(object.description)) {
        errors.description = 'Description is required';
      } else if(object.description.length > 50) {
        errors.description = 'Description should be less than 50 characters';
      }

      if(this.isEmpty(object.price)) {
        errors.price = 'Price is required';
      } else { 
        const positiveDecimalRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
        const isMatched = positiveDecimalRegex.test(object.price);
        
        if(!isMatched) {
          errors.price = 'Price should be postive decimal only';
        }
      }

      if(this.isEmpty(object.image)) {
        errors.image = 'Image is required';
      }
      
      return errors;
    }
  }
  
  export default new Validations();
  