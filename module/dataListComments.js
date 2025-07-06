export let dataListComments = [];


export function apiListCommets(list) {
  dataListComments.length = 0;
  dataListComments.push(...list);
}