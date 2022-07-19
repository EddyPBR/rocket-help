import { FC, useState } from "react";
import { HStack, VStack, Text, Heading, FlatList, Center, IconButton, useTheme } from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
 
import Logo from "../assets/logo_secondary.svg";

import { Filter } from "../components/Filter";
import { Order } from "../components/Order";
import { Button } from "../components/Button";

export const Home: FC = () => {
  const { colors } = useTheme();

  const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");

  const [orders, setOrders] = useState([]);

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
            Meus chamados
          </Heading>

          <Text color="gray.200">
            3
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

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} />}
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
        
        <Button title="Nova solicitação" />
      </VStack>
    </VStack>
  );
};
