

const validation = (input, fieldToValidate = null) => {
    let errors = {};

    const maxLength = 10;
    const maxLengthDescription = 500;
    const regexText = /^[a-zA-Z]+$/;
    const regexRepeatedLetters = /([a-zA-Z])\1{3,}/g;
    const regexInvalidChars = /[^a-zA-Z0-9\s:.,"]/g;

    // Funciones auxiliares para simplificar la lógica de validación
    const validateName = () => {
        if (!input.name) {
            errors.name = "El campo nombre no puede estar vacío.";
        } else if (!regexText.test(input.name)) {
            errors.name = "debe contener sólo letras";
        } else if (input.name.length > maxLength) {
            errors.name = `debe tener ${maxLength} caracteres o menos`;
        } else if (input.name.match(regexRepeatedLetters)) {
            errors.name = "no repetir la misma letra más de 3 veces consecutivas";
        }
    };

    const validateDescription = () => {
        if (input.description.match(regexRepeatedLetters)) {
            errors.description = "no repetir la misma letra más de 3 veces consecutivas";
        } else if (input.description.length < 20) {
            errors.description = "debe contener minimo 20 caracteres";
        } else if (input.description.length > maxLengthDescription) {
            errors.description = `debe contener ${maxLengthDescription} caracteres o menos`;
        } else if (regexInvalidChars.test(input.description)) {
            errors.description = "no debe contener caracteres especiales ni URL";
        }
    };

    const validatePrice = () => {
        if (!input.price || isNaN(input.price)) {
            errors.price = "El campo precio no puede estar vacío.";
        } else if (input.price <= 0) {
            errors.price = "El precio debe ser mayor a cero.";
        } else if (input.price % 1 !== 0) {
            const numberAsString = input.price.toString();
            const beforeDecimalPoint = numberAsString.split('.')[0];
            if (beforeDecimalPoint.length === 0 || beforeDecimalPoint.length > 1) {
                errors.price = "El precio debe tener al menos un dígito antes del punto decimal.";
            } else if (numberAsString.split('.')[1].length > 2) {
                errors.price = "El precio debe tener hasta 2 decimales.";
            }
        } else if (input.price.length > 10) {
            errors.price = "El precio no puede tener más de 10 dígitos.";
        }
    };
  
   
console.log(input);
    // Llama a la función correspondiente según el campo a validar
    switch (fieldToValidate) {
        case 'name':
            validateName();
            break;
        case 'description':
            validateDescription();
            break;
        case 'price':
            validatePrice();
            break;
        case 'technology':
                if (!input.technology || input.technology.length === 0) {
                  errors.technology = "Debe seleccionar al menos una tecnología.";
                }
                break;
              case 'category':
                if (!input.category || input.category.length === 0) {
                  errors.category = "Debe seleccionar al menos una categoría.";
                }
                break;
                case "image":
                    if(!input.image || input.image.length < 2){
                        errors.image = "Debe cargar al menos dos imagenes.";
                    }
                    break;
                    case "isCover":
                        if(!input.isCover || input.isCover.length === 0){
                            errors.isCover = "Es obligatorio cargar una imagen de portada.";
                        }
                        break;
        default:
            break;
            }

    return errors;
};

export default validation;