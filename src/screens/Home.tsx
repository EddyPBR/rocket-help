import { FC, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HStack, VStack, Text, Heading, FlatList, Center, IconButton, useTheme } from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import { dateFormat } from "../utils/firestoreDateFormat";
 
import Logo from "../assets/logo_secondary.svg";

import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Loading } from "../components/Loading";
import { Order } from "../components/Order";

type OrderStatusType = "open" | "closed";

type OrderType = {
  id: string;
  patrimony: string;
  when: string;
  status: OrderStatusType;
}

export const Home: FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusSelected, setStatusSelected] = useState<OrderStatusType>("open");
  const [orders, setOrders] = useState<OrderType[]>([]);

  const handleNewOrder = () => {
    navigation.navigate("new");
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId });
  }

  const handleLogout = () => {
    auth()
      .signOut()
      .catch(() => {
        return Alert.alert("Sair", "Não foi possível sair.");
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          } as OrderType;
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack 
          width="100%"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">
            Solicitações
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        {isLoading 
          ? <Loading /> 
          : (
            <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => 
                <Order 
                  data={item} 
                  onPress={() => handleOpenDetails(item.id)} 
                />
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center>
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                    Você ainda não possui {'\n'} solicitações 
                    {statusSelected === "open" ? "em andamento" : "finalizadas"}
                  </Text>
                </Center>
              )}
            />
          )
        }
        
        <Button 
          title="Nova solicitação"
          onPress={handleNewOrder}
        />
      </VStack>
    </VStack>
  );
};
