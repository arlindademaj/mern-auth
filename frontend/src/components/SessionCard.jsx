import { Box, Button, Text, Flex } from "@chakra-ui/react";
import useDeleteSession from "../hookes/useDeleteSession";

const SessionCard = ({ session }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;

  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <Flex p={3} borderWidth={"1px"} borderRadius={"md"}>
      <Box flex={1}>
        <Text fontWeight={"bold"} fontSize={"sm"} mb={1}>
          {new Date(createdAt).toLocaleDateString("en-US")}
          {isCurrent && "(current session)"}
        </Text>
        <Text fontSize={"xs"} color={"gray.500"}>
          {userAgent}
        </Text>
      </Box>
      {!isCurrent && (
        <Button
          size={"sm"}
          variant={"ghost"}
          ml={4}
          alignSelf={"center"}
          fontSize={"xl"}
          color={"red.400"}
          title="Delete Session"
          onClick={deleteSession}
          isLoading={isPending}
        >
          &times;
        </Button>
      )}
    </Flex>
  );
};

export default SessionCard;
