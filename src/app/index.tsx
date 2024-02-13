import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, Text, FlatList, SectionList } from "react-native";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { useState, useRef } from "react";
import { Product } from "@/components/products";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-store";

//FlatList é um component de lista já preparada, feita pelo react, você altera ela com propriedades, modificando para seu uso.
export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  //Usando o "useRef" para pegar as referências de uma lista e poder manipulá-la
  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartStore = useCartStore();
  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="pt-8">
      <Header title="Cardápio" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelected(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
}
