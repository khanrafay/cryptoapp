import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Row, Col, Card, Input } from 'antd';
import { Link } from 'react-router-dom';

function Cryptocurrencies({ simplified }) {

    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins?.filter((coin) => {
            return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        }
        );
        setCryptos(filteredData);
    }, [cryptosList, searchTerm])

    if (isFetching) return 'Loading...';
    return (
        <>
            {!simplified && <div className="search-crypto">
                <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} /></div>
            }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos && cryptos?.map(currency => (
                    <Col xs={24} sm={12} lg={6} key={currency?.id} className="crypto-card">
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank} . ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency?.price)}</p>
                                <p>Market Cap: {millify(currency?.marketCap)}</p>
                                <p>Daily Change: {millify(currency?.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies