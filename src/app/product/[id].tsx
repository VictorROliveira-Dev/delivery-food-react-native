import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { View, Image, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";

export default function Product() {
  const { id } = useLocalSearchParams();
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const product = PRODUCTS.find((item) => item.id === id);

  function handleAddToCart() {
    if (product) {
      cartStore.add(product);
      navigation.goBack();
    }
  }
  //Tratando para caso o produto não exista, permanecer na página home:
  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="pt-5 text-slate-100 font-heading text-4xl leading-6">
          {product.title}
        </Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-subtitle text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            className="text-slate-400 font-subtitle text-base leading-6"
            key={ingredient}
          >
            {"\u2022"}
            {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20}></Feather>
          </Button.Icon>
          <Button.Text>Adicionar a lista</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
