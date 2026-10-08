import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Product {id}</h1>;
};

export default ProductDetail;