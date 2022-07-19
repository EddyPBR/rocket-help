import { useState, FC } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const SignIn: FC = () => {
  const { colors } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log(username, password);
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
        onChangeText={setUsername}
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
      />
    </VStack>
  );
};
