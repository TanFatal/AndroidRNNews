
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import NewsServices from '../common/api/service';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function News({ navigation, route }) {
  const { categoryId } = route.params;
  const [dataPage1, setDataPage1] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isReLoad, setIsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  useEffect(() => {
    getData();
  }, [categoryId]);
  
  const getData = () => {
    setIsReload(true);
    NewsServices.getArticles({ categoryId, page: 1, pageSize: 10 })
      .then(res => {
        setDataPage1(res);
        return NewsServices.getArticles({ categoryId, page: 2, pageSize: 10 });
      })
      .then(res => {
        setData(res);
        if (res?.length > 0) {
          setIsLoadMore(true);
          setPage(2);
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
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('NewsDetail', { articleId: item?.Id })}
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

  const HeaderScrollView = ({ items }) => {
    const scrollViewRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1 >= items.length ? 0 : prevIndex + 1;
          scrollViewRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
          return nextIndex;
        });
      }, 2000); 
      return () => clearInterval(interval);
    }, [items]);

    return (
      <View>
        <Text style={{ fontSize: 24, padding: 10, fontWeight: 'bold', color: 'green' }}>Bản tin mới nhất</Text>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('NewsDetail', { articleId: item?.Id })}
              activeOpacity={0.9}
              style={[styles.itemHeader, { width: screenWidth }]}>
              <Image style={styles.imgHeader} source={{ uri: item?.ImageLink }} />
              <View style={styles.overlay}>
                <Text style={styles.titleHeader}>{item?.Title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  
  const filterData = () => {
    if (searchKeyword.trim()==='') {
      getData();
    } else {
      const filteredData = data.filter(item =>
        item.Title.toLowerCase().includes(searchKeyword.trim().toLowerCase())
      );
      setData(filteredData);
    }
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View>
      {/* header */}
      <View style={{ height: 50, paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
        <Image style={{ height: 33, width: 33 }} source={require('../assets/newsLogo.png')} />
        <Text style={{ fontSize: 33, fontWeight: 'bold', color: '#0F6DDC' }}>News 2 Day</Text>
      </View>
      {/* Tìm kiếm */}
      <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        onChangeText={text => {
          setSearchKeyword(text);
          filterData(text);
        }}
        value={searchKeyword}
      />
      </View>
      {/* scrollView */}
      <HeaderScrollView items={dataPage1} />
      {/* Danh sách bài báo */}
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'green', padding: 5 }}>Đề xuất</Text>
        <FlatList
          ListHeaderComponent={() => {
            if (isReLoad) return <ComponentLoading />;
            return null;
          }}
          ListFooterComponent={() => {
            if (isLoading) return <ComponentLoading />;
            return <View />;
          }}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <Item item={item} />}
          data={data}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 8 }} />;
          }}
          refreshControl={<RefreshControl refreshing={isReLoad} onRefresh={getData} />}
          showsVerticalScrollIndicator={false}
          onEndReached={getMore}
          onEndReachedThreshold={0.7}
        />
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F6F6F6',
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
    width: 400,
    paddingLeft: 10
  },
  imgHeader: {
    height: 200,
    width: '95%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  titleHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#0F6DDC',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});