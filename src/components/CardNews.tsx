import React from "react";
import {Card} from "antd";
import LinkButton from "./LinkButton";

const {Meta} = Card;

interface CardNewsProps {
    url: string;
    urlToImg: string;
    title: string;
    description: string
}

const CardNews: React.FC<CardNewsProps> = ({urlToImg, title, description, url}) => {
    return (
        <Card
            style={{width: 300}}
            cover={
                <img
                    alt="example"
                    src={urlToImg}
                />
            }
            actions={[
                <LinkButton url={url}/>
            ]}
        >
            <Meta
                title={title}
                description={description}
            />
        </Card>
    )
}

export default CardNews
