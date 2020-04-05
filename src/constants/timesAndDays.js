export const daysOfWeek = [
    { "id": 0, "day": "Lunes", "title": "Lunes" },
    { "id": 1, "day": "Martes", "title": "Martes" },
    { "id": 2, "day": "Miercoles", "title": "Miercoles" },
    { "id": 3, "day": "Jueves", "title": "Jueves" },
    { "id": 4, "day": "Viernes", "title": "Viernes" },
    { "id": 5, "day": "Sabado", "title": "Sabado" },
    { "id": 6, "day": "Domingo", "title": "Domingo" },
];

export const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);