import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteStrategy, fetchStrategies } from '@store/slices/strategySlice';
import type { AppDispatch, RootState } from '@store';
import type { TStrategy } from '@types';
import { useDispatch, useSelector } from 'react-redux';

const PAGE_SIZE = 10;

function StrategyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, pagination } = useSelector((state: RootState) => state.strategy);

  useEffect(() => {
    dispatch(fetchStrategies({ page: pagination.page, limit: PAGE_SIZE }));
  }, [dispatch, pagination.page]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const columns: ColumnsType<TStrategy> = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Version', dataIndex: 'version', key: 'version', width: 100 },
      { title: 'Created', dataIndex: 'created_at', key: 'created_at', width: 180 },
      { title: 'Updated', dataIndex: 'updated_at', key: 'updated_at', width: 180 },
      {
        title: 'Actions',
        key: 'actions',
        width: 140,
        render: (_, record) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/strategies/edit/${record.id}`)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: 'Удалить стратегию?',
                  onOk: async () => {
                    await dispatch(deleteStrategy(record.id));
                    await dispatch(fetchStrategies({ page: pagination.page, limit: PAGE_SIZE }));
                  },
                });
              }}
            />
          </Space>
        ),
      },
    ],
    [dispatch, navigate, pagination.page],
  );

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/strategies/create')}>
        Создать стратегию
      </Button>

      <Table<TStrategy>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={items}
        pagination={{
          current: pagination.page,
          total: pagination.total,
          pageSize: PAGE_SIZE,
          onChange: (page) => dispatch(fetchStrategies({ page, limit: PAGE_SIZE })),
        }}
      />
    </Space>
  );
}

export default StrategyList;
