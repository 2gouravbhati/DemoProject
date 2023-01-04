import { View, Text, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";


const posts = require('../data/index.json');
const { height, width } = Dimensions.get('window');
const POST_SIZE = height * 0.35;
const POST_PER_BATCH = 10;

export default function index() {
    const savedPosts = useRef<any>();
    const visiblePosts = useRef<any>();
    const activeIndex = useRef<number>(0);
    const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => {
        return r1 !== r2;
    }));
    const [layoutProvider, setLayoutProvider] = useState(new LayoutProvider(
        (i) => i,
        (type, dim) => {
            dim.width = width;
            dim.height = POST_SIZE
        })
    );

    useEffect(() => {
        savedPosts.current = getChunks(posts, POST_PER_BATCH);
        getPosts(0);
    }, []);

    const getPosts = (index: number) => {
        const arr = index == 0 ? savedPosts.current[0] : visiblePosts.current.concat(savedPosts.current[0]);
        setDataProvider(dataProvider.cloneWithRows(arr));
        visiblePosts.current = arr;
        activeIndex.current = index
    }

    const getChunks = (array: any[], chunkSize: number) => {
        let chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            chunks.push(chunk)
        }
        return chunks
    }

    const onEndReached = () => {
        if (activeIndex.current + 1 < savedPosts.current.length) {
            getPosts(activeIndex.current + 1)
        }
    }

    const renderPosts = (type: string, item: any, index: number) => {
        return <PostCard
            post={item}
            post_height={POST_SIZE}
        />
    }

    return (
        <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={renderPosts}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            scrollViewProps={{
                decelerationRate: 0.80,
                renderToHardwareTextureAndroid: true,
            }}
            style={{
                flex: 1,
            }}
        />
    )
}