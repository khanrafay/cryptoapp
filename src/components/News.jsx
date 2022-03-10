import React, { useState } from 'react'
import moment from 'moment';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';



const { Text, Title } = Typography;
const { Option } = Select;


function News({ simplified, newsCategory }) {

    const [selectedCoin, setSelectedCoin] = useState("Cryptocurrency");
    const count = simplified ? 10 : 100;
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: selectedCoin, count: simplified ? 6 : 12 });
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);


    if (!cryptoNews?.value) return 'Loading...';
    if (isFetching) return 'Loading...';

    console.log('cry', cryptosList?.data);
    return (

        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a crypto"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(e) => {
                            setSelectedCoin(e)
                        }}
                    >
                        {cryptosList?.data?.coins?.map((coin, i) => (
                            <Option value={coin.name} key={i}>{coin?.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}
            {cryptoNews?.value?.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.name}
                                </Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl} alt="news" />
                            </div>
                            <p>
                                {news?.description > 100 ?
                                    `${news?.description.substring(0, 100)}...` :
                                    news?.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl} alt="avatar" />
                                    <Text className="provider-name">{news?.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news?.dataPublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News