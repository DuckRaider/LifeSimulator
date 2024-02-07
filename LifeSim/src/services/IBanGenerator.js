import { v4 as uuidv4 } from 'uuid';

export function generateIBan(){
    // For now a simple uuid. Must replace with own algorithm
    let iban = uuidv4()

    return iban;
}