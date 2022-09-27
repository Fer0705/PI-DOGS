export function validate(input) {
    const regexNumLifeSpan = new RegExp("^[0-9-]+$"); //se utiliza para hacer coincidir texto con un patrón.
    const errors = {};
    if (!input.name) errors.name = "name is required";
    else if (input.name.search(/^[a-zA-Z\s]*$/)) {
      errors.name = "the name does not admit numbers or symbols";
    }
    //----------------------------------------------------------------
    else if (!input.heightMin) errors.heightMin = "min height is required";
    else if (!/^[0-9]\d*(.\d+)?$/.test(input.heightMin)) {
      errors.heightMin = "integers numbers only";
    } else if (input.heightMin < 1 || input.heightMin > 99) {
      errors.heightMin = "min height must be between 1 and 99";
    }
    //----------------------------------------------------------------
    else if (!input.heightMax) errors.heightMax = "max height is required";
    else if (!/^[0-9]\d*(.\d+)?$/.test(input.heightMax)) {
      errors.heightMax = "integers numbers only";
    } else if (parseInt(input.heightMax) <= parseInt(input.heightMin)) {
      errors.heightMax = "Must be greater than the min height";
    }
    //----------------------------------------------------------------
    else if (!input.weightMin) errors.weightMin = "min weight is required";
    else if (!/^[0-9]\d*(.\d+)?$/.test(input.weightMax)) {
      errors.weightMax = "integers numbers only";
    } else if (input.weightMin < 1 || input.weightMin > 99) {
      errors.weightMin = "min weight must be between 1 and 99";
    }
    //----------------------------------------------------------------
    else if (!input.weightMax) errors.weightMax = "max weight is required";
    else if (!/^[0-9]\d*(.\d+)?$/.test(input.weightMax)) {
      errors.weightMax = "integers numbers only";
    } else if (parseInt(input.weightMax) <= parseInt(input.weightMin)) {
      errors.weightMax = "Must be greater than the min weight";
    }
    //----------------------------------------------------------------
    else if (!input.image) errors.image = "image is required";
    else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)) {
      errors.image = "Please insert a valid image URL";
    }
    //----------------------------------------------------------------
    else if (!input.life_span) errors.life_span = "life span is required";
    else if (!input.life_span.includes("-")) {
      errors.life_span = "please replicate the example format: 8 - 13";
    } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
      //CharAt me devuelve el valor en la posicion solicitada, aqui usamos +1 de la posicion donde se encuentre el '-';
      errors.life_span = "There must be a number behind the '-'";
    } else if (
      parseInt(input.life_span.split("-")[0]) >=
      parseInt(input.life_span.split("-")[1])
    ) {
      errors.life_span = "The min year must be less than the max year";
    } else if (regexNumLifeSpan.test(input.life_span) === false) {
      errors.life_span = "only numbers and '-'";
    } else if (input.life_span.charAt(0) === "-") {
      errors.life_span = "must enter a number before the '-'";
    }
  
    return errors;
  }