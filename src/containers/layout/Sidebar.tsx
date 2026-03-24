import { DatabaseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith('/strategies')) {
      return ['/strategies'];
    }
    return [];
  }, [location.pathname]);

  return (
    <Layout.Sider collapsible collapsed={collapsed} trigger={null}>
      <Button
        type="text"
        onClick={onToggle}
        style={{ width: '100%', height: 48, color: '#fff' }}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey}
        items={[
          {
            key: '/strategies',
            icon: <DatabaseOutlined />,
            label: 'Стратегии',
            onClick: () => navigate('/strategies'),
          },
        ]}
      />
    </Layout.Sider>
  );
}

export default Sidebar;
