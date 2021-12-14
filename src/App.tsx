import './index.css'

import React, {useState, useEffect} from "react";
import {List, Skeleton, Divider, Layout} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const {Header, Content, Footer} = Layout;

import {getAllArticles} from "./api";

import CardNews from "./components/CardNews";


const App: React.FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<object[]>([]);
    const [page, setPage] = useState<number>(1)

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setPage(page + 1)
        try {
            const res = await getAllArticles(page)
            setData([...data, ...res.articles] as []);
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <Layout style={{height: '100vh'}} className="layout">
            <Header>
                <div className="logo">News app</div>
            </Header>
            <Content style={{padding: '0 20px'}}>
                <div className="site-layout-content h-100">
                    <div
                        id="scrollableDiv"
                        className='news-container'
                    >
                        <InfiniteScroll
                            dataLength={data.length}
                            next={loadMoreData}
                            hasMore={data.length < 100} // max request result for free plan
                            loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >

                            <List
                                className='test'
                                itemLayout={'vertical'}
                                dataSource={data}
                                grid={{xxl: 5, xl: 4, lg: 3, md: 1}}
                                renderItem={(item: any) => (
                                    <List.Item key={item.id}>
                                        <CardNews url={item.url} urlToImg={item.urlToImage} title={item.title}
                                                  description={item.description}/>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018</Footer>
        </Layout>

    );
};

export default App;
