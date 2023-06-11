//----------------not completed yet-------------//

export function deleteProductHandler(id) {
  setOpen(!isOpen); //????????!!!!!
  const url = '`https://fakestoreapi.com/products/${id}`';
  axios.delete(url).then((response) => { console.log(response) })
  const data = products.filter((value, i) => {
    return value.id !== id
  });
  setProducts(data) //?????????!!!!
}