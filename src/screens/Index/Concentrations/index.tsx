import { StyleSheet,} from "react-native";
import Colors, {ScreenProps} from '@/constants/Colors';
import * as React from 'react';
import NetWorkUtil from "@/utils/NetWorkUtil";
import useFetchData from "@/hooks/useFetchData";
import {useState} from "react";
import NetworkError from "@/components/shared/NetworkError";
import {VideoList} from "@/components/VideoList";

let listData: any [] = [];
export const Concentrations = ({route,navigation}: ScreenProps)=>{
    const {params} = route;
    const { id } = (params as any);
    if (!id) {
        return <NetworkError onReload={() => navigation.goBack()} text='系统错误，请点击' buttonTitle='返回首页'/>;
    }
    const [page, setPage] = useState(1);
    const url = NetWorkUtil.concentrations.replace('{id}',id).replace('{page}',`${page}`);
    const {
        data,
        loading,
        error,
        onReload,
        refreshing,
        onRefresh,
    } = useFetchData(url, {
        list: [],
        total: 1,
    });
    const { list, total } = data;
    if (!refreshing && !loading){
        if (page>1){
            for (let i = 0; i < list.length; i++) {
                const index = listData.findIndex((value: any)=> list[i].id === value.id);
                if (index < 0){
                    listData.splice(listData.length,0,list[i]);
                }
            }
        }else {
            listData = list;
        }
    }else if (loading){
        if(page==1){
            listData = [];
        }
    }
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }
    return (
        <VideoList
            style={styles.container}
            data={listData}
            navigation={navigation}
            numColumns={2}
            renderItem={()=>(<></>)}
            onRefresh={()=>{
                if (!loading&&!refreshing){
                    setPage(1);
                    onRefresh(url);
                }
            }}
            refreshing={refreshing}
            onEndReached={()=>{
                if (!loading&&!refreshing){
                    if (total > page){
                        setPage(page+1);
                        onReload(url);
                    }
                }
            }}
            loading={{
                loading: loading,
                textLoading: '正在努力拉取中～',
                text: page>total?'没有更多了哟～':undefined,
            }}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 45,
        backgroundColor: Colors.backgroundColor,
    },
});