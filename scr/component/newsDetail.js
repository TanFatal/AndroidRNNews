import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NewsServices from '../common/api/service';
import RenderHtml from 'react-native-render-html';


const NewsDetail = ({route}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = route.params;
  const{width} = useWindowDimensions();
  useEffect(() => {
    getDataDetail();
  }, [articleId]);

  const getDataDetail = () => {
    NewsServices.getExtractArticleContentById({
      articleId:articleId,
    }).then(res => {
      setData(res);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  };

  const ItemText = ({ content }) => {
    return (
      <RenderHtml baseStyle={styles.textContent} source={{html: content}} />
    );
  };

  const ItemImage = ({ img }) => {
    return <Image style={{ height: 200, width: {width} }} source={{ uri: img }} />;
  };

  const Item = ({ item }) => {
    switch (item.type) {
      case 'text':
        return <ItemText content={item.content} />;
      case 'img':
        return <ItemImage img={item.path} />;
      default:
        return <View />;
    }
  };

  return (
    <View
      statusBarProps={{ backgroundColor: 'black', barStyle: 'light-content' }}
      style={{ flex: 1, backgroundColor: '#ffffff',alignItems:'center' }}
    >
      <View style={{width:'95%'} }>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => {
              return <Item item={item} />;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  textContent: {
    fontSize: 15,
    color: '#000000',
  },
});