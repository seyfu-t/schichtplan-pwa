/// <reference types="astro/client" />

// env.d.ts
export enum ShiftType {
    Nachtschicht = "N",
    Tagschicht = "T",
    Frei1 = "F1",
    Frei2 = "F2"
}

export type ShiftColors = {
    [key in ShiftType]: string;
};
