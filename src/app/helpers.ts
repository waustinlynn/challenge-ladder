export function moveItemInArray(arr: any[], previousIndex: number, newIndex: number): any[] {
    if (previousIndex == newIndex) return arr;

    let moveableRecord = { ...arr[previousIndex] };

    let top = arr.slice(0, previousIndex);
    let bottom = arr.slice(previousIndex + 1, arr.length);

    if (previousIndex > newIndex) {
        let subTop = top.slice(0, newIndex);
        let subBottom = top.slice(newIndex, top.length);
        subTop.push(moveableRecord);
        return subTop.concat(subBottom).concat(bottom);
    }

    if (previousIndex < newIndex) {
        //account for index offset after initial array split
        newIndex = newIndex - previousIndex;
        let subTop = bottom.slice(0, newIndex);
        let subBottom = bottom.slice(newIndex, bottom.length);
        subTop.push(moveableRecord);
        return top.concat(subTop).concat(subBottom);
    }
}