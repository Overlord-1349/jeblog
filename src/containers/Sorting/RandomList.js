
const getRandomList = (size) => {
    const lst = [];
    for (let i=0; i < size; i++){
        lst.push(Math.floor(Math.random() * 100 ));
    }
    return lst;

}

export default getRandomList;