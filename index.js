/*
    Based on https://www.geradorcnpj.com/javascript-validar-cnpj.htm
*/

export class CNPJValidator {
    cnpj = '';
    knownInvalidValues = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ];

    setCNPJ(cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    validate(cnpj = null) {
        var size, numbers, digits, sum, pos;
        cnpj = !cnpj ? this.cnpj : cnpj;
        cnpj = cnpj.replace(/[^\d]+/g, '');

        const hasAnIncorrectLenght = cnpj.length != 14
        const isThereInknownInvalidValues = this.knownInvalidValues.indexOf(cnpj) > -1;
        const isEmpty = cnpj == '';

        if (hasAnIncorrectLenght || isThereInknownInvalidValues || isEmpty) {
            return false;
        }

        // Valida DVs
        size = cnpj.length - 2
        numbers = cnpj.substring(0, size);
        digits = cnpj.substring(size);
        sum = 0;
        pos = size - 7;

        for (var i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (result != digits.charAt(0)) {
            return false;
        }

        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;

        for (var i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) {
                pos = 9;   
            }
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(1)) {
            return false;
        }

        return true;
    }
}

export const validateCNPJ = (cnpj) => {
    return (new CNPJValidator()).setCNPJ(cnpj).validate();
}