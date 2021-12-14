import React from "react";
import {LinkOutlined} from "@ant-design/icons";

interface LinkButtonProps {
    url: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({url}) => {
    return (
        <a href={url} target="_blank">
            <div className='d-flex align-items-center'><LinkOutlined
                title={'a source'}/> Read more ...
            </div>
        </a>
    )
}

export default LinkButton
