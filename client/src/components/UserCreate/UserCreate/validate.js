export default function validate(values) {
    const errors = {};

    if (!values?.titulo.trim()) {
        errors.titulo = 'Debe ingresar un título.';
    } else if (/\d{5}/g.test(values?.titulo)) {
        errors.titulo = 'El título no puede llevar 5 números seguidos.';
    }

    if (!values?.descripcion.trim()) {
        errors.descripcion = 'Debes ingresar una descripción.';
    } else if (/\d{5}/g.test(values?.descripcion)) {
        errors.descripcion = 'La descripción no puede llevar 5 números seguidos.';
    }

    if (!/^(-?)\d+$/.test(values?.precio)) {
        errors.precio = 'El precio debe ser un número.'
    } else if (values?.precio < 0) {
        errors.precio = 'El precio no puede ser negativo.'
    }

    return errors;
};