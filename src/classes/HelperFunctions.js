
function group_array2map(arr,f_group_key) {
    let groups = new Map();
    arr.forEach(item => {
      let group;
      let group_key = f_group_key(item);
      if (!groups.has(group_key)) {
        group={};
        group.tasks=[];
        groups.set(group_key,group);
      }
      group=groups.get(group_key);
      group.tasks.push(item);
    });
    return groups;
}

// function hf_test() {
//   console.log('helper funciton test')
// }

export { 
    group_array2map,
    // hf_test,
};

