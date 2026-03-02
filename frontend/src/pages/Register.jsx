import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Container,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../lib/api";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        <Heading fontSize="4xl" mb={8}>
          Sign up
        </Heading>

        <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
          {isError && (
            <Box mb={3} color="red.400">
              {error?.message || "An error occurred"}
            </Box>
          )}

          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Text color="gray.400" fontSize="xs" textAlign="left" mt={2}>
                - Must be at least 6 characters long.
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  createAccount({ email, password, confirmPassword })
                }
              />
            </FormControl>

            <Button
              my={2}
              isDisabled={
                !email || password.length < 6 || password !== confirmPassword
              }
              isLoading={isPending}
              onClick={() =>
                createAccount({ email, password, confirmPassword })
              }
            >
              Create account
            </Button>

            <Text align="center" fontSize="sm" color="gray.400">
              Already have an account?{" "}
              <ChakraLink as={Link} to="/login">
                Sign in
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
