import { Button, Form, Input, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createStrategy } from '@store/slices/strategySlice';
import type { AppDispatch } from '@store';
import { useDispatch } from 'react-redux';

type FormValues = {
  description: string;
  parameters: string;
};

function StrategyCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    try {
      const parsedParameters = JSON.parse(values.parameters);
      const result = await dispatch(
        createStrategy({
          description: values.description,
          parameters: parsedParameters,
        }),
      );

      if (createStrategy.fulfilled.match(result)) {
        message.success('Стратегия создана');
        navigate('/strategies');
      } else {
        message.error((result.payload as string) ?? 'Ошибка создания стратегии');
      }
    } catch {
      message.error('Ошибка создания стратегии');
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="parameters"
        label="Parameters (JSON)"
        rules={[
          { required: true, message: 'Parameters are required' },
          {
            validator: async (_, value) => {
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch {
                return Promise.reject(new Error('Invalid JSON'));
              }
            },
          },
        ]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>

      <Space>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        <Button onClick={() => navigate('/strategies')}>Отмена</Button>
      </Space>
    </Form>
  );
}

export default StrategyCreate;
