import { Alert, ScrollView, Text, View, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "expo-router";

import { Header } from "@/components/header";
import { Product } from "@/components/products";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { add } from "@/stores/helpers/cart-in-memory";

const PHONE_NUMBER = "5583981961246"

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

      const message = `
        -------------------
        NOVO PEDIDO: 🍔🥤🧁
        -------------------
        \nEntregar em: ${address} 📦
        
        \nPRODUTOS ESCOLHIDOS:
        ${products}
        -------------
        \nValor total: ${total} 💸
      `
      //Utilizando a API do whatsapp para enviar a mensagem formatada para o número especificado:
      Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
      cartStore.clear()
      navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-bold text-slate-400 text-center my-8 text-2xl">
                Seu carrinho está vazio! ❌
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-bold">Total: </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega (Rua, Bairro, CEP, Número da casa e Complemento) ..."
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
