import { message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Card } from '@components';

function Hello() {
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = () => {
    messageApi.success('Action completed successfully');
  };

  return (
    <>
      {contextHolder}
      <Card title='Hello from React + Ant Design'>
        <Button type='primary' icon={<SmileOutlined />} onClick={onClick}>
          Show message
        </Button>
      </Card>
    </>
  );
}

export default Hello;
