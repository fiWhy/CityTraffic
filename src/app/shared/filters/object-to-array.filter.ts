export const ObjectToArrayFilterName = "objectToArray";
export const ObjectToArrayFilter = () => (input: any) => {
    let newArray = []
    if (!input) {
        return undefined;
    } else {
        Object.keys(input).forEach((key) => {
            newArray.push(input[key]);
        })
        return newArray;
    }
}