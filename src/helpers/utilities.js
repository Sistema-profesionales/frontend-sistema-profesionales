const formatter = require('rut-formatter');

export function formatRut(rut) {
    try {
        if (rut && rut.length > 0) {

            rut = rut.replace(/[^kK0-9-. ]/g, '');
    
            if (rut.includes("-")) {
                rut = rut.replace("-", "");
            }
    
            if (rut.includes(".")) {
                rut = rut.replace(".", "").replace(".", "");
            }
    
            if (rut.includes(",")) {
                rut = rut.replace(",", "").replace(",", "");
            }

            if (rut && rut.length > 1 && rut.length < 10) {

                let rutFormatter = formatter.format(rut);
        
        
                let rutSplit = rutFormatter.split("-");
                let rutQuery = rutSplit[0].replace(".", "").replace(".", "");
                return { rutFormatter, rutQuery: `${rutQuery}-${rutSplit[1]}` }
            } else {
                throw Object({ status: 400, message: "El RUT ingresado no es correcto" });
            }
    
        } 
    } catch (error) {
        throw Object(error);
    }
    
}

export function acceptNumbersInRut(rut) {
    if (rut && rut.length > 0) {
        return rut.replace(/[^kK0-9-. ]/g, '');
    } else {
        return "";
    }
}

export const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);