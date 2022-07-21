import { useState, FC } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const SignIn: FC = () => {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = () => {
    if(!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido.");
        }

        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "E-mail ou senha inválida.");
        }

        return Alert.alert("Entrar", "Não foi possível acessar");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        onChangeText={setEmail}
        InputLeftElement={
          <Icon 
            as={<Envelope color={colors.gray[300]} />}
            ml={4}
          />
        }
      />

      <Input 
        mb={8}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
        InputLeftElement={
          <Icon
            as={<Key color={colors.gray[300]} />}
            ml={4}
          />
        }
      />

      <Button
        title="Entrar"
        width="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
};
