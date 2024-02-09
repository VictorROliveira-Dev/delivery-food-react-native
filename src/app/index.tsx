import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, FlatList } from "react-native";

import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";
//FlatList é um component de lista já preparada, feita pelo react, você altera ela com propriedades, modificando para seu uso.
export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);
  }

  return (
    <View className="pt-8">
      <Header title="Cardápio" cartQuantityItems={3} />

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
    </View>
  );
}
