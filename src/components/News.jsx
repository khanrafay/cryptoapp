import React from 'react'
import moment from 'moment';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';


const { Text, Title } = Typography;
const { Option } = Select;

function News({ simplified, newsCategory }) {

    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12 });
    console.log('---', cryptoNews)
    return (
        <div>News</div>
    )
}

export default News