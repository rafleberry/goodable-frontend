import React, { useContext, useEffect, useState } from "react";
import { Video } from "expo-av";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BASE_API_URL } from "../other";
import { AuthContext } from "../auth";

const VideosScreen = () => {
  const [posts, setPosts] = useState([]);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    async function fetchPosts() {
      const resp = await fetch(`${BASE_API_URL}/posts/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const newPosts = await resp.json();
      setPosts(newPosts);
    }
    fetchPosts();
  }, []);

  // It feels too complicated to make them figure out the HLS since
  //    the docs are written assuming you're not using expo or anything
  // we could instead start with Mux and have them convert it to use signed?
  //    (and have the web handling already implemented?)
  //    this is like... so basic though, you just replace the url stuff
  // we could have them JUST add the web handling case to the video component
  //    but this might be too annoying
  // note that pulling local assets doesn't work because require needs a real thing

  // const src = `https://stream.mux.com/ixT01jQKy87B5IuyTEpx4pnFxuO5GVuktrZmDKgMZeB00.m3u8`;
  // const src = 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4'

  return (
    <View>
      <ScrollView height={600}>
        {posts.map((post, idx) => (
          <View key={idx}>
            <View style={{ borderTopWidth: 1 }} />
            <Text>title: {post.title}</Text>
            <Text>caption: {post.caption}</Text>
            <Text>
              posted: {new Date(post.posted_date).toLocaleTimeString()}{" "}
              {new Date(post.posted_date).toLocaleDateString()}
            </Text>
            <Video
              style={styles.video}
              source={{ uri: post.mp4_url }}
              useNativeControls
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: 100,
    width: 200,
    backgroundColor: "black",
  },
});

export default VideosScreen;
