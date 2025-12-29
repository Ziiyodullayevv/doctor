import {
	InstagramFilled,
	SendOutlined,
	ShareAltOutlined,
	WhatsAppOutlined,
	YoutubeFilled,
} from "@ant-design/icons";
import { FloatButton } from "antd";

const FloatingShareButton = () => (
	<>
		<FloatButton.Group
			trigger="hover"
			type="primary"
			icon={<ShareAltOutlined />}
		>
			<FloatButton icon={<SendOutlined />} />
			<FloatButton icon={<YoutubeFilled />} />
			<FloatButton icon={<InstagramFilled />} />
			<FloatButton icon={<WhatsAppOutlined />} />
		</FloatButton.Group>
	</>
);

export default FloatingShareButton;
