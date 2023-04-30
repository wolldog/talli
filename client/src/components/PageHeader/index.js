import React from "react";
import { Badge, Image, Space} from "antd";
import headerImage from "./../../assets/images/headerImage.png";
import { BellFilled } from "@ant-design/icons"


const PageHeader = () => {
  return (
    <div className="PageHeader">
      <Image src={ headerImage} style={{maxHeight:"75px"}}></Image>
      <Space>
        <Badge className="notification" count={5}>
        <BellFilled style={{ fontSize: 20, justifySelf: "center" }} />
        </Badge>
      </Space>
    </div>
  )
};

export default PageHeader;
