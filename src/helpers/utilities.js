const formatter = require('rut-formatter');

export function formatRut(rut) {
    // console.log(formatter.format(rut));
    if (rut && rut.length > 0) {

        rut = rut.replace(/[^\w\s]/gi, '');

        if (rut.includes("-")) {
            rut = rut.replace("-", "");
        }

        if (rut.includes(".")) {
            rut = rut.replace(".", "").replace(".", "");
        }

        if (rut.includes(",")) {
            rut = rut.replace(",", "").replace(",", "");
        }

        let rutFormatter = formatter.format(rut);


        let rutSplit = rutFormatter.split("-");
        let rutQuery = rutSplit[0].replace(".", "").replace(".", "");
        return { rutFormatter, rutQuery: `${rutQuery}-${rutSplit[1]}` }
    } else {
        return undefined;
    }
}

export function acceptNumbersInRut(rut) {
    if (rut && rut.length > 0) {
        ///[^\w\s]/gi
        return rut.replace(/[^\w\s]/gi, '');
    } else {
        return "";
    }
}