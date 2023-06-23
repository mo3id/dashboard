import axios from "axios";
import { Button, Checkbox, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import EditProductModal from "./EditProductModal";

const ProductsTable: React.FC = function () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response);
        setProducts(response?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteItem = (index: any) => {
    const filterData = products.filter((item: any, i: any) => i !== index);
    setProducts(filterData);
    // axios.delete(`/api/data/${id}`).then((response) => {
    //   setProducts(products.filter((item, i) => i !== index));
    // });
  };

  const productListHandle = products.map((product: any, i: any) => (
    <Table.Row
      key={product.id}
      className="hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <Table.Cell className="w-4 p-4">
        <Checkbox />
      </Table.Cell>
      <Table.Cell className=" p-4 text-sm font-normal text-gray-500 columns-[15rem] text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {product.category}
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {product.title}
        </div>
      </Table.Cell>
      <Table.Cell className=" p-4 text-base font-medium text-gray-900 columns-[15rem] dark:text-white">
        {product.description}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
        {`#${product.id}`}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
        {`$${product.price}`}
      </Table.Cell>
      <Table.Cell className="space-x-2 whitespace-nowrap p-4">
        <div className="flex items-center gap-x-3">
          <EditProductModal products={products} product={product} />

          <Button color="failure" onClick={() => deleteItem(i)}>
            <HiTrash className="mr-2 text-lg" />
            Delete item
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>Product Name</Table.HeadCell>
        <Table.HeadCell>description</Table.HeadCell>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {productListHandle}
      </Table.Body>
    </Table>
  );
};

export default ProductsTable;