export const daysOfWeek = [
    { "id": 0, "day": "Lunes", "title": "Lunes", "alias": "L" },
    { "id": 1, "day": "Martes", "title": "Martes", "alias": "MA" },
    { "id": 2, "day": "Miercoles", "title": "Miercoles", "alias": "MI" },
    { "id": 3, "day": "Jueves", "title": "Jueves", "alias": "J" },
    { "id": 4, "day": "Viernes", "title": "Viernes", "alias": "V" },
    { "id": 5, "day": "Sabado", "title": "Sabado", "alias": "S" },
    { "id": 6, "day": "Domingo", "title": "Domingo", "alias": "D" },
];

export const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);