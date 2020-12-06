import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtInput } from "taro-ui";
import "./index.less";
import search from "../../asset/images/search.png";
import lightingPng from "../../asset/images/lighting.png";
import more from "../../asset/images/more.png";

interface feedType {
  answer_ctnt: string;
  answer_id: number;
  comment_num: string;
  feed_source_id: number;
  feed_source_img: string;
  feed_source_name: string;
  feed_source_txt: string;
  good_num: string;
  question: string;
  question_id: number;
}
export default function Index() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    Taro.showLoading({ title: "数据加载中" });
    setTimeout(() => {
      (async () => {
        await Taro.request({
          url:
            "https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed",
          header: {
            "content-type": "application/json", // 默认值
          },
          // success: function (res) {
          //   console.log("成功", res.data);
          // },
          // fail: function (err) {
          //   console.log("失败", err);
          // },
        }).then((res) => {
          console.log("res", res);
          Taro.hideLoading();
          if (res.data.success) {
            setLoading(false);
            setList(res.data.data);
          }
          Taro.hideLoading();
        });
      })();
    }, 2000);
  }, []);
  const updateList = async () => {
    Taro.showLoading({ title: "数据加载中!" });
    await Taro.request({
      url: "https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed",
      header: {
        "content-type": "application/json", // 默认值
      },
    }).then((res) => {
      console.log("res", res);
      Taro.hideLoading();
      if (res.data.success) {
        setLoading(false);
        setList(res.data.data);
      }
      Taro.hideLoading();
    });
  };
  const appendNextPageList = async () => {
    Taro.showLoading({ title: "数据加载中!" });
    await Taro.request({
      url: "https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed",
      header: {
        "content-type": "application/json", // 默认值
      },
    }).then((res) => {
      console.log("res", res);
      Taro.hideLoading();
      if (res.data.success) {
        const oldlist = list;
        setLoading(false);
        setList(oldlist.concat(res.data.data));
      }
      Taro.hideLoading();
    });
  };
  return (
    <View className="index">
      <View className="search flex">
        <View className="flex flex_1 flex_a_c">
          <View className="flex flex_j_c flex_1 search-left flex_a_c">
            <Image src={search}></Image>
            <AtInput
              border={false}
              className="flex_1 search_input"
              name="value"
              type="text"
              placeholder="搜索话题,问题或人"
            ></AtInput>
          </View>
          <View className="search-right">
            <Image src={lightingPng} onClick={() => updateList()}></Image>
          </View>
        </View>
      </View>
      <ScrollView
        className="container"
        scrollY
        scrollWithAnimation
        scrollTop={10}
        lowerThreshold={10}
        upperThreshold={10}
        style={{ height: 300 }}
        onScrollToUpper={updateList}
        onScrollToLower={appendNextPageList}
      >
        <View className="feed_items">
          {list.map((item: feedType) => (
            <View
              key={item.answer_id}
              className="feed_item"
              onClick={() => {
                Taro.navigateTo({ url: "/pages/question/question" });
              }}
            >
              <View className="flex flex_a_c">
                <View>
                  <Image src={item.feed_source_img} className="pilfe"></Image>
                </View>
                <View className="flex_1 feed_source">
                  <Text>{item.feed_source_name + item.feed_source_txt}</Text>
                </View>
                <View>
                  <Image
                    className="item-more"
                    mode="aspectFit"
                    src={more}
                  ></Image>
                </View>
              </View>
              <View className="flex_c">
                <View className="question">{item.question}</View>
                <View className="good_num">{item.good_num}</View>
              </View>
              <View className="flex answer-actions">
                <View className="item">{item.comment_num}赞同</View>
                <View className="item">评论</View>
                <View className="item">关注问题</View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
