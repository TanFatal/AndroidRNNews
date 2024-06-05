import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsServices from '../common/api/service';

export default function News({ navigation, route }) {
  const { categoryId } = route.params;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isReLoad, setIsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    getData();
  }, [categoryId]);

  const getData = () => {
    setIsReload(true);
    NewsServices.getArticles({ categoryId, page: 1, pageSize: 10 })
      .then(res => {
        setData(res);
        if (res?.length > 0) {
          setIsLoadMore(true);
          setPage(1);
        }
      })
      .catch(error => {
        console.log(error?.response);
      })
      .finally(() => {
        setIsReload(false);
      });
  };

  const getMore = () => {
    if (isLoadMore) {
      setIsLoading(true);
      NewsServices.getArticles({ categoryId, page: page + 1, pageSize: 10 })
        .then(res => {
          if (res?.length > 0) {
            setIsLoadMore(true);
            setPage(page + 1);
            setData([...data, ...res]);
          } else {
            setIsLoadMore(false);
          }
        })
        .catch(error => {
          console.log(error?.response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const Item = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.9}
      onPress={() => navigation.navigate('NewsDetail',{articleId:item?.Id})}
      style={styles.item}>
        <Image style={styles.img} source={{ uri: item?.ImageLink }} />
        <View style={styles.contentItem}>
          <Text style={styles.title}>{item?.Title}</Text>
          <Text style={styles.time}>{new Date(item?.PublishedDate).toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ComponentLoading = () => {
    return (
      <View style={{ paddingVertical: 30 }}>
        <ActivityIndicator color="black" />
      </View>
    );
  };

  const ItemHeader = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('NewsDetail', item?.Id)}
        activeOpacity={0.9}
        style={styles.itemHeader}
      >
        <Image style={styles.imgHeader} source={{ uri: item?.ImageLink }} />
        <View style={styles.contentItem}>
          <Text style={styles.title}>{item?.Title}</Text>
          <Text style={styles.time}>{new Date(item?.PublishedDate).toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => {
          if (isReLoad) return <ComponentLoading />;
          return <View />;
        }}
        ListFooterComponent={() => {
          if (isLoading) return <ComponentLoading />;
          return <View />;
        }}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) return <ItemHeader item={item} />;
          return <Item item={item} />;
        }}
        data={data}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 8 }} />;
        }}
        refreshControl={
          <RefreshControl refreshing={isReLoad} onRefresh={getData} />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={getMore}
        onEndReachedThreshold={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 10,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  contentItem: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  itemHeader: {
    marginBottom: 10,
  },
  imgHeader: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
});
