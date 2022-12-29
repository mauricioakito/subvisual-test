export const generateArray = (counting: number, initialNumber = 1) => {

    const range = [...Array(counting).keys()];
    return Array.from(range).map((index: number) => index+initialNumber);

};