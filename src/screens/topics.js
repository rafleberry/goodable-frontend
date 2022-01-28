import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../auth";
import { BASE_API_URL } from "../other";

const TopicsScreen = () => {
  const [topics, setTopics] = useState([]);
  const [myTopicIds, setMyTopicIds] = useState([]);

  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchTopics = async () => {
      const resp = await fetch(`${BASE_API_URL}/topics/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const newTopics = await resp.json();
      setTopics(newTopics);
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchMyTopics = async () => {
      try {
        const resp = await fetch(`${BASE_API_URL}/topics/my_list/`, {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        });
        const myTopics = await resp.json();
        setMyTopicIds(myTopics.map((topic) => topic.id));
      } catch (e) {
        console.log(e);
      }
    };
    fetchMyTopics();
  }, []);

  return (
    <View>
      <Text style={styles.container}>Hello there, Home!</Text>
      {topics.map((topic) => (
        <Text key={topic.id}>
          {topic.name} - mine? {myTopicIds.includes(topic.id) ? "yes" : "no"}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopicsScreen;
