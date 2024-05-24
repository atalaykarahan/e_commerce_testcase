import ProductItem from "@/components/product-item";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
const ProductsCard = () => {
  const productData = {
    product_id: 1,
    title: "Harika Kahve",
    category_id: 2,
    category_title: "Kahve",
    description: "Özel karışım, harika lezzet!",
    price: 24.99,
    stock_quantity: 50,
    origin: "Brezilya",
    roast_level: "Orta",
    flavor_notes: ["Çikolata", "Fındık", "Vanilya"],
  };
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Ürünler</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 h-[85lvh] whitespace-nowrap overflow-auto gap-4">
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />
          <ProductItem product={productData} />

        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductsCard;
