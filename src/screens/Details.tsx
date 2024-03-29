import { FC, useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native"
import firestore from "@react-native-firebase/firestore";

import { VStack, HStack, Text, ScrollView, Box } from "native-base";
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from "phosphor-react-native";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";

import { dateFormat } from "../utils/firestoreDateFormat";

import type { OrderFirestoreDTO } from "../DTOs/OrderDTO";
import colors from "native-base/lib/typescript/theme/base/colors";
import { Alert } from "react-native";

type RouteParams = {
  orderId: string;
}

type OrderDetails = {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
  description: string;
  solution: string;
  closed: string;
}

export const Details: FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { orderId } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClosingRequest, setIsClosingRequest] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [solution, setSolution] = useState<string>("");

  const handleOrderClose = () => {
    if(!solution) {
      return Alert.alert("Solicitação", "Informe a solução para encerrar a solicitação");
    }

    setIsClosingRequest(true);

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação encerrada");
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Solicitação", "Não foi possível encerrar a solicitação");
        setIsClosingRequest(false)
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === "closed"
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status === "closed" ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {
            order.status === "open" && (
              <Input
                placeholder="Descrição da solução"
                onChangeText={setSolution}
                textAlignVertical="top"
                multiline={true}
                h={24}
              />
            )
          }
        </CardDetails>
      </ScrollView>

      {
        order.status === "open" && (
          <Button
            title="Encerrar solicitação"
            m={5}
            onPress={handleOrderClose}
            isLoading={isClosingRequest}
          />
        )
      }
    </VStack>
  );
};
