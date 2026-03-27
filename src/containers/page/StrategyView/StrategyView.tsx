import { Button, Descriptions, Spin, message, Card, Space } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStrategy, clearCurrent } from '@store/slices/strategySlice';
import type { AppDispatch, RootState } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';

function StrategyView() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
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

  if (loading && !currentStrategy) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!currentStrategy) {
    return null;
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/strategies')}>
        Назад
      </Button>

      <Card title={`Просмотр стратегии #${currentStrategy.id}`}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">{currentStrategy.id}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {currentStrategy.description}
          </Descriptions.Item>
          <Descriptions.Item label="Parameters">
            <pre
              style={{
                background: '#f5f5f5',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                margin: 0,
              }}
            >
              {JSON.stringify(currentStrategy.parameters, null, 2)}
            </pre>
          </Descriptions.Item>
          <Descriptions.Item label="Version">{currentStrategy.version}</Descriptions.Item>
          <Descriptions.Item label="Created at">
            {new Date(currentStrategy.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {new Date(currentStrategy.updatedAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
}

export default StrategyView;
