import { Button, Form, Input, Space, Spin, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clearCurrent, fetchStrategy, updateStrategy } from '@store/slices/strategySlice';
import type { AppDispatch, RootState } from '@store';
import { useDispatch, useSelector } from 'react-redux';

type FormValues = {
  description: string;
  parameters: string;
};

function StrategyEdit() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm<FormValues>();
  const { currentStrategy, loading, error } = useSelector((state: RootState) => state.strategy);

  useEffect(() => {
    if (!id) {
      message.error('Стратегия не найдена');
      navigate('/strategies');
      return;
    }

    dispatch(fetchStrategy(Number(id)));
    return () => {
      dispatch(clearCurrent());
    };
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (error && !loading) {
      message.error(error);
      navigate('/strategies');
    }
  }, [error, loading, navigate]);

  useEffect(() => {
    if (currentStrategy) {
      form.setFieldsValue({
        description: currentStrategy.description,
        parameters: JSON.stringify(currentStrategy.parameters, null, 2),
      });
    }
  }, [currentStrategy, form]);

  const onFinish = async (values: FormValues) => {
    if (!id) {
      return;
    }

    try {
      const parsedParameters = JSON.parse(values.parameters);
      const result = await dispatch(
        updateStrategy({
          id: Number(id),
          data: {
            description: values.description,
            parameters: parsedParameters,
          },
        }),
      );

      if (updateStrategy.fulfilled.match(result)) {
        message.success('Стратегия обновлена');
        navigate('/strategies');
      } else {
        message.error((result.payload as string) ?? 'Ошибка обновления стратегии');
      }
    } catch {
      message.error('Ошибка обновления стратегии');
    }
  };

  if (loading && !currentStrategy) {
    return <Spin />;
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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

export default StrategyEdit;
